import React, { useState } from "react";
import CardStack from "./TodoStacks/CardStack";
import Homiebar from "./homiebar";
import TaskFileUploader from "./document";

function Homepage(props) {
  const [selectedTask, setSelectedTask] = useState(null);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  const barContainerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "white",
  };

  return (
    <div>
      <div style={barContainerStyle}>
        <Homiebar />
      </div>
      <div style={containerStyle}>
        <div style={{ display: "flex" }}>
          {/* Pass the task selection handler */}
          <div>
            <CardStack onTaskSelect={setSelectedTask} />
          </div>
          <div style={{ flex: "1" }}>
            {/* Show uploader box dynamically */}
            {selectedTask ? (
              <TaskFileUploader taskId={selectedTask} />
            ) : (
              <p style={{ textAlign: "center", marginTop: "2em" }}>
                Select a task to view the uploader
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
