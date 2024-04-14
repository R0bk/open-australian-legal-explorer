from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from fastapi import APIRouter, Depends, HTTPException, Request, status
from llama_index.core.base.base_query_engine import BaseQueryEngine
from llama_index.core.llms import ChatMessage, MessageRole
from app.engine import get_similarity_engine

similarity_router = r = APIRouter()


class _Message(BaseModel):
    role: MessageRole
    content: str


class _ChatData(BaseModel):
    messages: list[_Message]
    data: dict[str, str]


@r.post("")
async def similarity(
    request: Request,
    data: _ChatData,
    similarity_engine: BaseQueryEngine = Depends(get_similarity_engine),
):
    # check preconditions and get last message
    if len(data.messages) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No messages provided",
        )
    lastMessage = data.messages.pop()
    if lastMessage.role != MessageRole.USER:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Last message must be from user",
        )

    similarity_engine = similarity_engine(data.data)
    response = similarity_engine.query(lastMessage.content)


    async def event_generator():
        for node in response.source_nodes:
            # If client closes connection, stop sending events
            if await request.is_disconnected():
                break

            metadata = node.metadata
            text = node.text.strip()
            text = '\n'.join(f'> {line}' for line in text.split('\n'))
            
            # Extracting relevant information
            jurisdiction = metadata.get("jurisdiction", "N/A")
            citation = metadata.get("citation", "N/A")
            url = metadata.get("url", "#")
            
            # Append the formatted markdown to the markdown_content string
            yield f"## {citation}\n"
            yield f"  **Jurisdiction**: {jurisdiction}\n"
            yield f"  **Citation**: {citation}\n"
            yield f"  **URL**: [{url}]({url})\n"
            yield "  **Excerpt:**\n"
            yield f"{text}\n"
            yield "---\n\n"

    return StreamingResponse(event_generator(), media_type="text/plain")
