#just for testing anthropic -- not necessary for actual application
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT

anthropic = Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="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",
)
client = Anthropic()

"""
completion = anthropic.completions.create(
    model="claude-2",
    max_tokens_to_sample=300,
    prompt=f"{HUMAN_PROMPT} how does a court case get to the Supreme Court?{AI_PROMPT}",
)
print(completion.completion)
print()
"""

"""
prompt2 = f"{HUMAN_PROMPT} my name is bob {AI_PROMPT} omg hi {HUMAN_PROMPT} i am 4 yrs old {AI_PROMPT} yas {HUMAN_PROMPT} who and how old am i {AI_PROMPT}"
client = Anthropic()
print(client.count_tokens(prompt2))


completion2 = anthropic.completions.create(
    model="claude-2",
    #max_tokens_to_sample seems to affect the length of claude's response (eg if it is set to 5 then claude's response will contain max of 5 tokens)
    max_tokens_to_sample=300,
    #can simulate multiple exchanges this way
    prompt=prompt2,
)
#print(completion2.completion)
print(completion2.completion)
print(HUMAN_PROMPT)
print(AI_PROMPT)
"""

STATEMENT = """Well, I want to be able to bench 180 by the end of the year. And I’d really like to get an A in my ML project, but I’m really struggling with finding the motivation to work on my 
project right now, and I always end up delaying things to the last minute and then doing badly. hmm… I guess I would also like to get a boyfriend"""
to_json_prompt = f"""{HUMAN_PROMPT} you are a professional life coach. I want you to extract the goals from the following statement and output them in the JSON format. Extract only the end goals.
Use the keys as 'goal_1', 'goal_2',and so on. <statement> {STATEMENT} <\statement> {AI_PROMPT} here you go:"""
print(to_json_prompt)
print(client.count_tokens(to_json_prompt))
json_completion = anthropic.completions.create(
    model="claude-2",
    max_tokens_to_sample=300,
    prompt = to_json_prompt,
    stream=True,
)
#this is how you stream a response
for completion in json_completion:
    print(completion.completion, end="", flush=True)