import React from "react";

function CircularCheckbox({ isChecked, toggleCheckbox }) {
    return (
        <div
            onClick={toggleCheckbox} 
            style={{
                position: "relative",  
                width: "44px",
                height: "30px",
                borderRadius: "50%", 
                border: isChecked ? "5px solid #C1E8FF" : "5px solid white",
                backgroundColor: isChecked ? "#021024" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
                zIndex: 1,
            }}
        >
            {isChecked && (
                <div
                    style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        zIndex: 1,
                    }}
                />
            )}
           
            <div
                style={{
                    position: "absolute",
                    top: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "10px",
                    height: "100px",
                    backgroundColor: isChecked ? "#021024" : "#C1E8FF", 
                    transition: "background-color 0.3s",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-8px", 
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "10px",
                    height: "220px",
                    backgroundColor: isChecked ? "#021024" : "#C1E8FF", 
                    transition: "background-color 0.3s",
                    zIndex: 0,
                }}
            />
        </div>
    );
}

export default CircularCheckbox;
