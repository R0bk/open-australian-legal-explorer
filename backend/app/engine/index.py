import logging
import os

import qdrant_client
from llama_index.core.indices import VectorStoreIndex
from llama_index.vector_stores.qdrant import QdrantVectorStore


logger = logging.getLogger("uvicorn")


def get_index():
    logger.info("Connecting to index from Qdrant...")
    host, port = os.getenv("VECTOR_DB_HOST"), int(os.getenv("VECTOR_DB_PORT"))

    client = qdrant_client.QdrantClient(host=host, port=port)
    aclient = qdrant_client.AsyncQdrantClient(host=host, port=port)
    
    store = QdrantVectorStore(client=client, aclient=aclient, collection_name=os.getenv("VECTOR_DB_COLLECTION"))
    index = VectorStoreIndex.from_vector_store(store)
    logger.info("Finished connecting to index from Qdrant.")

    return index
