import argparse
import json
import sys
from script import get_wishlist_items

def main():
    # Create argument parser incl. URL as required and parse
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    args = parser.parse_args()

    # Run script and turn output into JSON
    try:
        items = get_wishlist_items(args.url)
        print(json.dumps(items))
    
    # To handle script failures and exit
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
    
if __name__ == "__main__":
    main()