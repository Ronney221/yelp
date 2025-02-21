import os
import requests
from http import HTTPStatus

def main(args):
    print("START: yelp.py")  # Debug
    yelp_url = args.get("yelpUrl", "")
    print("Yelp URL:", yelp_url)
    if not yelp_url or "/biz/" not in yelp_url:
        return {
            "statusCode": HTTPStatus.BAD_REQUEST,
            "body": "Invalid or missing Yelp URL",
            "headers": {"Content-Type": "application/json"}
        }

    business_id = yelp_url.split("/biz/")[-1].split("?")[0]
    print("Business ID:", business_id)
    yelp_api_key = os.getenv("YELP_API_KEY")
    if not yelp_api_key:
        return {
            "statusCode": HTTPStatus.INTERNAL_SERVER_ERROR,
            "body": "API key missing",
            "headers": {"Content-Type": "application/json"}
        }

    headers = {"Authorization": f"Bearer {yelp_api_key}"}
    url = f"https://api.yelp.com/v3/businesses/{business_id}/reviews?limit=3&sort_by=yelp_sort"
    print("Fetching:", url)

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        print("Yelp API Response:", data)
        reviews = [
            {
                "text": r["text"],
                "name": r["user"]["name"],
                "time_created": r["time_created"]
            } for r in data.get("reviews", [])
        ]
        result = {
            "statusCode": HTTPStatus.OK,
            "body": {
                "business_name": business_id.replace("-", " ").upper(),
                "reviews": reviews
            },
            "headers": {"Content-Type": "application/json"}
        }
        print("Returning:", result)
        return result
    except requests.exceptions.HTTPError as e:
        error = {
            "statusCode": e.response.status_code,
            "body": e.response.text,
            "headers": {"Content-Type": "application/json"}
        }
        print("HTTP Error:", error)
        return error
    except Exception as e:
        error = {
            "statusCode": HTTPStatus.INTERNAL_SERVER_ERROR,
            "body": str(e),
            "headers": {"Content-Type": "application/json"}
        }
        print("General Error:", error)
        return error