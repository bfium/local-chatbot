# Use a pipeline as a high-level helper
#from transformers import pipeline
from transformers import AutoModelForCausalLM
from transformers import pipeline

messages = [
    {"role": "user", "content": "Who are you?"},
]
#pipe = pipeline("text-generation", model="deepseek-ai/DeepSeek-V3", trust_remote_code=True)
# pipe(messages)
# Load model directly
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V3", trust_remote_code=True)

# Using DeepSeek's chat model instead
pipe = pipeline(
    "text-generation",
    model="deepseek-ai/deepseek-coder-6.7b-base",
    torch_dtype="auto",
    device_map="auto"
)

response = pipe(messages[0]['content'], max_new_tokens=500, do_sample=True, temperature=0.7)
print(response[0]['generated_text'])