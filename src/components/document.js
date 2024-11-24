import React, { useState, useEffect } from "react";
import '../css/centre.css'

const TaskFileUploader = ({ taskId }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  // Title dict
  const doctypes = {
    "1":"Mortgage Statement",
    "2":"Agreement Discussion",
    "3":"Offer Letter",
    "4":"Loan Approval",
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
  const [text, setText] = useState("");

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSummarise = () => {
    // summarise
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
  <h1>Summariser</h1>
  <textarea
        value={text}
        onChange={handleChangeText}
        placeholder="Enter content to summarise"
        rows="10" // Controls height of the box
        style={{
          width: "60%", // Makes the textarea full width
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <br />
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
        Submit
      </button>
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