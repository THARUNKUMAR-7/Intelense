# Simple in-memory cache fallback if Redis is unavailable
import threading
import time


import redis
import json
_use_redis = False
_cache = {}
_cache_expiry = {}
_lock = threading.Lock()
try:
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.ping()  # Test connection
    _use_redis = True
except Exception:
    _use_redis = False

CACHE_TTL = 3600  # 1 hour

def get_cache(key):
    if _use_redis:
        val = r.get(key)
        if val:
            return json.loads(val) # type: ignore
        return None
    else:
        with _lock:
            if key in _cache and _cache_expiry[key] > time.time():
                return _cache[key]
            if key in _cache:
                del _cache[key]
                del _cache_expiry[key]
        return None

def set_cache(key, value, ex=CACHE_TTL):
    if _use_redis:
        r.set(key, json.dumps(value), ex=ex)
    else:
        with _lock:
            _cache[key] = value
            _cache_expiry[key] = time.time() + ex
