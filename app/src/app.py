#skeleton flask backend
from flask import Flask, jsonify, request
from flask_cors import CORS
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import json

app = Flask(__name__)
CORS(app)

anthropic = Anthropic(
    # defaults to os.environ.get("ANTHROgit PIC_API_KEY")
    api_key="REDACTED",
)
client = Anthropic()

#storing the main data that will be displayed
goals_json_master = {}

#storing the temporary data that user will modify before being pushed into main
temp_json = {"temp": "None"}




@app.route('/api/general_prompt', methods=['POST'])
def modify_goals():
    global temp_json
    data = request.get_json()
    SPEECH = data['message']

    prompt = f"""{HUMAN_PROMPT} you are a cheerful and encouraging life coach. Your client says the following speech. <speech>{SPEECH}</speech> 
    It is your job to detect any specific long-term goals they mention. First, within <thinking> tags, detect whether each of the client’s sentiments describe one of the following: 
    a long-term goal, a one-time short-term milestone, a frequent habit. Additionally, think about whether the mentioned milestones and/or habits could be associated with their specified 
    long-term goals. Individual sentiments in their speech should only belong to one of these categories, so one sentiment should not be both a goal and a milestone. 
    After the thinking, create a list of goals along with their associated milestones or habits. If there are milestones/habits that do not have a goal associated, 
    keep them seperate under a goal named “undefined”. Then, either edit or add new objects to the pastJSON shown below based on this list of goals, milestones, and habits. 
    If there is an undefined goal with no milestones or habits attached, delete it from the JSON. 
    The format of objects is like so: {{ “ID”: 0, "name": "goal", "milestones": [{{“name”: “milestone”, deadline: “2024-01-15T12:00:00Z”, “done”: false }}], "habits": [{{“name”: “habit”, “freq”: 3}}] }}. 
    If the client doesn’t give specific deadlines for milestones or frequencies for habits, then leave them as -1, do not make up deadlines or frequencies. 
    If there exists habits or milestones that don't have a long-term goal associated with them, add a goal object in the JSON except its name parameter should be "undefined". 
    Return the edited JSON in <newJSON> tags. In the end, craft a response to the human client that lists the edits in their goals system for the user to confirm whether they are correct or not.
    Keep this response brief, organized, and friendly! Use newline characters as needed. This must be in <response> tags.
    JSON info for before: <pastJSON>{temp_json}</pastJSON>

    {AI_PROMPT}
    """
    json_completion = anthropic.completions.create(
        model="claude-2",
        max_tokens_to_sample=1000,
        prompt=prompt,
    )
    response_raw = json_completion.completion
    new_json = extract_newJSON_tags(response_raw)
    response = extract_response_tags(response_raw)
    temp_json = new_json
    return jsonify(response_raw)

#extract text btwn new json tags
def extract_newJSON_tags(response_text):
    start_json = response_text.find("<newJSON>") + len("<newJSON>")
    end_json = response_text.find("</newJSON>")
    #need to do this since quotes f it up
    json_str = response_text[start_json:end_json].replace("'", '"')
    json_str = json_str.replace("True", "true").replace("False", "false")
    print(json_str)
    json_data = json.loads(json_str)
    return json_data

#extract text btwn response tags
def extract_response_tags(response_text):
    start_response = response_text.find("<response>") + len("<response>")
    end_response = response_text.find("</response>")
    response_message = response_text[start_response:end_response]
    return response_message




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