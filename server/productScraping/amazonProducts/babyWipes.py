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
#print(beautiful_soup_response)

# Fetch links as list of tag objects--> replace the values of the class based on the values present within the anchor tag
baby_wipes_product_links = beautiful_soup_response.find_all("a", attrs={'class' : 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})
#print(baby_wipes_product_links)

# retrieve the very first link of the list of links --> extract the specific href attribute's content
#print(baby_wipes_product_links[0].get('href'))

# save the link to a specific variable
individual_product_link = baby_wipes_product_links[0].get('href')

# this will allow us to get the entire link of the product
combined_individual_product_link = "https://amazon.com" + individual_product_link
# print(combined_individual_product_link) # uncomment this to see if the individual link is posted properly and can be naviagted to the intended product --> tested and worked

# now that we have the link to the individual product, we want to scrape the ifnormation from the specific product page
individual_product_response = requests.get(url=combined_individual_product_link, headers=HEADERS)
#print(individual_product_response)

# similar to before, use beautiful soup to parse and format the raw html code that has been obtained from the product page
new_beautiful_soup_response = BeautifulSoup(individual_product_response.content, "html.parser")
#print(new_beautiful_soup_response)

# again, similar to before, target a specific html attribute
individual_product_information = new_beautiful_soup_response.find("span", attrs={"id":"productTitle"})

# we can extract the content within the anchor tag using the following mechanism --> the strip() function helps remove the unneccessary whitespaces
individual_product_information_content = new_beautiful_soup_response.find("span", attrs={"id":"productTitle"}).text.strip()
#print(individual_product_information_content)
#print(individual_product_information) # --> uncomment this if you want to see the specific html anchor tag and the information within it --> tested and worked

# Extract price of the individual product --> note that the content/value that corresponds to the class (for the title of the product it was id, but now it's class), the class values can be obtained from the html element within the webpage --> although the name of the titles and the content within the html tag varies, the html tag, their classes values in regards to defining css remains unchanged
individual_product_price = new_beautiful_soup_response.find("span", attrs={"class":"a-price a-text-price a-size-medium apexPriceToPay"})
#print(individual_product_price)  # --> each print statement serves as a check to see if the product prices can be successfully obtained or not

# now we can retrieve the text element content --> note that due to the nested nature of the span element (refer to the previous print statement to see what the output looks like, we need to resort to calling on find more than once)
individual_product_price_content = new_beautiful_soup_response.find("span", attrs={"class":"a-price a-text-price a-size-medium apexPriceToPay"}).find("span", attrs={"class":"a-offscreen"}).text
#print(individual_product_price_content) # --> tested and worked

# now we can extract the product's ratings
individual_product_rating_html = new_beautiful_soup_response.find("span", attrs={"class":"a-icon-alt"})
#print(individual_product_rating_html) # --> uncomment the print statement to see how the resulting output looks like, tested and worked

# we can also extract the specific content within the html if needed
individual_product_rating_text=new_beautiful_soup_response.find("span", attrs={"class":"a-icon-alt"}).text.strip()
#print(individual_product_rating_text) # --> tested and worked, able to successfully retrieve the information on the product




    



