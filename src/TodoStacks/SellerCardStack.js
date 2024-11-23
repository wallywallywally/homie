import React, { useState } from "react";
import Card from "./Card";
import CircularCheckbox from "./CheckBox"; 
import CommonSpacer from "../Utils/Spacer";

function SellerCardStack() {
    const seller_cards = [
        { id: 1, name: "Mortgage Statement" },
        { id: 2, name: "Agreement Discussion" },
        { id: 3, name: "Offer Letter" },
        { id: 4, name: "Escrow Process" },
    ];

    const [checkedCards, setCheckedCards] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedCards((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div
            style={{
                width: "400px",
                margin: "20px auto",
                gap: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {seller_cards.map((card) => (
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
                        isChecked={checkedCards[card.id] || false}
                        toggleCheckbox={() => toggleCheckbox(card.id)}
                    />
                    <CommonSpacer width={"100px"} height={"100px"}/>
                    <Card name={card.name} />
                </div>
            ))}
        </div>
    );
}

export default SellerCardStack;
