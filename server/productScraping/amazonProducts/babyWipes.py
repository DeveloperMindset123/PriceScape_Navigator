from bs4 import BeautifulSoup
import requests 
import pandas as pd 

# set the product url for the search being made
product_url_babyWipes = "https://www.amazon.com/s?k=baby+wipes&crid=S9G2H5COZ8YV&sprefix=baby+%2Caps%2C102&ref=nb_sb_ss_ts-doa-p_1_5"

# define the user agent using the HEADER schema
HEADERS = ({'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15', 'Accept-Language' : 'en-US, en;q=0.5'})

# HTTP request
webpage = requests.get(url=product_url_babyWipes, headers=HEADERS)

print("Request code:")
print(webpage)
''' --> uncomment this if you want to see the html content of the website
print("\nHTML Content:")
print(webpage.content)
'''
print("Type of data")
print(type(webpage))

# soup objects containing all the data
beautiful_soup_response = BeautifulSoup(webpage.content, "html.parser")
print(beautiful_soup_response)
    



