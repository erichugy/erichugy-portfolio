import cohere
from config import COHERE_API_KEY
from typing import List


def sentiment(input_texts: List[str]):
    """Classify sentiment of text using Cohere's classify endpoint.

    Returns a recommendation score between -1 and 1.
    """
    if not COHERE_API_KEY:
        raise RuntimeError(
            "COHERE_API_KEY environment variable is not set. "
            "Please set it before using the ML sentiment model."
        )

    co = cohere.Client(COHERE_API_KEY)

    n = 0
    m = 0
    recommendation_score = 0

    while n < len(input_texts):
        m += min(95, len(input_texts) - n)
        batch = input_texts[n:m]
        if len(batch) == 0:
            n += m
            continue

        try:
            classifications = co.classify(
                model="9dad2d66-6da3-4aff-8812-73a58cce7e99-ft",
                inputs=batch,
            )
        except Exception as e:
            raise RuntimeError(f"Cohere API classification failed: {e}")

        k = len(classifications.classifications)
        for classification in classifications.classifications:
            if classification.prediction == "positive":
                recommendation_score += classification.confidence / k
            elif classification.prediction == "negative":
                recommendation_score -= classification.confidence / k

        n += m

    return recommendation_score
