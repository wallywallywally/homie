import React, { useState } from "react";

function CircularCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(prevChecked => !prevChecked);
    };

    return (
        <div
            onClick={toggleCheckbox}
            style={{
                width: "46px",
                height: "30px",
                borderRadius: "50%", 
                border: "2px solid #ccc",
                backgroundColor: isChecked ? "#4caf50" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
            }}
        >
            {isChecked && (
                <div
                    style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%", // Circle inside
                        backgroundColor: "white",
                    }}
                />
            )}
        </div>
    );
}

export default CircularCheckbox;