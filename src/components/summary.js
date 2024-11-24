import React, { useState } from "react";

function Summary({ taskId }) {
    const summaries = {
        "1":`
        Summary: Jörg Utecht has been pre-approved for a mortgage loan by Skibidi Bank with the following terms:
        - Loan Amount: Up to $500,000
        - Loan Type: Conventional
        - Interest Rate: 5.75%
        - Loan Term: 30 years fixed
        - Down Payment: Minimum $100,000

        Conditions for pre-approval include income verification, creditworthiness, property appraisal, and submission of additional documents. Pre-approval is valid until February 22, 2025, and final approval is subject to Skibidi Bank's full underwriting review. Contact Jane Smith for more information.
        Landlord: The individual or entity who owns the property and agrees to rent it out to the tenant under the terms of this agreement. 
        Tenant: The individual or entity who agrees to rent the premises from the landlord and is obligated to comply with the terms of this agreement. 
        Premises: Refers to the First Floor portion of the building located at Plat No-182, Door No-16 New/10 Old, 24 East Street, Kamaraj Nagar, Thiruvanmiyur, including all electrical, sanitary fittings, and accessory structures provided by the landlord. 
        Rent: The monthly payment of Rs. 14,500 (Fourteen thousand and five hundred rupees) to be made by the tenant to the landlord on or before the 5th of each month. 
        Advance Amount: A sum of Rs. 100,000 (One lakh rupees) paid by the tenant to the landlord at the start of the tenancy, refundable without interest upon termination of the agreement or within 12 months, whichever is earlier. 
        Tenancy Period: The duration of this agreement, which is for 12 months starting from January 10, 2011, unless otherwise terminated as per agreed terms. 
        Termination Notice: A written notice of three months that either party must provide to the other to terminate the agreement before its expiration. 
        Pro-Rated Rent: The calculated portion of the monthly rent payable by the tenant for occupying the premises for part of a month. 
        Reasonable Wear and Tear: The natural and expected deterioration of the property over time through normal use, excluding damage caused by negligence or misuse. 
        Municipal Taxes: Taxes imposed by the local municipal authority on the property, which the landlord is responsible for paying. 
        Electricity and Water Charges: Utility costs incurred for electricity and water usage during the tenant's occupation, to be paid by the tenant. 
        Vacant Possession: The condition in which the tenant must return the premises to the landlord at the end of the tenancy, free of personal belongings and in good condition. 
        Maintenance Expenses: Repairs or upkeep of the property as mutually agreed between the landlord and tenant, which may be deducted from the rent amount payable by the tenant. 
        Duplicate Agreement: A copy of the rental agreement retained by the tenant for their reference, while the landlord holds the original. 
        Waste: Any act by the tenant that causes significant damage or devaluation to the property beyond normal wear and tear.
        `,
        "2":`
        Agreement between Buyer (Jörg Utecht) and Seller (John Doe) for the sale of real property at 456 Dream House Blvd, Capital City, SK 56789.
        Purchase Price: $650,000. Payment terms include $10,000 earnest money, $100,000 down payment, and $540,000 financing from Skibidi Bank.
        Loan commitment: Contingent on Skibidi Bank loan of $500,000 at 5.75% interest rate for 30 years with a $100,000 down payment.
        Inspections and contingencies: Tenant has rights for property inspections, appraisal, and title contingencies.
        Closing and possession: Scheduled on March 1, 2025, at Skibidi Bank. Possession given at closing.
        Seller's disclosures: Seller must disclose property defects and provide existing reports to the Buyer.
        Title and escrow: The Landlord will provide Title Insurance Policy, and an escrow account will be established with Skibidi Bank.
        Default and remedies: Penalties for defaulting parties, including termination of the agreement or seeking specific performance.
        Dispute resolution: Disputes will be resolved through mediation and arbitration.
        Miscellaneous terms: Force Majeure clause and entire agreement clause.
        Signatures: Parties affirm agreement to terms.
        Exhibits: Loan Commitment Letter (Exhibit A), Plat Map (Exhibit B), Inspection Report (Exhibit C).
        `,
        "3":`
        Current state: Nothing for now...
        `,
        "4":`
        Current state: Nothing for now...
        `
        }

    const parseTextToKeyValue = (inputText) => {
        const lines = inputText.split("\n"); // Split the string into lines
        const keyValuePairs = {};
    
        lines.forEach((line) => {
        const parts = line.split(":"); // Split each line by colon
        if (parts.length > 1) {
            const key = parts[0].trim(); // Extract and trim the key
            const value = parts.slice(1).join(":").trim(); // Join the rest as the value
            keyValuePairs[key] = value;
        }
        });
    
        return keyValuePairs;
    };
    const data = parseTextToKeyValue(summaries[taskId])

  return (
    <div style={{width:"90vh"}}>

    {Object.entries(data).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "1rem" }}>
            <strong>{key}:</strong> 
            <br style={{marginTop:'0.5em'}}/> 
            {value}
            </div>
        ))}

    </div>
  );
}

export default Summary;
