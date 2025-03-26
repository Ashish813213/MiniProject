import re
from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import os

app = Flask(__name__)

def extract_pid_from_flipkart_url(flipkart_url):
    """
    Extracts the PID from a Flipkart product URL.

    Args:
    flipkart_url (str): The Flipkart product URL.

    Returns:
    str: The extracted PID, or None if not found.
    """
    pid_pattern = r"pid=([A-Z0-9]+)"
    match = re.search(pid_pattern, flipkart_url)
    if match:
        return match.group(1)
    else:
        print("PID not found in the provided Flipkart URL.")
        return None

def scrape_flipshope_product(flipshope_url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36")

    chromedriver_path = "D:\\Mr.Ashish-React\\MiniProject\\chromedriver.exe"

    if not os.path.exists(chromedriver_path):
        return {"error": f"Chromedriver not found at {chromedriver_path}"}

    service = Service(executable_path=chromedriver_path)

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
    except Exception as e:
        return {"error": f"Failed to initialize ChromeDriver: {e}"}

    try:
        driver.get(flipshope_url)

        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CLASS_NAME, "statsContainer"))
            )
        except Exception as e:
            return {"error": f"Error waiting for product details: {e}"}

        page_html = driver.page_source
        soup = BeautifulSoup(page_html, "html.parser")

        product_title_element = soup.find("h1", class_="productTitle")
        product_title = product_title_element.get_text(strip=True) if product_title_element else "Product title not found."

        stats_container = soup.find("div", class_="statsContainer")
        if stats_container:
            highest_price = stats_container.find("p", class_="text-[#C53737]")
            average_price = stats_container.find("p", class_="text-[#A0C537]")
            lowest_price = stats_container.find("p", class_="text-[#00AD07]")

            result = {
                "product_title": product_title,
                "highest_price": highest_price.get_text(strip=True) if highest_price else "Highest price not found.",
                "average_price": average_price.get_text(strip=True) if average_price else "Average price not found.",
                "lowest_price": lowest_price.get_text(strip=True) if lowest_price else "Lowest price not found."
            }
            return result
        else:
            return {"error": "Stats container not found."}

    except Exception as e:
        return {"error": f"An error occurred: {e}"}

    finally:
        driver.quit()

@app.route('/scrapeFlipkart', methods=['POST'])
def scrape():
    data = request.json
    flipkart_url = data.get('flipkart_url')

    if not flipkart_url:
        return jsonify({"error": "Flipkart URL is required"}), 400

    pid = extract_pid_from_flipkart_url(flipkart_url)
    if pid:
        flipshope_url = f"https://flipshope.com/products/{pid}/1/pp"
        result = scrape_flipshope_product(flipshope_url)
        return jsonify(result)
    else:
        return jsonify({"error": "Invalid Flipkart URL"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
