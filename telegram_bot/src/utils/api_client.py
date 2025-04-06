from requests import get, post
from config import BACKEND_URL, TIMEOUT

def get_data(endpoint):
    url = f"{BACKEND_URL}/{endpoint}"
    try:
        response = get(url, timeout=TIMEOUT)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching data from {url}: {e}")
        return None

def post_data(endpoint, data):
    url = f"{BACKEND_URL}/{endpoint}"
    try:
        response = post(url, json=data, timeout=TIMEOUT)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error posting data to {url}: {e}")
        return None