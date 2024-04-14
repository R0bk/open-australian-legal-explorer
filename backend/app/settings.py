import os
from typing import Dict
from llama_index.core.settings import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.azure_openai import AzureOpenAI
from llama_index.embeddings.azure_openai import AzureOpenAIEmbedding


def llm_config_from_env() -> Dict:
    from llama_index.core.constants import DEFAULT_TEMPERATURE

    model = os.getenv("MODEL")
    api_version = os.getenv("API_VERSION")
    temperature = os.getenv("LLM_TEMPERATURE", DEFAULT_TEMPERATURE)
    max_tokens = os.getenv("LLM_MAX_TOKENS")
    endpoint = os.getenv("OPENAI_API_ENDPOINT")

    config = {
        "model": model,
        "deployment_name": model,
        "temperature": float(temperature),
        "azure_endpoint": endpoint,
        "api_version": api_version,
        "max_tokens": int(max_tokens) if max_tokens is not None else None,
    }
    return config


def embedding_config_from_env() -> Dict:
    model = os.getenv("EMBEDDING_MODEL")
    api_version = os.getenv("API_VERSION")
    endpoint = os.getenv("OPENAI_API_ENDPOINT")
    dimension = os.getenv("EMBEDDING_DIM")

    config = {
        "model": model,
        "deployment_name": model,
        "api_version": api_version,
        "azure_endpoint": endpoint,
        "dimensions": int(dimension) if dimension is not None else None,
    }
    return config


def init_settings():
    llm_configs = llm_config_from_env()
    embedding_configs = embedding_config_from_env()

    # Settings.llm = OpenAI(**llm_configs)
    # Settings.embed_model = OpenAIEmbedding(**embedding_configs)
    Settings.llm = AzureOpenAI(**llm_configs)
    Settings.embed_model = AzureOpenAIEmbedding(**embedding_configs)
    Settings.chunk_size = int(os.getenv("CHUNK_SIZE", "1024"))
    Settings.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "20"))
