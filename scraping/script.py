from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from bs4 import BeautifulSoup

# Handling for long wishlists >10 items
def handle_lazy_load(driver, max_scrolls=10):
    scrolls = 0
    last_height = driver.execute_script("return document.body.scrollHeight")

    while scrolls < max_scrolls:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1.5)
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break

        last_height = new_height
        scrolls += 1

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

    handle_lazy_load(driver, max_scrolls=5)

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

        ## Other metadata
        def find_span_id(prefix):
            return wishlist_item.find(
                "span", 
                id=lambda text: text is not None and text.startswith(prefix)
            )

        item_needed = find_span_id("itemRequested_")
        item_received = find_span_id("itemPurchased_")
        item_priority = find_span_id("itemPriorityLabel_")

        needs_qty = int(item_needed.get_text(strip=True)) if item_needed else 0
        has_qty = int(item_received.get_text(strip=True)) if item_received else 0

        fulfilled_flag = (needs_qty > 0 and has_qty >= needs_qty)

        priority_val = item_priority.get_text().replace(">", "").strip() if item_priority else None

        ## Add wishlist item objects to list/array
        if item_name:
            data = {
                "item_name": item_name,
                "item_url": item_url,
                "image_url": image_url,
                "item_needed": needs_qty,
                "item_received": has_qty,
                "item_priority": priority_val,
                "fulfilled": fulfilled_flag,
            }
        
            res.append(data)

    return res
