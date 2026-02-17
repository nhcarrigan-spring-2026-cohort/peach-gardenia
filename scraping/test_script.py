from script import get_wishlist_items

live_url = 'https://www.amazon.com/hz/wishlist/ls/1T2147MBC53OK?ref_=wl_fv_le'

result = get_wishlist_items(live_url)
print(result)