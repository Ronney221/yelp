import os
os.environ["YELP_API_KEY"] = "your-yelp-api-key-here"
from yelp import main

args = {"yelpUrl": "https://www.yelp.com/biz/sugo-hand-roll-bar-seattle-2?osq=sugo"}
result = main(args)
print(result)