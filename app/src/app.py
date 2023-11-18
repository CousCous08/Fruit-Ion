#skeleton flask backend
from flask import Flask, jsonify, request
from flask_cors import CORS
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT

app = Flask(__name__)
CORS(app)

anthropic = Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="REDACTED",
)
client = Anthropic()

#example function
@app.route('/api/test_prompt', methods=['POST'])
def data():
    data = request.get_json()
    input = data['message']
    test_prompt = f"""{HUMAN_PROMPT} translate the statement in XML tags into Chinese: <statement> {input} <\statement> {AI_PROMPT} """
    json_completion = anthropic.completions.create(
        model="claude-2",
        max_tokens_to_sample=300,
        prompt = test_prompt,
    )
    return jsonify(json_completion.completion)

if __name__ == '__main__':
    app.run()