import requests

url = "https://api.firecrawl.dev/v0/scrape"

payload = {
    "pageOptions": {
        "includeHtml": False,
        "onlyMainContent": True
    },
    "url": "https://www.walmart.com/search?q=apple+airpods",
    "extractorOptions": {
        "mode": "llm-extraction",
        "extractionPrompt": "Given the context provided, provide me with the following set of informations:     1. The name of the product     2. The price corresponding to each of the product     3. The rating per product     4. The availabillity of the product (if availabillity isn't explicitly defined, simply check estimated delivery time to determine if product is available or not)          Return the data in JSON format"
    }
}
headers = {
    "Authorization": "Bearer fc_123456789",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)