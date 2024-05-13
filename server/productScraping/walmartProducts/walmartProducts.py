from bs4 import BeautifulSoup
import requests
import os
import json
from dotenv import load_dotenv
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.indexes import VectorstoreIndexCreator
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

load_dotenv()
openai_api_key=os.getenv("OPENAI_API_KEY")
# Intialize LLM
openai = ChatOpenAI(model="gpt-4-turbo", openai_api_key=openai_api_key)

def web_qa(url_list, query):
    # Intialize Embeddings and extractor --> uses default embedding model
    embeddings=OpenAIEmbeddings(openai_api_key=openai_api_key)
    
    llm_compressor=LLMChainExtractor.from_llm(openai)
    
    # intialize the base retriever with documents
    documents=[]
    for url in url_list:
        loader = WebBaseLoader(url)
        doc=loader.load()
        # append allows only one element, extend allows for several elements
        documents.extend(doc)
        
    retriever=VectorstoreIndexCreator(embedding=embeddings).from_documents(documents).vectorstore.as_retriever()
    
    # wrap the base retrieval with contextual compression
    compression_retriever=ContextualCompressionRetriever(
        base_compressor=llm_compressor,
        base_retriever=retriever,
        embedding=embeddings
    )
    
    # invoke the compression retriever with the query
    compressed_docs=compression_retriever.invoke(query)
    # intialize the list for where the results will be stored
    results=[]
    # print or process the compressed documents
    for doc in compressed_docs:
        print(f"Title: {doc.metadata.get('title')}")
        results.append({
            "title": doc.metadata.get('title'),
            "content": doc.page_content
        })

    # Save results to a JSON file
    with open('results.json', 'w') as f:
        json.dump(results, f, indent=4)

    print("\nResults saved to 'results.json'.")
        
'''
        
        # Assuming documents are structured as expected
        for document in documents:
            page_content = document.page_content  # Extracted HTML content
            print("Extracted Context:")
            print(page_content)
            # Here, you can parse `page_content` using BeautifulSoup if needed or pass it directly
        
        
        # Format the extracted data into a JSON-like string for the AI model query
        formatted_query = "{query}\nContext: {context}".format(query=query, context=page_content)
        response = openai.invoke(formatted_query)
        print(response.content)
        
    # Query the model with the constructed context
    
    ans = openai.invoke(context + query)
    print(ans)
    '''
# list out the list of product url that is being 
url_list=[
    # ebay works
   #"https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=macbook&_sacat=0",
   # newegg works
    "https://www.newegg.com/p/pl?d=macbook"
]

prompt = """
    Given the context provided, provide me with the following set of informations:
    1. The name of the product
    2. The price corresponding to each of the product
    3. The rating per product
    4. The availabillity of the product (if availabillity isn't explicitly defined, simply check estimated delivery time to determine if product is available or not)
    
    Return the data in JSON format, make sure it's for the entire page
"""

if __name__ == "__main__":
    web_qa(url_list=url_list, query=prompt)

"""
macbooks_url=https://www.walmart.com/search?q=macbooks
wanted_list=["Retrieve information about the title of the product, the price of the produt, the rating of the product and the availabillity of the product"]

scraper = AutoScraper()
result = scraper.build(macbooks_url, wanted_list)
print(result)
"""

# look into the following repsource : https://python.langchain.com/v0.1/docs/integrations/chat/openai/

'''For tech stuff, use newegg and for other products, use ebay, for walmart, use the kadoa thing, all of these data gathered needs to be fed into algolia serach engine and a vector database such as pinecone for the development of the rag chatbot'''