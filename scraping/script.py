from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import requests
from bs4 import BeautifulSoup

def get_wishlist_items(
    url: str,
    # headless: True,
    timeout: int = 20
):

    # Setting Selenium browser options
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=options)

    driver.get(url)

    try:
        WebDriverWait(driver, timeout). until(
            EC.presence_of_element_located((By.ID, "g-items"))
        )
    except:
        pass

    html = driver.page_source
    driver.quit()

    # BeautifulSoup parsing
    soup = BeautifulSoup(html, "html.parser")

    wishlist_items = soup.select("li.g-item-sortable")

    res = []

    for wishlist_item in wishlist_items:

        ## Title and item url
        # Checking for main product link for each wishlist item
        item_block = wishlist_item.select_one("a.a-link-normal[id^='itemName_']")

        item_name = None
        item_url = None
        
        # If no match, skip and continue
        if not item_block:
            continue
        # If match exists, get title attr otherwise get the visible text
        if item_block.get("title"):
            item_name = item_block.get("title").strip()
        else:
            text = item_block.get_text(strip=True)
            if text:
                item_name = text

        # Checking for link and fixing if needed
        href = item_block.get("href")
        if href:
            if href.startswith("http"):
                item_url = href
            else:
                item_url = f"https://www.amazon.com{href}"

        ## Image url
        img = wishlist_item.find("img")
        image_url = img.get("src") if img else None

        if item_name:
            data = {
                "item_name": item_name,
                "item_url": item_url,
                "image_url": image_url,
            }
        
            res.append(data)


        # if item and item.get("title"):
        #     item_name = item.get("title")
        #     item_url = f"https://www.amazon.com/{item.get("href")}"
        #     image_url = wishlist_item.find("img").get("src")

        #     item_needed = wishlist_item.find("span", id=lambda text: text is not None and "itemRequested_" in text)
        #     item_received = wishlist_item.find("span", id=lambda text: text is not None and "itemPurchased_" in text)
        #     item_priority = wishlist_item.find("span", id=lambda text: text is not None and "itemPriorityLabel_" in text)

        #     item_add_string = wishlist_item.find("span", id=lambda text: text is not None and "itemAddedDate_" in text)
        #     # item_add_date = wishlist_item.find("span", id=lambda text: text is not None and "itemAddedDate_" in text).text.strip()[11:]

        #     if item_add_string:
        #         item_add = item_add_string.text.strip()
        #         item_add_date = item_add[11:]

        #         data = {
        #             'item_name': item_name,
        #             'item_priority': item_priority.text.strip(),
        #             'item_add_date': item_add_date,
        #             'item_needed': item_needed.text.strip(),
        #             'item_received': item_received.text.strip(),
        #             'item_url': item_url,
        #             'item_image_url': image_url
        #         }

        #         res.append(data)


    print(res)
    # return res

live_url = "https://www.amazon.com/hz/wishlist/ls/YW88P7BXG3A0?ref_=wl_fv_le"
get_wishlist_items(live_url)