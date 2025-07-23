
from newspaper import Article
import feedparser

def scrape_news(keyword, days):
    feed = feedparser.parse("https://news.google.com/rss/search?q=" + keyword)
    articles = []
    for entry in feed.entries[:10]:
        try:
            article = Article(entry.link)
            article.download()
            article.parse()
            # Use article title/text if available, else fallback to RSS entry
            title = article.title.strip() if hasattr(article, 'title') and article.title and article.title.strip() else entry.title
            text = article.text.strip() if hasattr(article, 'text') and article.text and article.text.strip() else getattr(entry, 'summary', '')
            combined_text = f"{title}\n{text}"
            articles.append({"text": combined_text})
        except Exception:
            # Fallback: use RSS entry title and summary
            fallback_title = entry.title if hasattr(entry, 'title') else ''
            fallback_text = getattr(entry, 'summary', '')
            combined_text = f"{fallback_title}\n{fallback_text}"
            articles.append({"text": combined_text})
    return articles
