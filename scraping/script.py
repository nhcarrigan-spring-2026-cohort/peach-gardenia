import requests
from bs4 import BeautifulSoup

with open("Amazon.htm", "r", encoding="utf-8") as file:
    page = file.read()
    
soup = BeautifulSoup(page, "html.parser")

# url = "https://www.amazon.com/hz/wishlist/ls/YW88P7BXG3A0"
# page = requests.get(url)

# soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id="g-items")

wishlist_items = results.find_all("li", class_=lambda text: "g-item-sortable")

for wishlist_item in wishlist_items:
    item = wishlist_item.find(
        "a", 
        id=lambda text: text is not None and "itemName_" in text,
        class_="a-link-normal", 
    )

    if item and item.get("title"):
        item_name = item.get("title")
        item_url = f"https://www.amazon.com/{item.get("href")}"
        image_url = wishlist_item.find("img").get("src")

        item_needed = wishlist_item.find("span", id=lambda text: text is not None and "itemRequested_" in text)
        item_received = wishlist_item.find("span", id=lambda text: text is not None and "itemPurchased_" in text)
        item_priority = wishlist_item.find("span", id=lambda text: text is not None and "itemPriorityLabel_" in text)

        item_add_string = wishlist_item.find("span", id=lambda text: text is not None and "itemAddedDate_" in text)

        if item_add_string:
            item_add = item_add_string.text.strip()
            item_add_date = item_add[11:]

            print(f"Item name: {item_name}")
            print(f"Item priority: {item_priority.text.strip()}")
            print(f"Item added on: {item_add_date}")
            print(f"Items needed: {item_needed.text.strip()}")
            print(f"Items received: {item_received.text.strip()}")
            print(f"Item URL: {item_url}")
            print(f"Image URL: {image_url}\n\n")