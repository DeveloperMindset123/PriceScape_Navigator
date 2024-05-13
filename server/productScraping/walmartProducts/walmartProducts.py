import os
import json
from dotenv import load_dotenv
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.indexes import VectorstoreIndexCreator
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize LLM
openai = ChatOpenAI(model="gpt-4-turbo", openai_api_key=openai_api_key)

def web_qa(url_list, query):
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    llm_compressor = LLMChainExtractor.from_llm(openai)

    documents = []
    splitter = CharacterTextSplitter(chunk_size=800, chunk_overlap=100)  # Adjusted chunk size for smaller chunks

    for url in url_list:
        print(f"Processing content from {url}")
        loader = WebBaseLoader(url)
        doc = loader.load()

        # Split content into smaller chunks
        for d in doc:
            chunks = splitter.create_documents(d.page_content)
            print(f"Adding the following chunk of data: {chunks}")
            documents.extend(chunks)  # Add chunks instead of entire documents

    retriever = VectorstoreIndexCreator(embedding=embeddings).from_documents(documents).vectorstore.as_retriever()
    
    compression_retriever = ContextualCompressionRetriever(
        base_compressor=llm_compressor,
        base_retriever=retriever
    )
    
    # Process the query
    compressed_docs = compression_retriever.invoke(query)
    results = []

    for doc in compressed_docs:
        print(f"Title: {doc.metadata.get('title')}")
        results.append({
            "title": doc.metadata.get('title'),
            "content": doc.page_content
        })

    # Save results to a JSON file
    with open('./data/results.json', 'w') as f:
        json.dump(results, f, indent=4)

    print("\nResults saved to 'results.json'.")

if __name__ == "__main__":
    url_list = [
        "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=macbook&_sacat=0",
        "https://www.newegg.com/p/pl?d=macbook"
    ]

    prompt = """
    Given the context provided, provide me with the following set of informations:
    1. The name of the product
    2. The price corresponding to each of the product
    3. The rating per product
    4. The availability of the product (if availability isn't explicitly defined, check estimated delivery time)
    
    Return the data in JSON format.
    """

    web_qa(url_list, query=prompt)
