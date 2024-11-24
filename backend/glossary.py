import re
import pdfplumber


def extract_text_from_pdf(pdf_path):
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
        return text

GLOSSARY_REF = {
    "Landlord": "The individual or entity who owns the property and agrees to rent it out to the tenant under the terms of this agreement.",
    "Tenant": "The individual or entity who agrees to rent the premises from the landlord and is obligated to comply with the terms of this agreement.",
    "Premises": "Refers to the First Floor portion of the building located at Plat No-182, Door No-16 New/10 Old, 24 East Street, Kamaraj Nagar, Thiruvanmiyur, including all electrical, sanitary fittings, and accessory structures provided by the landlord.",
    "Rent": "The monthly payment of Rs. 14,500 (Fourteen thousand and five hundred rupees) to be made by the tenant to the landlord on or before the 5th of each month.",
    "Advance Amount": "A sum of Rs. 100,000 (One lakh rupees) paid by the tenant to the landlord at the start of the tenancy, refundable without interest upon termination of the agreement or within 12 months, whichever is earlier.",
    "Tenancy Period": "The duration of this agreement, which is for 12 months starting from January 10, 2011, unless otherwise terminated as per agreed terms.",
    "Termination Notice": "A written notice of three months that either party must provide to the other to terminate the agreement before its expiration.",
    "Pro-Rated Rent": "The calculated portion of the monthly rent payable by the tenant for occupying the premises for part of a month.",
    "Reasonable Wear and Tear": "The natural and expected deterioration of the property over time through normal use, excluding damage caused by negligence or misuse.",
    "Municipal Taxes": "Taxes imposed by the local municipal authority on the property, which the landlord is responsible for paying.",
    "Electricity and Water Charges": "Utility costs incurred for electricity and water usage during the tenant's occupation, to be paid by the tenant.",
    "Vacant Possession": "The condition in which the tenant must return the premises to the landlord at the end of the tenancy, free of personal belongings and in good condition.",
    "Maintenance Expenses": "Repairs or upkeep of the property as mutually agreed between the landlord and tenant, which may be deducted from the rent amount payable by the tenant.",
    "Duplicate Agreement": "A copy of the rental agreement retained by the tenant for their reference, while the landlord holds the original.",
    "Waste": "Any act by the tenant that causes significant damage or devaluation to the property beyond normal wear and tear.",
    "Test": "Blahs"
}

def glossary():
    fp = "NER_model/Dummy_Sales_Agreement.pdf"
    text = extract_text_from_pdf(fp)

    relevant_keys = {}
    text_lower = text.lower()
    
    for key, definition in GLOSSARY_REF.items():
        key_lower = key.lower()
        words_in_definition = re.findall(r'\w+', definition.lower())  # Tokenize definition
        if key_lower in text_lower or any(word in text_lower for word in words_in_definition):
            relevant_keys[key] = definition
    
    return relevant_keys

if __name__ == "__main__":
    dictt = glossary()
    print(dictt)