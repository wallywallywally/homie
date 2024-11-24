import React, { useState } from "react";
import Card from "./Card";
import CircularCheckbox from "./CheckBox"; 
import CommonSpacer from "../../Utils/Spacer";

function CardStack({ onTaskSelect, setSummed }) {
  const buyer_cards = [
    { id: 1, name: "Mortgage Statement" },
    { id: 2, name: "Sales Agreement" },
    { id: 3, name: "Offer Letter" },
    { id: 4, name: "Loan Approval" },
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
        width: "500px",
        margin: "1.5em auto",
        gap: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {buyer_cards.map((card) => {
        const isChecked = checkedCards[card.id] || false;
        return (
          <div
            key={card.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => {
              onTaskSelect(card.id)
              setSummed(false)
            }}
          >
            <CircularCheckbox
              isChecked={isChecked}
              toggleCheckbox={() => toggleCheckbox(card.id)}
            />
            <CommonSpacer width={"100px"} height={"100px"} />
            <Card name={card.name} highlight={isChecked} />
          </div>
        );
      })}
    </div>
  );
}

export default CardStack;
