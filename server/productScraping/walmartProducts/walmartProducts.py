import os
import json
from dotenv import load_dotenv
from langchain_community.document_loaders import WebBaseLoader
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.indexes import VectorstoreIndexCreator
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize LLM
openai = ChatOpenAI(model="gpt-4-turbo", openai_api_key=openai_api_key)

def web_qa(url_list, query):
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    llm_compressor = LLMChainExtractor.from_llm(openai)

    documents = []
    for url in url_list:
        loader = WebBaseLoader(url)
        doc = loader.load()
        documents.extend(doc)

    # Use the VectorstoreIndexCreator to prepare for retrieval
    retriever = VectorstoreIndexCreator(embedding=embeddings).from_documents(documents).vectorstore.as_retriever()
    
    # Use contextual compression to filter and extract relevant data
    compression_retriever = ContextualCompressionRetriever(
        base_compressor=llm_compressor,
        base_retriever=retriever
    )

    # Query the system with your specific needs
    compressed_docs = compression_retriever.invoke(query)
    results = []

    for doc in compressed_docs:
        # Process and collect the results
        results.append({
            "title": doc.metadata.get('title', 'No Title'),
            "content": doc.page_content
        })

    # Save results to a JSON file for further processing or review
    with open('product_details.json', 'w') as f:
        json.dump(results, f, indent=4)

    print("\nResults saved to 'product_details.json'.")

if __name__ == "__main__":
    url_list = ["https://www.newegg.com/p/pl?d=macbook"]
    prompt = """
Extract data in JSON format for each product, including:
- Product name
- Price
- Rating
- Availability
Please ensure to capture every product listed on the page.
"""


    web_qa(url_list, prompt)
