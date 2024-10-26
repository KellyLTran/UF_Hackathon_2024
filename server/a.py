from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference

credentials = Credentials(
    url="https://us-south.ml.cloud.ibm.com",
    # api_key="eyJraWQiOiIyMDI0MTAwMjA4NDIiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiIza3RzMWpHVDZTLWU0ODdiYTVhLTkyYjItNDMzNS04ZTJjLWYzMjJiOTBkMTAwZCIsImlkIjoiM2t0czFqR1Q2Uy1lNDg3YmE1YS05MmIyLTQzMzUtOGUyYy1mMzIyYjkwZDEwMGQiLCJyZWFsbWlkIjoiM2t0czFqR1Q2UyIsImp0aSI6IjE2MjFiMjBmLWYyOWItNGRmYS1hYTg0LTg2NmFlODA5NDk3ZCIsImlkZW50aWZpZXIiOiJlNDg3YmE1YS05MmIyLTQzMzUtOGUyYy1mMzIyYjkwZDEwMGQiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJuYW1lIjoic3R1ZGVudF9zOHVzbnIiLCJlbWFpbCI6InN0dWRlbnRfczh1c25yQHRlY2h6b25lLmlibS5jb20iLCJzdWIiOiJzdHVkZW50X3M4dXNuciIsImF1dGhuIjp7InN1YiI6InN0dWRlbnRfczh1c25yIiwiaWFtX2lkIjoiM2t0czFqR1Q2Uy1lNDg3YmE1YS05MmIyLTQzMzUtOGUyYy1mMzIyYjkwZDEwMGQiLCJuYW1lIjoic3R1ZGVudF9zOHVzbnIiLCJnaXZlbl9uYW1lIjoibm90c2V0IiwiZmFtaWx5X25hbWUiOiJub3RzZXQiLCJlbWFpbCI6InN0dWRlbnRfczh1c25yQHRlY2h6b25lLmlibS5jb20ifSwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiOWViZTFkNzI5ZTc2NGE4NDgzMDYyNzg3NGM0NzI3MjEiLCJpbXNfdXNlcl9pZCI6IjEyODgzODg2IiwiZnJvemVuIjp0cnVlLCJpc19lbnRlcnByaXNlX2FjY291bnQiOmZhbHNlLCJlbnRlcnByaXNlX2lkIjoiZWU1NzVjNTc3ODc2NGQ0MDkxNTVhYTM1NzgwZWM4ZDEiLCJpbXMiOiIyOTQ4MzYzIn0sImlhdCI6MTcyOTkyNjY2NiwiZXhwIjoxNzI5OTMwMjY2LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.Ksln4WAl3ktdleftKoOstObgRXreBCB2-w_mOz-nKPrX-pRuIdqo-yyTUAg4f6Zyl1x0Tw9-OAXlRQXw0ETx2QdyQGe78YECpUahXQ6vBYFlHPSTwVcdeCrNoCwazIJN6Bc07U8Cs6CXf789bn2G1fdS-y6GhxS6FF5tmYlizOeKl2_ShW47MUx0OMr8zfKd44XH1JPuL6RQHBlGbmdsj3-RpjBHsiOyljVJ0RHDRGVaxd-DdhB0NM4hxVRAZpfLIkpZmcM76Bk9xIEuLoFo1dNyUcZd1SeNB9exxA9UPK8OBduDNCVcl1HmCx7hfYkvkck03lIG0XsMv0tnX_Lj2g",
    api_key="XFF7bTQxcXyM0a5VTm7DQf0cdBx4wzith_46rwIzwP0C",
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
