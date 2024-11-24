import React, { useState, useEffect } from "react";
import '../css/centre.css'

const TaskFileUploader = ({ taskId, summed, setSummed }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  // Title dict
  const doctypes = {
    "1":"Mortgage Statement",
    "2":"Sales Agreement",
    "3":"Offer Letter",
    "4":"Loan Approval",
  }

  const summaries = {
    "1":`
  Summary:
Jörg Utecht has been pre-approved for a mortgage loan by Skibidi Bank with the following terms:
- Loan Amount: Up to $500,000
- Loan Type: Conventional
- Interest Rate: 5.75%
- Loan Term: 30 years fixed
- Down Payment: Minimum $100,000
Conditions for pre-approval include income verification, creditworthiness, property appraisal, and submission of additional documents. Pre-approval is valid until February 22, 2025, and final approval is subject to Skibidi Bank's full underwriting review. Contact Jane Smith for more information.
Landlord : The individual or entity who owns the property and agrees to rent it out to the tenant under the terms of this agreement. 
Tenant : The individual or entity who agrees to rent the premises from the landlord and is obligated to comply with the terms of this agreement. 
Premises : Refers to the First Floor portion of the building located at Plat No-182, Door No-16 New/10 Old, 24 East Street, Kamaraj Nagar, Thiruvanmiyur, including all electrical, sanitary fittings, and accessory structures provided by the landlord. 
Rent : The monthly payment of Rs. 14,500 (Fourteen thousand and five hundred rupees) to be made by the tenant to the landlord on or before the 5th of each month. 
Advance Amount : A sum of Rs. 100,000 (One lakh rupees) paid by the tenant to the landlord at the start of the tenancy, refundable without interest upon termination of the agreement or within 12 months, whichever is earlier. 
Tenancy Period : The duration of this agreement, which is for 12 months starting from January 10, 2011, unless otherwise terminated as per agreed terms. 
Termination Notice : A written notice of three months that either party must provide to the other to terminate the agreement before its expiration. 
Pro-Rated Rent : The calculated portion of the monthly rent payable by the tenant for occupying the premises for part of a month. 
Reasonable Wear and Tear : The natural and expected deterioration of the property over time through normal use, excluding damage caused by negligence or misuse. 
Municipal Taxes : Taxes imposed by the local municipal authority on the property, which the landlord is responsible for paying. 
Electricity and Water Charges : Utility costs incurred for electricity and water usage during the tenant's occupation, to be paid by the tenant. 
Vacant Possession : The condition in which the tenant must return the premises to the landlord at the end of the tenancy, free of personal belongings and in good condition. 
Maintenance Expenses : Repairs or upkeep of the property as mutually agreed between the landlord and tenant, which may be deducted from the rent amount payable by the tenant. 
Duplicate Agreement : A copy of the rental agreement retained by the tenant for their reference, while the landlord holds the original. 
Waste : Any act by the tenant that causes significant damage or devaluation to the property beyond normal wear and tear.
  `,
  "2":`
  Summary:
- Agreement between Buyer (Jörg Utecht) and Seller (John Doe) for the sale of real property at 456 Dream House Blvd, Capital City, SK 56789.
- Purchase Price: $650,000. Payment terms include $10,000 earnest money, $100,000 down payment, and $540,000 financing from Skibidi Bank.
- Loan commitment: Contingent on Skibidi Bank loan of $500,000 at 5.75% interest rate for 30 years with a $100,000 down payment.
- Inspections and contingencies: Tenant has rights for property inspections, appraisal, and title contingencies.
- Closing and possession: Scheduled on March 1, 2025, at Skibidi Bank. Possession given at closing.
- Seller's disclosures: Seller must disclose property defects and provide existing reports to the Buyer.
- Title and escrow: The Landlord will provide Title Insurance Policy, and an escrow account will be established with Skibidi Bank.
- Default and remedies: Penalties for defaulting parties, including termination of the agreement or seeking specific performance.
- Dispute resolution: Disputes will be resolved through mediation and arbitration.
- Miscellaneous terms: Force Majeure clause and entire agreement clause.
- Signatures: Parties affirm agreement to terms.
- Exhibits: Loan Commitment Letter (Exhibit A), Plat Map (Exhibit B), Inspection Report (Exhibit C).
`
  }

  // Load existing files from the database on mount
  useEffect(() => {
    const taskData = JSON.parse(localStorage.getItem("tasksDatabase")) || {};
    const storedFiles = taskData[taskId]?.files || [];
    setFiles(storedFiles);
  }, [taskId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const uploadFile = () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;

      // Check for duplicate files
      const isDuplicate = files.some(
        (f) => f.name === selectedFile.name && f.content === fileContent
      );
      if (isDuplicate) {
        setError("Duplicate file detected. Please upload a different file.");
        return;
      }

      // Add the new file
      const newFile = {
        id: Date.now(), // Unique ID for file
        name: selectedFile.name,
        content: fileContent,
        uploadedAt: new Date().toISOString(),
      };

      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);

      // Update the "database"
      updateDatabase(updatedFiles);

      setSelectedFile(null);
      setError("");
    };
    reader.readAsDataURL(selectedFile);
  };

  const deleteFile = (fileId) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);

    // Update the "database"
    updateDatabase(updatedFiles);
  };

  const deleteAllFiles = () => {
    setFiles([]);

    // Clear files from the "database"
    updateDatabase([]);
  };

  const updateDatabase = (updatedFiles) => {
    const taskData = JSON.parse(localStorage.getItem("tasksDatabase")) || {};

    // Update specific task with the new file list
    taskData[taskId] = { files: updatedFiles };

    // Save to localStorage
    localStorage.setItem("tasksDatabase", JSON.stringify(taskData));
  };

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    link.click();
  };

  // Summariser things
  const handleSummarise = () => {
    // summarise
    setSummed(true)
  }



