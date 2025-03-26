from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import os
import re

app = Flask(__name__)

# Enable CORS for a specific route
CORS(app)

def extract_asin_from_url(amazon_url):
    """
    Extracts the ASIN from an Amazon product URL.
    """
    asin_pattern = r"/dp/([A-Z0-9]{10})"
    match = re.search(asin_pattern, amazon_url)
    if match:
        return match.group(1)
    else:
        raise ValueError("ASIN not found in the provided Amazon URL.")

def scrape_keepa_html(keepa_url):
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
        driver.get(keepa_url)
        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.ID, "statsTable"))
            )
        except Exception as e:
            return {"error": f"Error waiting for statsTable: {e}"}
        page_html = driver.page_source
        soup = BeautifulSoup(page_html, "html.parser")
        stats_table = soup.find("table", id="statsTable")
        if stats_table:
            rows = stats_table.find_all("tr")
            lowest_price = None
            lowest_date = None
            highest_price = None
            highest_date = None
            for row in rows:
                cells = row.find_all("td")
                if len(cells) > 0:
                    row_label = cells[0].get_text(strip=True)
                    if row_label == "Lowest":
                        lowest_price = cells[2].get_text(strip=True).split("\n")[0]
                        lowest_date = cells[2].find("span", class_="statsDate").get_text(strip=True)
                    elif row_label == "Highest":
                        highest_price = cells[2].get_text(strip=True).split("\n")[0]
                        highest_date = cells[2].find("span", class_="statsDate").get_text(strip=True)
            result = {}
            if lowest_price and lowest_date:
                result["lowest_price"] = f"{lowest_price} on {lowest_date}"
            else:
                result["lowest_price"] = "Lowest price not found."
            if highest_price and highest_date:
                result["highest_price"] = f"{highest_price} on {highest_date}"
            else:
                result["highest_price"] = "Highest price not found."
            return result
        else:
            return {"error": "statsTable not found in the HTML"}
    except Exception as e:
        return {"error": f"An error occurred: {e}"}
    finally:
        driver.quit()

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.json
    amazon_url = data.get('amazon_url')
    if not amazon_url:
        return jsonify({"error": "Amazon URL is required"}), 400
    try:
        asin = extract_asin_from_url(amazon_url)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    keepa_url = f"https://keepa.com/#!product/10-{asin}"
    result = scrape_keepa_html(keepa_url)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
