import re


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

def glossary(text):
    relevant_keys = []
    text_lower = text.lower()
    
    for key, definition in GLOSSARY_REF.items():
        # Check if the key or any word from the definition appears in the text
        key_lower = key.lower()
        words_in_definition = re.findall(r'\w+', definition.lower())  # Tokenize definition
        if key_lower in text_lower or any(word in text_lower for word in words_in_definition):
            relevant_keys.append(key)
    
    return relevant_keys

if __name__ == "__main__":
    text = """
1. The Landlord agrees to let out and the tenant agrees to take on rent the First floor portion of the building Plat No-182, Door No 16 New/10 Old, 24 East Street, Kamaraj Nagar, Thiruvanmiyur along with electrical and sanitary fittings and other accessories fittings and structures (hereinafter called the premises) from Jan 10 2011 at the monthly rent of Rs. 14500 (Fourteen thousand and five hundred rupees) being payable on or before 5th of every month to the Landlord. The period of this agreement shall be twelve months w.e.f Jan 10, 2011.
    
    th
    
2. The tenant has paid Rs. 100000(0ne lack Rupees) as advance amount for the above building and the landlord shall pay this said advance without interest to the tenant at the time of vacating the premises or within 12 months of commencement of this agreement whichever is earlier.
3. At the termination of the period of tenancy the tenant agrees to surrender to the Landlord the vacant possession of the premises without raising any objection.
4. This rental agreement can be terminated at any time by three months notice on either side and on such termination the tenant shall surrender the vacant possession of the premises to the Landlord.
5. If for by any reason the tenant occupies the building for a period that includes part of a month, it is agreed that the rent will be charged on a pro-rated basis for that month.
6. The landlord shall pay all existing and future taxes, rates and assessments in respect of the lease hold including the municipal or other tax assessed by a local authority on the value of the building or annual letting value of the building and all other rates, taxes and assessments levied by any authority whatsoever.
7. The tenant shall pay the electricity and water supply charges for the period of time he occupies the premises.
8. The tenant agrees to leave at the end of tenancy the premises in good condition as they are now, subject to reasonable wear and tear.
9. The tenant also agreed not to let out the building or a portion of it to anybody else.
- The tenant shall not commit any act of waste in the premises.

11 The tenant also agrees to make any maintenance on the building as mutually agreed upon by the tenant and the landlord and the said expenses shall be adjusted against the rent amount due to the landlord.

12.The landlord shall retain the original of this agreement and the tenant shall retain its duplicate.
"""
    dictt = glossary(text)
    print(dictt)