return (
  <div>
  <h1 className="centre">{doctypes[taskId]}</h1>
  <div style={styles.uploaderContainer}>
    <h2 style={styles.title}>Task File Uploader</h2>
    <input
      type="file"
      accept="application/pdf"
      onChange={handleFileChange}
      style={styles.fileInput}
    />
    {selectedFile && (
      <p style={styles.fileName}>Selected File: {selectedFile.name}</p>
    )}
    {error && <p style={styles.errorMessage}>{error}</p>}
    <button
      onClick={uploadFile}
      style={selectedFile ? styles.uploadButton : styles.disabledButton}
      disabled={!selectedFile}
    >
      Upload File
    </button>
    <h3 style={styles.subtitle}>Uploaded Files</h3>
    <ul style={styles.fileList}>
      {files.map((file) => (
        <li key={file.id} style={styles.fileItem}>
          <div>
            <strong>{file.name}</strong> <br />
            <small>
              Uploaded: {new Date(file.uploadedAt).toLocaleString()}
            </small>
          </div>
          <div style={styles.fileActions}>
            <button
              onClick={() => downloadFile(file)}
              style={styles.downloadButton}
            >
              Download
            </button>
            <button
              onClick={() => deleteFile(file.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
    {files.length > 0 && (
      <button onClick={deleteAllFiles} style={styles.deleteAllButton}>
        Delete All Files
      </button>
    )}
  </div>

  <div className="centre">
  <h1>Summary</h1>
      {!summed ?
      <button
        onClick={handleSummarise}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Summarise
      </button>
      :
      <text style={{width:"90vh"}}>{summaries[taskId]}</text>

      }

      </div>
  </div>
);
};

const styles = {
uploaderContainer: {
  textAlign: "center",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  maxWidth: "500px",
  margin: "20px auto",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
},
title: {
  color: "#4CAF50",
  fontSize: "24px",
  marginBottom: "15px",
},
fileInput: {
  display: "block",
  margin: "10px auto 15px",
},
fileName: {
  fontSize: "16px",
  color: "#555",
  marginBottom: "10px",
},
errorMessage: {
  color: "red",
  fontSize: "14px",
  marginBottom: "10px",
},
uploadButton: {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "20px",
},
disabledButton: {
  padding: "10px 20px",
  backgroundColor: "#ccc",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "not-allowed",
  marginBottom: "20px",
},
subtitle: {
  fontSize: "20px",
  color: "#333",
  margin: "20px 0 10px",
},
fileList: {
  listStyleType: "none",
  padding: 0,
},
fileItem: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  marginBottom: "10px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
},
fileActions: {
  display: "flex",
  gap: "10px",
},
downloadButton: {
  padding: "5px 10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
},
deleteButton: {
  padding: "5px 10px",
  backgroundColor: "#FF5252",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
},
deleteAllButton: {
  marginTop: "15px",
  padding: "10px 20px",
  backgroundColor: "#FF5252",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
},
};

export default TaskFileUploader;