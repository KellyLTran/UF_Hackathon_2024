from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference

credentials = Credentials(
    url="https://us-south.ml.cloud.ibm.com",
    api_key="{api key}",
)

client = APIClient(credentials)

model = ModelInference(
    model_id="meta-llama/llama-3-2-11b-vision-instruct",
    api_client=client,
    project_id="665e9733-c3bb-441c-9444-f402654d0a82",
    params={"max_new_tokens": 100},
)

messages = [
    {
        "role": "assistant",
        "content": "You are a helpful tour guide in Ocala, Florida.",
    },
    {
        "role": "user",
        "content": "What place should a student visit? Be specific and give addresses of the places",
    },
]
generated_response = model.chat(messages=messages)

# Print all response
print(generated_response)

# Print only content
# print(generated_response["choices"][0]["message"]["content"])
