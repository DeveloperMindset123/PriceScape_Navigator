import os
import json
from dotenv import load_dotenv
from langchain_community.document_loaders import WebBaseLoader
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.indexes import VectorstoreIndexCreator
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize LLM
openai = ChatOpenAI(model="gpt-4-turbo", openai_api_key=openai_api_key)

def web_qa(url_list, query):
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    llm_compressor = LLMChainExtractor.from_llm(openai)
    # Example of adjusting the text splitter
    text_splitter = CharacterTextSplitter(
    chunk_size=2000,  # Adjust based on average length of product entries
    chunk_overlap=300,
    length_function=len,
    is_separator_regex=False
    )

    documents = []
    for url in url_list:
        loader = WebBaseLoader(url)
        doc = loader.load()
        doc = text_splitter.split_documents(doc)
        documents.extend(doc)

    # prepare for retrieval using Vanilla Vector Store
    retriever = FAISS.from_documents(documents, OpenAIEmbeddings()).as_retriever()
    
    # Use contextual compression to filter and extract relevant data
    compression_retriever = ContextualCompressionRetriever(
        base_compressor=llm_compressor,
        base_retriever=retriever
    )

    # Query the system with your specific needs
    compressed_docs = compression_retriever.invoke(query)
    results = []

    for doc in compressed_docs:
        content = json.loads(doc.page_content.replace('```json\n', '').replace('\n```', ''))  # Assuming the content is the JSON string correctly formatted
        results.extend(content)  # Extend the results list with the list of product details

    # Save results to a JSON file for further processing or review
    with open('./data/newEgg_portableCharger_details.json', 'w') as f:
        json.dump(results, f, indent=4)

    print("\nResults saved to 'newEgg_portableCharger_details.json'.")

if __name__ == "__main__":
    url_list = ["https://www.newegg.com/p/pl?d=portable+Chargers"]
    prompt = """
    Extract data in JSON format for each product, including:
    - Product name
    - Price
    - Rating
    - Availability
    Please ensure to capture every product listed on the page.
    Additionally, ensure that each of the individual product is split into it's own json object containing Product Name, Price, Rating and Availability.
    """
    
    web_qa(url_list, prompt)
