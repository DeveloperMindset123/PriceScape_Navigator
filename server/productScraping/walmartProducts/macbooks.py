''' --> This is old code
from bs4 import BeautifulSoup
import requests
import pandas as pd 
import numpy as np
from urllib.parse import urlparse, urljoin

def get_title(soup):
    try:
        title = soup.find("h1", class_="prod-ProductTitle").text.strip()
    except AttributeError:
        title=""
    
    return title

def get_price(soup):
    try:
        price=soup.find("span", class_="price-group").text.strip()
    except AttributeError:
        price=""
    return price
    
def get_rating(soup):
    try:
        rating=soup.find("div", class_="RatingScore").text.strip()
    except AttributeError:
        rating=""
    return rating
    
def get_review_count(soup):
    try:
        review_count=soup.find("span", class_="ReviewsHeader-reviewCount").text.strop()
    except AttributeError:
        review_count=""
    return review_count
    
def get_availabillity(soup):
    try:
        availabillity=soup.find("div", class_="prod-ProductAvailabillity").text.strip()
    except AttributeError:
        availabillity="Not Available"
    return availabillity

def is_valid_url(url):
    parsed_url=urlparse(url)
    return bool(parsed_url.scheme and parsed_url.netloc)

def get_full_url(base, link):
    return urljoin(base, link)

if __name__=="__main__":
    headers=({'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15','Accept-Language':'en-US, en;q=0.5'})
    url="https://www.walmart.com/search?q=macbooks"
    webpage=requests.get(url=url, headers=headers)
    soup=BeautifulSoup(webpage.content, "html.parser")
    
    links=soup.find_all("a", class_="search-result-productImage gridView display-block")
    links_list=[get_full_url("https://www.walmart.com", link['href']) for link in links if is_valid_url(get_full_url("https://www.walmart.com", link['href']))]
    
    data={"title":[], "price":[], "rating":[], "reviews":[], "availabillity":[]}
    for link in links:
        print("Current Link being made request to:", link)
        new_page=requests.get(url=link, headers=headers)
        new_soup=BeautifulSoup(new_page.content, "html.parser")
        data['title'].append(get_title(new_soup))
        data['price'].append(get_price(new_soup))
        data["rating"].append(get_rating(new_soup))
        data["reviews"].append(get_review_count(new_soup))
        data["availabillity"].append(get_availabillity(new_soup))
        
    # convert to dataframe and save to csv
    walmart_df=pd.DataFrame(data=data)
    walmart_df.to_csv("./data/walmart_macbooks.csv", index=False)
    '''
        
'''The following implements scraping walmart product data using scrapy'''
import json
import math
import scrapy
from urllib.parse import urlencode

class WalmartSpider(scrapy.Spider):
    name="walmart"
    custom_settings={
        'FEEDS':{ 'data/%(name)s_%(time)s.csv' : { 'format': 'csv'}}
    }
    
    def start_requests(self):
        keyword_list=['laptop']
        for keyword in keyword_list:
            payload={'q':keyword, 'sort':'best_seller', 'page':1, 'affinityOverride':'default'}
            # take the payload (request body and convert it into corresponding urlencoding)
            walmart_search_url="https://www.walmart.com/search?" + urlencode(payload)
            yield scrapy.Request(url=walmart_search_url, callback=self.parse_search_results, meta={'keyword':keyword, 'page':1})
            
        
            
    #def 