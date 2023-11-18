#skeleton flask backend
<<<<<<< HEAD
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

#storing the main data that will be displayed
goals_json_master = {}

#storing the temporary data that user will modify before being pushed into main
temp_json = {}


@app.route('/api/general_prompt', methods=['POST'])
def modify_goals():
    data = request.get_json()
    SPEECH = data['message']
    prompt = f"""human: you are a cheerful and encouraging life coach. Your client says the following speech. <speech>{SPEECH}</speech> 
    It is your job to detect any specific long-term goals they mention. 
    Additionally, detect whether they mention short-term milestones or frequent habits that could be associated with detected long-term goals. 
    First, list out goals, milestones, and habits. Additionally, detect whether they mention short-term milestones or frequent habits that could be associated with detected long-term goals. 
    Then, either edit or add new objects to the pastJSON shown below based on the parsed list of goals, milestones, and habits. 
    The format of objects is { “ID”: 0, "name": "goal", "milestones": [{“name”: “milestone”, deadline: “2024-01-15T12:00:00Z”, “done”: false }], "habits": [{“name”: “habit”, “freq”: 3}] }. Frequency in the habits refer to how many times per week. If the client doesn’t give specific deadlines for milestones or frequencies for habits, then leave them blank. If there exists habits or milestones that don't have a long-term goal associated with them, add a goal object in the JSON except its name parameter should be "undefined". Return the edited JSON in <newJSON> tags. In the end, craft a response to the human client that lists the edits in their goals system for the user to confirm whether they are correct or not. This should be in <response> tags.

    JSON info for before: <pastJSON>{{JSON}}</pastJSON>

    Assistant:
    """ 
    return 2








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




=======
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

#example function
@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello from Flask!'})
>>>>>>> refs/remotes/origin/anthropic_prompting

if __name__ == '__main__':
    app.run()