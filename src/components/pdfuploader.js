import React, { useState } from "react";
//import { storage } from "../config/firebase"; // Ensure this matches your file path
//import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PDFUploader = ({ onUploadSuccess }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  /*const uploadPDF = async () => {
    if (!pdfFile) {
      alert("Please select a file first!");
      return;
    }
    setIsUploading(true);

    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, pdfFile, {
        contentType: "application/pdf",
      });

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      alert("Upload successful!");
      setPdfFile(null);
      setIsUploading(false);

      // Pass the URL to the parent or save it somewhere
      if (onUploadSuccess) {
        onUploadSuccess(downloadURL);
      }
    } /*catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
      setIsUploading(false);
    }
  };*/

  return (
    <div style={styles.uploaderContainer}>
      <h2 style={styles.title}>Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={styles.fileInput}
      />
      {pdfFile && (
        <p style={styles.fileName}>Selected File: {pdfFile.name}</p>
      )}
      <button

disabled={isUploading}
        style={isUploading ? styles.disabledButton : styles.uploadButton}
      >
        {isUploading ? `Uploading... ${uploadProgress}%` : "Upload PDF"}
      </button>
    </div>
  );
};

const styles = {
  uploaderContainer: {
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#3d7faf",
    marginBottom: "15px",
  },
  fileInput: {
    display: "block",
    margin: "10px auto",
  },
  fileName: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
  },
  uploadButton: {
    padding: "10px 20px",
    backgroundColor: "#5483B3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  disabledButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default PDFUploader;