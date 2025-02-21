import os
from http import HTTPStatus
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions, EmotionOptions, ConceptsOptions

def convert_to_rating(score):
    return round(((score + 1) / 2) * 5, 2)

def convert_to_percentage(decimal):
    return round(decimal * 100, 2)

def main(args):
    reviews = args.get("reviews", [])
    if not reviews:
        return {"statusCode": HTTPStatus.BAD_REQUEST, "body": "Missing reviews"}

    api_key = os.getenv("WATSON_API_KEY")
    api_url = os.getenv("WATSON_API_URL")
    authenticator = IAMAuthenticator(api_key)
    nlu = NaturalLanguageUnderstandingV1(version="2022-04-07", authenticator=authenticator)
    nlu.set_service_url(api_url)

    results = []
    for review in reviews[:3]:  # Limit to 3 reviews
        features = Features(
            sentiment=SentimentOptions(),
            emotion=EmotionOptions(),
            concepts=ConceptsOptions(limit=3)
        )
        response = nlu.analyze(text=review["text"], features=features).get_result()

        sentiment = response["sentiment"]["document"]
        emotion = response["emotion"]["document"]["emotion"]
        concepts = [
            {"text": c["text"], "relevance": convert_to_percentage(c["relevance"])}
            for c in response.get("concepts", []) if c["relevance"] > 0.5
        ]

        emotions = [
            f"{k.capitalize()}: {convert_to_percentage(v)}%"
            for k, v in sorted(emotion.items(), key=lambda x: x[1], reverse=True)
        ]

        results.append({
            "name": review["name"],
            "text": review["text"],
            "rating": f"{convert_to_rating(sentiment['score'])}/5 star {sentiment['label']}",
            "emotions": emotions,
            "concepts": concepts if concepts else ["None"]
        })

    overall_rating = round(sum(float(r["rating"].split("/")[0]) for r in results) / len(results), 2)
    return {"statusCode": HTTPStatus.OK, "body": {"results": results, "overall_rating": overall_rating}}
