import os
from llama_index.core.settings import Settings
from llama_index.core.agent import AgentRunner
from llama_index.core.tools.query_engine import QueryEngineTool
from app.engine.tools import ToolFactory
from app.engine.index import get_index
from qdrant_client.http.models import Filter, FieldCondition, MatchValue


def parse_filters(data: dict[str, str] | None):
    if not data:
        return None

    keys = ['jurisdiction', 'type', 'source']
    valid = [k for k in keys if data.get(k) not in {None, '', 'all'}]
    filters = [FieldCondition(key=k, match=MatchValue(value=data[k])) for k in valid]
    
    if not filters:
        return None

    return Filter(should=[Filter(must=filters)])


def get_chat_engine():
    system_prompt = os.getenv("SYSTEM_PROMPT")
    top_k = os.getenv("TOP_K", "3")
    
    # Add query tool
    index = get_index()

    def get_fn(data: dict[str, str] | None = None):
        tools = []

        filters = parse_filters(data)
        query_engine = index.as_query_engine(
            vector_store_kwargs={"qdrant_filters": filters},
            similarity_top_k=int(top_k)
        )
        query_engine_tool = QueryEngineTool.from_defaults(query_engine=query_engine)
        tools.append(query_engine_tool)

        # Add additional tools
        # tools += ToolFactory.from_env()

        return AgentRunner.from_llm(
            llm=Settings.llm,
            tools=tools,
            system_prompt=system_prompt,
            verbose=True,
        )
    return get_fn


def get_similarity_engine():
    top_k = os.getenv("TOP_K", "3")
    index = get_index()
    
    def get_fn(data: dict[str, str] | None = None):
        filters = parse_filters(data)
        query_engine = index.as_query_engine(
            vector_store_kwargs={"qdrant_filters": filters},
            response_mode='no_text',
            similarity_top_k=int(top_k)
        )
        
        return query_engine
    return get_fn
