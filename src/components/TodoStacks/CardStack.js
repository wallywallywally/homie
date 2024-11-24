import React, { useState } from "react";
import Card from "./Card";
import CircularCheckbox from "./CheckBox"; 
import CommonSpacer from "../../Utils/Spacer";

function CardStack(props) {

    const cards = [
        { id: 1, name: "Mortgage Statement" },
        { id: 2, name: "Agreement Discussion" },
        { id: 3, name: "Offer Letter" },
        { id: 4, name: "Loan Approval" },
    ];

    // To-do list progress
    const [checkedCards, setCheckedCards] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedCards((prevState) => {
            const newState = {
                ...prevState,
                [id]: !prevState[id],
            };
            console.log(newState);
            return newState;
        });
    };
    
    return (
        <div
            style={{
                width: "500px",
                margin: "1.5em auto",
                gap: "1em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {cards.map((card) => {
                const isChecked = checkedCards[card.id] || false; 

                <div
                style={{
                    position: "absolute",
                    left: "36.7%", 
                    width: "1000px",
                    backgroundColor: "#021024",
                    height: "calc(100% - 40px)", 
                    top: "10px",  
                }}
            />
                return (
                    <div
                        key={card.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >   
                        <CircularCheckbox
                            isChecked={isChecked}
                            toggleCheckbox={() => toggleCheckbox(card.id)}
                        />
                        <CommonSpacer width={"100px"} height={"100px"}/>
                        <Card name={card.name} highlight={isChecked} setSelected={props.setSelected} />
                    </div>
                );
            })}
        </div>
    );
}

export default CardStack;
