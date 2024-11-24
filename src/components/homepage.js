import React, { useState } from "react";
import CardStack from "./TodoStacks/CardStack";
import Homiebar from "./homiebar";
import TaskFileUploader from "./document";

function Homepage(props) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [summed, setSummed] = useState(false);

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

  const rightSticky = {
    position: "sticky",
    top: 0,
    flex: 1,
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
            <CardStack onTaskSelect={setSelectedTask} setSummed={setSummed} />
          </div>
          <div style={rightSticky}>
            {/* Show uploader box dynamically */}
            {selectedTask ? (
              <TaskFileUploader taskId={selectedTask} summed={summed} setSummed={setSummed}/>
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
