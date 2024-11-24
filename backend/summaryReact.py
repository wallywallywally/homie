from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import pdfplumber
from secretkey import apikey

os.environ['OPENAI_API_KEY'] = apikey

app = Flask(__name__)
CORS(app)

def extract_text_from_pdf():
        pdf_path = "NER_model/Dummy_Mortgage_Pre_Approval.pdf"
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
        return text

def default_chat_completion(text):
    messages = [
        {"role": "system", "content": "You are a housing chatbot specialised in helping people understand housing contracts. "
                                       "Always summarise in a concise manner and easy to understand. "}
    ]

    messages.append({"role": "user", "content": f"Summarise this {text}"})

    completion = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    response_content = completion.choices[0].message.content.strip()
    
    return response_content

@app.route('/summarize', methods=['POST'])
def summarize_pdf():
    """
    API Endpoint to summarize an uploaded PDF.
    """
    try:
        # Check if the file is in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        # Extract text from PDF
        text = extract_text_from_pdf(file)
        
        # Generate summary
        summary = default_chat_completion(text)
        return jsonify({"summary": summary})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)