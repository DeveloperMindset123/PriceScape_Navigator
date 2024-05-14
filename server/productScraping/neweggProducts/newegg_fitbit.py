import os
import json
from dotenv import load_dotenv
# TODO : Fix the issue regards to some imports not getting recognized despite being downloaded and added to requirements.txt --> type:ignore serves as a temporary placeholder
from langchain_community.document_loaders import WebBaseLoader # type: ignore
from langchain.retrievers import ContextualCompressionRetriever # type: ignore
from langchain.retrievers.document_compressors import LLMChainExtractor # type: ignore
from langchain.indexes import VectorstoreIndexCreator # type: ignore
from langchain_openai import ChatOpenAI, OpenAIEmbeddings # type: ignore
from langchain_text_splitters import CharacterTextSplitter # type: ignore
from langchain_community.vectorstores import FAISS # type: ignore

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize LLM
openai = ChatOpenAI(model="gpt-4-turbo", openai_api_key=openai_api_key)

def web_qa(url_list, query):
    #embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    llm_compressor = LLMChainExtractor.from_llm(openai)
    text_splitter = CharacterTextSplitter(
    chunk_size=2000, 
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
    retriever = FAISS.from_documents(documents, OpenAIEmbeddings()).as_retriever()
    compression_retriever = ContextualCompressionRetriever(
        base_compressor=llm_compressor,
        base_retriever=retriever
    )
    
    compressed_docs = compression_retriever.invoke(query)
    results = []

    for doc in compressed_docs:
        content = json.loads(doc.page_content.replace('```json\n', '').replace('\n```', '')) 
        results.extend(content)  

    with open('./data/newEgg_fitbit_details.json', 'w') as f:
        json.dump(results, f, indent=4)
        
    print("\nResults saved to 'newEgg_fitbit_details.json'.")

if __name__ == "__main__":
    url_list = ["https://www.newegg.com/p/pl?d=fitbit"]
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
