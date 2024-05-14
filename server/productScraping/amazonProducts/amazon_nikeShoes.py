from bs4 import BeautifulSoup
import requests 
import pandas as pd 
import numpy as np
from urllib.parse import urljoin, urlparse

def get_title(soup):
    try:
        title=soup.find("span", attrs={"id":'productTitle'})
        title_value=title.text 
        title_string=title_value.strip()
        
    except AttributeError:
        title_string=""
    return title_string

def get_price(soup):
    try:
        price=soup.find("span", attrs={'id':'priceblock_ourprice'}).string.strip()
    except AttributeError:
        try:
            price=soup.find("span", attrs={'id':'priceblock_dealprice'}).string.strip()
        except:
            price=""
    return price

def get_rating(soup):
    try:
        rating=soup.find("i", attrs={'class':'a-icon a-icon-star a-star-4-5'}).string.strip()
    except AttributeError:
        try:
            rating=soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
        except:
            rating=""
    return rating
            
def get_review_count(soup):
    try:
        review_count=soup.find("span", attrs={'id':'acrCustomerReviewText'}).string.strip()
    except AttributeError:
        review_count=""
    return review_count

# function to extract availabillity status
def get_availability(soup):
    try:
        available=soup.find("div", attrs={'id':'availability'})
        available=available.find("span").string.strip()
        #print("Product availabillity is", available)
    except AttributeError:
        available="Not Available"
    return available

#lastly, define a function to validate URLs
def is_valid_url(url):
    passed_url=urlparse(url)
    return bool(passed_url.scheme and passed_url.netloc)

# function to get full URL with base
def get_full_url(base,link):
    return urljoin(base, link)
    

if __name__ == "__main__":
    HEADERS=({'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15','Accept-Language':'en-US, en;q=0.5'})
    URL="https://www.amazon.com/s?k=nike+shoes&crid=NEW5JS9AVKJT&sprefix=nike+shoes%2Caps%2C97&ref=nb_sb_noss_1"
    webpage=requests.get(url=URL, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    links = soup.find_all("a", attrs={'class':'a-link-normal s-no-outline'})
    links_list=[]
    for link in links:
        href=link.get('href')
        full_url=get_full_url("https://amazon.com", href)
        if is_valid_url(full_url):
            print("Link is valid, adding to links_list...\n")
            links_list.append(link.get('href'))
        else:
            print(f"Invalid URL: {full_url}")
        
    d = {"title":[], "price":[], "rating":[], "reviews":[], "availabillity":[]}
    for link in links_list:
        print("URL being requested:", link, "\n")
        try:
            new_webpage=requests.get("https://www.amazon.com"+link, headers=HEADERS)
            new_soup=BeautifulSoup(new_webpage.content, "html.parser")
            d['title'].append(get_title(new_soup))
            d['price'].append(get_price(new_soup))
            d['rating'].append(get_rating(new_soup))
            d['reviews'].append(get_review_count(new_soup))
            d["availabillity"].append(get_availability(new_soup))
            
        except Exception as e:
            print(f"Error fetching URL {link}: {e}")
            
    amazon_df=pd.DataFrame.from_dict(d)
    amazon_df['title'].replace('', np.nan, inplace=True)
    amazon_df = amazon_df.dropna(subset=['title'])
    amazon_df.to_csv("./data/amazon_nike_shoes_data.csv", header=True, index=False)