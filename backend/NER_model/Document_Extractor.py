import re
import pdfplumber

# File path to the uploaded PDF
file_path = "Dummy_Mortgage_Pre_Approval.pdf"

def extract_loan_details(file_path):
    def enhanced_preprocess_text(raw_text):
        text = re.sub(r'(?<=:)(?=[^\s])', ' ', raw_text)  
        text = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', text)  
        text = re.sub(r'(?<=[0-9])(?=[A-Za-z])', ' ', text)  
        text = re.sub(r'\n+', ' ', text) 
        text = re.sub(r'\s+', ' ', text) 
        return text

    def simplify_value(field, value):
        if field == "Loan Amount" or field == "Down Payment":
            match = re.search(r"\$\d{1,3}(?:,\d{3})*", value)  
            return match.group(0) if match else value
        elif field == "Interest Rate":
            match = re.search(r"\d+\.\d+%", value) 
            return match.group(0) if match else value
        elif field == "Loan Term":
            match = re.search(r"\d+", value)  
            return match.group(0) if match else value
        return value

    with pdfplumber.open(file_path) as pdf:
        raw_text = ""
        for page in pdf.pages:
            raw_text += page.extract_text()

    fully_normalized_text = enhanced_preprocess_text(raw_text)

    loan_amount = re.search(r"Loan Amount: (.*?)(?= Loan Type|$)", fully_normalized_text)
    loan_type = re.search(r"Loan Type: (.*?)(?= Interest Rate|$)", fully_normalized_text)
    interest_rate = re.search(r"Interest Rate: (.*?)(?= Loan Term|$)", fully_normalized_text)
    loan_term = re.search(r"Loan Term: (.*?)(?= Down Payment|$)", fully_normalized_text)
    down_payment = re.search(r"Down Payment: (.*?)(?= This pre-approval|$)", fully_normalized_text)

    loan_amount = loan_amount.group(1).strip() if loan_amount else "Not Found"
    loan_type = loan_type.group(1).strip() if loan_type else "Not Found"
    interest_rate = interest_rate.group(1).strip() if interest_rate else "Not Found"
    loan_term = loan_term.group(1).strip() if loan_term else "Not Found"
    down_payment = down_payment.group(1).strip() if down_payment else "Not Found"

    loan_amount = simplify_value("Loan Amount", loan_amount)
    interest_rate = simplify_value("Interest Rate", interest_rate)
    loan_term = simplify_value("Loan Term", loan_term)
    down_payment = simplify_value("Down Payment", down_payment)

    return {
        "Loan Amount": loan_amount,
        "Loan Type": loan_type,
        "Interest Rate": interest_rate,
        "Loan Term": loan_term,
        "Down Payment": down_payment,
    }

loan_details = extract_loan_details(file_path)
for key, value in loan_details.items():
    print(f"{key}: {value}")

