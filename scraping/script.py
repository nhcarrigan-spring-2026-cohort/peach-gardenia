import requests
from bs4 import BeautifulSoup


def get_wishlist_items():

    headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    }

    ### Using local file to test
    # with open("Amazon.htm", "r", encoding="utf-8") as file:
    #     page = file.read()
        
    # soup = BeautifulSoup(page, "html.parser")

    ### Using live URL
    url = "https://www.amazon.com/hz/wishlist/ls/YW88P7BXG3A0?ref_=wl_fv_le"
    page = requests.get(url, headers=headers)
    print (page.text[:2000])

    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find(id="g-items")

    # if results is not None:
    #     wishlist_items = results.find_all("li", class_=lambda text: "g-item-sortable")

    wishlist_items = results.find_all("li", class_=lambda text: "g-item-sortable")

    res = []


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
            # item_add_date = wishlist_item.find("span", id=lambda text: text is not None and "itemAddedDate_" in text).text.strip()[11:]

            if item_add_string:
                item_add = item_add_string.text.strip()
                item_add_date = item_add[11:]

                data = {
                    'item_name': item_name,
                    'item_priority': item_priority.text.strip(),
                    'item_add_date': item_add_date,
                    'item_needed': item_needed.text.strip(),
                    'item_received': item_received.text.strip(),
                    'item_url': item_url,
                    'item_image_url': image_url
                }

                res.append(data)

    print(res)
    # return res

get_wishlist_items()