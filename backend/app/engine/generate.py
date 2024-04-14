from dotenv import load_dotenv

load_dotenv()

import logging
import os
from itertools import chain, islice
from typing import Generator, Iterable, TypeVar
from uuid import uuid4

import qdrant_client
from app.settings import init_settings
from datasets import load_dataset
from llama_index.core.schema import NodeRelationship, RelatedNodeInfo, TextNode
from llama_index.vector_stores.qdrant import QdrantVectorStore

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()


T = TypeVar('T')

def batch(iterable: Iterable[T], batch_size: int) -> Generator[list[T], None, None]:
    """Generate batches of the specified size from the provided iterable."""
        
    for first in (iterator := iter(iterable)):
        yield list(chain([first], islice(iterator, batch_size - 1)))


def make_node(node_data):
    version_id, chunk_index = node_data["version_id"], node_data["chunk_index"]

    node = TextNode(
        id_=str(uuid4()),
        embedding=node_data['embedding'],
        text=node_data['text'],
        relationships={NodeRelationship.SOURCE: RelatedNodeInfo(node_id=version_id)},
        metadata={
            "id": f'{version_id}_{chunk_index}',
            "version_id": version_id,
            "jurisdiction": node_data['jurisdiction'],
            "citation": node_data['citation'],
            "type": node_data['type'],
            "source": node_data['source'],
            "url": node_data['url'],
            "is_last_chunk": node_data['is_last_chunk'],
            "chunk_index": chunk_index,
        }
    )
    if chunk_index > 0:
        node.relationships[NodeRelationship.PREVIOUS] = RelatedNodeInfo(node_id=f'{version_id}_{chunk_index - 1}')
    if node_data["is_last_chunk"] is False:
        node.relationships[NodeRelationship.NEXT] = RelatedNodeInfo(node_id=f'{version_id}_{chunk_index + 1}')

    return node


def batch_insert(store, dataset, batch_size=10000):    
    inserted_count = 0    

    for b in batch(map(make_node, dataset), batch_size):
        ids = store.add(b)
        inserted_count += len(ids)
        logger.info(f"Inserted a batch of {len(ids)} records, total inserted: {inserted_count}")
    

def generate_datasource():
    logger.info("Loading dataset")
    dataset = load_dataset('R0bk/open-australian-legal-embeddings-openai', split='train', streaming=True)

    logger.info("Connecting to Qdrant")
    host, port = os.getenv("VECTOR_DB_HOST"), int(os.getenv("VECTOR_DB_PORT"))
    client = qdrant_client.QdrantClient(host=host, port=port)
    aclient = qdrant_client.AsyncQdrantClient(host=host, port=port)
    
    logger.info("Creating Qdrant store/ collection")
    store = QdrantVectorStore(client=client, aclient=aclient, collection_name=os.getenv("VECTOR_DB_COLLECTION"))

    batch_insert(store, dataset)
    logger.info(f"Successfully created embeddings in Qdrant")


if __name__ == "__main__":
    init_settings()
    generate_datasource()
