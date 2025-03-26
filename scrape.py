import re
import requests
from bs4 import BeautifulSoup

def extract_asin(amazon_url):
    """
    Extracts ASIN from an Amazon product URL.
    """
    match = re.search(r'/dp/([A-Z0-9]{10})', amazon_url)
    if match:
        asin = match.group(1)
        print(f"Extracted ASIN: {asin}")
        return asin
    else:
        raise ValueError("ASIN not found in the provided URL.")

def scrape_keepa_data(asin):
    """
    Builds Keepa URL using ASIN and simulates scraping data.
    (Actual Keepa scraping would require API access or JS rendering support)
    """
    keepa_url = f"https://keepa.com/#!product/10-{asin}"
    print(f"Fetching Keepa URL: {keepa_url}")

    # Simulate fetching data - Replace this part with real API or scraping logic
    # Example of sample data you might scrape or get from Keepa API:
    price_history = [
        {"price": 2499, "date": "2023-09-01"},
        {"price": 2299, "date": "2023-10-01"},
        {"price": 2199, "date": "2023-11-01"},
        {"price": 2399, "date": "2023-12-01"},
        {"price": 2599, "date": "2024-01-01"},
        {"price": 1999, "date": "2024-02-01"}
    ]

    # Extract lowest and highest price
    lowest = min(price_history, key=lambda x: x['price'])
    highest = max(price_history, key=lambda x: x['price'])

    print(f"Lowest Price: ₹{lowest['price']} on {lowest['date']}")
    print(f"Highest Price: ₹{highest['price']} on {highest['date']}")

    return {
        "lowest_price": lowest['price'],
        "lowest_date": lowest['date'],
        "highest_price": highest['price'],
        "highest_date": highest['date']
    }

# Example usage
if __name__ == "__main__":
    amazon_product_url = "https://www.amazon.in/NoiseFit-Display-Bluetooth-Calling-Metallic/dp/B0BN1ZG1QZ/?_encoding=UTF8&pd_rd_w=YSswI&content-id=amzn1.sym.b5a625fa-e3eb-4301-a9e2-f9c8b3e7badf%3Aamzn1.symc.36bd837a-d66d-47d1-8457-ffe9a9f3ddab"
    
    asin = extract_asin(amazon_product_url)
    result = scrape_keepa_data(asin)

    print("\nFinal Extracted Data:")
    print(result)
