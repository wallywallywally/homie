import Card from "./Card";

function BuyerCardStack() {
    const buyer_cards = [
        { id: 1, name: "Mortgage Statement" },
        { id: 2, name: "Agreement Discussion" },
        { id: 3, name: "Offer Letter" },
        { id: 4, name: "Loan Approval" },
    ];

    return (
        <div
            style={{
                fixedWidth: "200px",
                margin: "20px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {buyer_cards.map((card) => (
                <Card key={card.id} name={card.name} />
            ))}
        </div>
    );
}

export default BuyerCardStack;
