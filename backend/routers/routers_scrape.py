from fastapi import APIRouter, Query, HTTPException
from services.services_reddit_scraper import scrape_reddit
from services.services_twitter_scraper import scrape_twitter
from services.services_news_scraper import scrape_news
from utils.utils_cache import get_cache, set_cache

router = APIRouter(prefix="/scrape", tags=["Scrape"])

@router.get("/")
def scrape_data(keyword: str, platform: str, days: int = 7):
    if not keyword or not platform:
        raise HTTPException(status_code=400, detail="Keyword and platform are required.")
    # cache_key = f"{platform}:{keyword}:{days}"
    # cached = get_cache(cache_key)
    # if cached:
    #     print(f"/scrape returning cached data for {cache_key}: {cached}")
    #     return cached

    try:
        if platform == "reddit":
            data = scrape_reddit(keyword, days)
        elif platform == "twitter":
            data = scrape_twitter(keyword, days)
        elif platform == "news":
            data = scrape_news(keyword, days)
        else:
            raise HTTPException(status_code=400, detail="Unsupported platform")
    except Exception as e:
        print(f"/scrape error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    print(f"/scrape returning data for {platform}: {data}")
    # set_cache(cache_key, data)
    return data

# Test endpoints for each service
@router.get("/news-test")
def test_news(keyword: str = "Apple", days: int = 7):
    return scrape_news(keyword, days)

@router.get("/twitter-test")
def test_twitter(keyword: str = "Apple", days: int = 7):
    return scrape_twitter(keyword, days)

@router.get("/reddit-test")
def test_reddit(keyword: str = "Apple", days: int = 7):
    return scrape_reddit(keyword, days)
