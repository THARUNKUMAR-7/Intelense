
from textblob import TextBlob
import re

def process_texts(texts):
    keywords = []
    hashtags = []
    sentiment = {"positive": 0, "neutral": 0, "negative": 0}

    for text in texts:
        if not isinstance(text, str) or not text.strip():
            continue
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity # type: ignore
        if polarity > 0:
            sentiment["positive"] += 1
        elif polarity < 0:
            sentiment["negative"] += 1
        else:
            sentiment["neutral"] += 1

        keywords.extend(blob.words) # type: ignore
        hashtags.extend(re.findall(r"#\w+", text))

    return {
        "keywords": list(set(keywords)),
        "hashtags": list(set(hashtags)),
        "sentiment": sentiment
    }
