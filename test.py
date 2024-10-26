import requests

url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-05-29"

body = {
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "How much damage would a category 5 hurricane inflict?",
                },
            ],
        },
        # {
        #     "role": "assistant",pip install ibm-watsonx-aipip install ibm-watsonx-ai
        #     "content": "The image shows a map of the University of Florida campus, with various buildings and roads labeled. The image is an aerial view, which means it is a bird's-eye view of the area.\n\nTo estimate the damage a category 5 hurricane would inflict, we would need to know the size of the area affected by the storm. However, based on the image, it appears that the area is relatively small, covering only a few square miles.\n\nAssuming the storm makes landfall directly over the campus, the damage would likely be significant. Category 5 hurricanes are the strongest type of hurricane, with winds of at least 157 mph (253 km/h). They can cause catastrophic damage to buildings, infrastructure, and vegetation.\n\nIn this case, the damage would likely include:\n\n*   **Building damage:** The strong winds and heavy rainfall could cause significant damage to buildings on campus, including the University of Florida administration building, the Physical Plant Garage, and the Elmore Hall for Administrative Services.\n*   **Infrastructure damage:** The storm surge could flood low-lying areas, including the parking lots and roads surrounding the campus.\n*   **Vegetation damage:** The strong winds could knock down trees and power lines, causing widespread power outages and disrupting communication networks.\n\nOverall, a category 5 hurricane would likely cause significant damage to the University of Florida campus, including building and infrastructure damage, as well as vegetation damage. The extent of the damage would depend on the strength of the storm and the location of the landfall.",
        # },
    ],
    "project_id": "665e9733-c3bb-441c-9444-f402654d0a82",
    "model_id": "meta-llama/llama-3-2-11b-vision-instruct",
    "decoding_method": "greedy",
    "repetition_penalty": 1,
    "max_tokens": 900,
}

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer {ACCESS_TOKEN}",
}

response = requests.post(url, headers=headers, json=body)

if response.status_code != 200:
    raise Exception("Non-200 response: " + str(response.text))

data = response.json()

print(data)
