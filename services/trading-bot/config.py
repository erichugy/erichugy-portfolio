import logging
import os

logger = logging.getLogger(__name__)

ALPACA_API_KEY = os.environ.get("ALPACA_API_KEY", "")
ALPACA_API_SECRET = os.environ.get("ALPACA_API_SECRET", "")
COHERE_API_KEY = os.environ.get("COHERE_API_KEY", "")
MAX_ARTICLES = int(os.environ.get("MAX_ARTICLES", "10"))

# NOTE: warn early so container logs surface missing credentials before the first request fails
if not ALPACA_API_KEY or not ALPACA_API_SECRET:
    logger.warning("ALPACA_API_KEY or ALPACA_API_SECRET not set — /analyze will fail")
if not COHERE_API_KEY:
    logger.warning("COHERE_API_KEY not set — falling back to word-based sentiment")
