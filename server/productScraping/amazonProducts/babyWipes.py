from bs4 import BeautifulSoup
import requests 
import pandas as pd 
import numpy as np

'''
# set the product url for the search being made
product_url_babyWipes = "https://www.amazon.com/s?k=baby+wipes&crid=S9G2H5COZ8YV&sprefix=baby+%2Caps%2C102&ref=nb_sb_ss_ts-doa-p_1_5"

# define the user agent using the HEADER schema
HEADERS = ({'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15', 'Accept-Language' : 'en-US, en;q=0.5'})

# HTTP request
webpage = requests.get(url=product_url_babyWipes, headers=HEADERS)

print("Request code:")
print(webpage)
 --> uncomment this if you want to see the html content of the website
print("\nHTML Content:")
print(webpage.content)

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
individual_product_price_content = new_beautiful_soup_response.find("span", attrs={"class":"a-price a-text-price a-size-medium apexPriceToPay"}).find("span", attrs={"class":"a-offscreen"})
#print(individual_product_price_content) # --> tested and worked

# now we can extract the product's ratings
individual_product_rating_html = new_beautiful_soup_response.find("span", attrs={"class":"a-icon-alt"})
#print(individual_product_rating_html) # --> uncomment the print statement to see how the resulting output looks like, tested and worked

# we can also extract the specific content within the html if needed
individual_product_rating_text=new_beautiful_soup_response.find("span", attrs={"class":"a-icon-alt"}).text.strip()
#print(individual_product_rating_text) # --> tested and worked, able to successfully retrieve the information on the product

'''
'''Note that above code is just to test and see if everything is working as intended, from this point forward, we will be dynamically scraping data from the website instead'''

def get_title(soup):
    try:
        # Outer tag object
        title=soup.find("span", attrs={"id":'productTitle'})
        
        # Inner NavigatableString object
        title_value=title.text 
        
        # Title as a string value
        title_string=title_value.strip()
        
    except AttributeError:
        # in the case that there's an attribute error, set the title_string to empty
        title_string=""
        
    return title_string

# function to extract product price --> note that this may require further modifications
def get_price(soup):
    try:
        price=soup.find("span", attrs={'id':'priceblock_ourprice'}).string.strip()
    except AttributeError:
        try:
            # Check if there's some kind of deal related price
            price=soup.find("span", attrs={'id':'priceblock_dealprice'}).string.strip()
            
        except:
            price=""
            
    return price

# Function used to extract the product rating
def get_rating(soup):
    try:
        rating=soup.find("i", attrs={'class':'a-icon a-icon-star a-star-4-5'}).string.strip()
        
    except AttributeError:
        try:
            rating=soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
        except:
            rating=""
            
# Function to extract number of user reviews
def get_review_count(soup):
    try:
        review_count=soup.find("span", attrs={'id':'acrCustomerReviewText'}).string.strip()
        
    except AttributeError:
        review_count=""
    
    return review_count

# function to extract availabillity status
def get_availability(soup):
    try:
        available=soup.find("div", attrs={'id':'availabillity'})
        available=available.find("span").string.strip()
        
    except AttributeError:
        available="Not Available"
        
    return available

# define what to execute if this script is ran directly while also avoidiing running the script if it were to get imported somewhere else
if __name__ == "__main__":
    # add the appropriate user agent that corresponds to your specific device --> go to whatismybrowser.com
    HEADERS=({'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15','Accept-Language':'en-US, en;q=0.5'})
    
    # define and add the webpage url
    URL="https://www.amazon.com/s?k=baby+wipes&crid=S9G2H5COZ8YV&sprefix=baby+%2Caps%2C102&ref=nb_sb_ss_ts-doa-p_1_5"
    
    # make an HTTP request --> using the requests library, first parameter that gets passed in is the URL and the next parameter that gets passed in is the header compoent
    webpage=requests.get(url=URL, headers=HEADERS)
    
    # soup object containing all the data --> use Beautiful Soup to successfully parse all the html content --> while also craeting a instance of Beautful Soup
    soup = BeautifulSoup(webpage.content, "html.parser")
    
    # Fetch links as list of Tag objects --> the find_all method available in Beautuful Soup that allows us to search for HTML or XML elements based on various criteria. They have different behaviors in terms of returning single elements (using the find() method) or a list of elements (using the find_all() method) --> in this case, we are trying to find all the anchor tags
    links=soup.find_all("a", attrs={'class':'a-link-normal s-no-outline'})
    
    # store the links
    links_list=[]
    
    # loop for extracting links from tag objects
    for link in links:
        # extract the content of the href attribute within the anchor tag and append it to the links_list list that was initialized to hold all the links to the product
        links_list.append(link.get('href'))
        
    # intialize a dictionary, with the values representing the components that makes up a product and the values containing the corresponding array's information, the subsequent for loop is used to upload the information relevant to each of the keys present within this dictionary
    d = {"title":[], "price":[], "rating":[], "reviews":[], "availabillity":[]}
    
    # loop for extracting product details from each link
    for link in links_list:
        # pass in the base link and the corresponding product link to get the complete link
        new_webpage=requests.get("https://www.amazon.com"+link, headers=HEADERS)
        
        # take the raw html obtained from new_webpage and parse it using BeautifulSoup's html parser
        new_soup=BeautifulSoup(new_webpage.content, "html.parser")
        
        # Function calls to display all neccessary product information
        d['title'].append(get_title(new_soup))
        d['price'].append(get_price(new_soup))
        d['rating'].append(get_rating(new_soup))
        d['reviews'].append(get_review_count(new_soup))
        d["availabillity"].append(get_availability(new_soup))
        
    # convert the dictionary into a dataframe using pandas library
    amazon_df=pd.DataFrame.from_dict(d)
    # clean up the product titles by replacing the empty strings wiht null values
    amazon_df['title'].replace('', np.nan, inplace=True)
    
    # drop all the null values within the title column
    amazon_df = amazon_df.dropna(subset=['title'])
    amazon_df.to_json("./result/baby_wipes_data.json")
    amazon_df.to_csv("./result/baby_wipes_data.csv", header=True, index=False)
        






    



