import re
import nltk
import pdfplumber

file_path = "Dummy_Mortgage_Pre_Approval.pdf"

def ner_extractor(file_path):
    nltk.download('punkt')
    nltk.download('maxent_ne_chunker')
    nltk.download('words')

    def extract_text_from_pdf(pdf_path):
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
        return text
    
    def enhanced_preprocess_text(raw_text):
        text = re.sub(r'(?<=:)(?=[^\s])', ' ', raw_text)
        text = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', text)
        text = re.sub(r'(?<=[0-9])(?=[A-Za-z])', ' ', text)
        text = re.sub(r'\n+', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'([a-zA-Z])([0-9])', r'\1 \2', text)
        return text
    
    def extract_named_entities(text):
        named_entities = []
        words = nltk.word_tokenize(text)
        tagged = nltk.pos_tag(words)
        chunked = nltk.ne_chunk(tagged)
        
        for chunk in chunked:
            if isinstance(chunk, nltk.Tree): 
                entity_name = " ".join([word for word, tag in chunk])
                entity_type = chunk.label()
                named_entities.append((entity_name, entity_type))
        return named_entities
    
    def extract_mortgage_terms(text):
        terms = {
            "Loan Amount": None,
            "Loan Type": None,
            "Interest Rate": None,
            "Loan Term": None,
            "Down Payment": None,
            "Validity Date": None,  
        }

        loan_amount_match = re.search(r"\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?", text) 
        loan_type_match = re.search(r"Loan Type\s*[:\-]?\s*(.*?)(?=\n|$)", text)
        interest_rate_match = re.search(r"\d+\.\d+%", text)  
        loan_term_match = re.search(r"\d+\s*years?\s*(fixed)?", text)  
        down_payment_match = re.search(r"\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?", text)

        terms["Loan Amount"] = loan_amount_match.group(0) if loan_amount_match else "Not Found"
        terms["Loan Type"] = loan_type_match.group(1) if loan_type_match else "Not Found"
        terms["Interest Rate"] = interest_rate_match.group(0) if interest_rate_match else "Not Found"
        terms["Loan Term"] = loan_term_match.group(0) if loan_term_match else "Not Found"
        terms["Down Payment"] = down_payment_match.group(0) if down_payment_match else "Not Found"
        return terms
    
    text = extract_text_from_pdf(file_path)
    fully_normalized_text = enhanced_preprocess_text(text)
    mortgage_terms = extract_mortgage_terms(fully_normalized_text)
    named_entities = extract_named_entities(fully_normalized_text)

    validity_date = "Not Found"
    for entity, entity_type in named_entities:
        if entity_type == "GPE" and "valid until" in entity:
            validity_date = entity
    mortgage_terms["Validity Date"] = validity_date
    mortgage_terms["Named Entities"] = named_entities

    return mortgage_terms


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
        "Loan Type": loan_type,
        "Loan Term": loan_term,
        "Down Payment": down_payment,
    }

if __name__ == "__main__":

    loan_details = extract_loan_details(file_path)
    ner_details = ner_extractor(file_path)

    combined_details = {
        "Loan Amount": ner_details["Loan Amount"],
        "Loan Type": loan_details["Loan Type"],
        "Interest Rate": ner_details["Interest Rate"],
        "Loan Term": loan_details["Loan Term"],
        "Down Payment": loan_details["Down Payment"],
    }

    print("\n--- Mortgage Pre-Approval Details ---")
    for term, value in combined_details.items():
        print(f"{term}: {value}")
