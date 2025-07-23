
import praw
import os

def scrape_reddit(keyword, days):
    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        user_agent="social_media_scraper"
    )
    posts = []
    for submission in reddit.subreddit("all").search(keyword, limit=50):
        posts.append({"title": submission.title, "text": submission.selftext})
    return posts
