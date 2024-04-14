# Open Australian Legal Corpus Explorer
Come explore Australian legislation!

![Release](https://img.shields.io/badge/release-v0.1.0-green)

Welcome to the GitHub repository for the Open Australian Legal Corpus Explorer. This tool is designed to facilitate easy access and exploration of the Open Australian Legal Corpus, the first and only multijurisdictional open corpus of Australian legislative and judicial documents.

## About the Corpus

Thanks to Umar Butler for creating the Open Australian Legal Corpus, a detailed exploration of which can be found [here](https://huggingface.co/datasets/umarbutler/open-australian-legal-corpus).

The Open Australian Legal Corpus contains:
- **202,260 texts** totaling over 50 million lines and 1.2 billion tokens.
- Comprehensive coverage of every in force statute and regulation across the Commonwealth, New South Wales, Queensland, Western Australia, South Australia, Tasmania, and Norfolk Island.
- Thousands of legislative bills and hundreds of thousands of court and tribunal decisions.

This resource is the largest free and open database of its kind, aimed at advancing the field of legal AI research in Australia. It supports a wide range of natural language processing tasks such as document classification, summarization, information retrieval, and question answering within the Australian legal domain.

## Features

This explorer allows users to:
- **Chat with the Corpus**: Engage in interactive dialogue with the corpus using a simple RAG model to get answers and insights directly from the legal texts.
- **Similarity Search**: Find the most relevant documents quickly by performing similarity searches to locate the closest matching semantic chunks based on your query.

## Getting Started

### First Steps

1. **Repo Setup:**
   > git clone https://github.com/R0bk/open-australian-legal-explorer.git
   
   > cd open-australian-legal-explorer

2. **Database Setup:**
   > docker pull qdrant/qdrant

   > mkdir qdata
   
   > docker run -p 6333:6333 -p 6334:6334 \
      -v $(pwd)/qdata:/qdrant/storage:z \
      qdrant/qdrant

3. **Backend Setup:**
   Start up the backend as described in the [backend README](./backend/README.md).

4. **Frontend Setup:**
   Run the development server for the frontend as described in the [frontend README](./frontend/README.md).

5. **View in Browser:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites

Ensure you have Python 3.10+ and Node.js installed on your machine. You can install Python from [here](https://www.python.org/downloads/) and Node.js from [here](https://nodejs.org/en/). Alternatively, if you prefer to work within a container, you can use the `.devcontainer` folder to automatically spin up a continer environment within VS code.

## Support

If you encounter any problems or have suggestions, please open an issue or submit a pull request.

Happy exploring!
