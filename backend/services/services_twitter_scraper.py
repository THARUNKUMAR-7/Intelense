
import snscrape.modules.twitter as sntwitter
from datetime import datetime, timedelta

def scrape_twitter(keyword, days):
    since_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    query = f"{keyword} since:{since_date}"
    tweets = []
    for tweet in sntwitter.TwitterSearchScraper(query).get_items():
        if len(tweets) >= 50:
            break
        tweets.append({"text": tweet.content}) # type: ignore
    return tweets
