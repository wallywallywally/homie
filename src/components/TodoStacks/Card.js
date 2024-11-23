function Card({ name, highlight }) { 
    return (
        <div
            style={{
                width: "500px",
                height: "200px",
                borderRadius: "85px",
                padding: "16px",
                display: "flex", 
                justifyContent: "center", 
                marginTop: "10px",
                marginBottom: "10px",
                alignItems: "center",
                boxShadow: highlight
                    ? "0px 50px 50px rgba(0, 0, 0, 0.2)"
                    : "0px 10px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: highlight ? "#021024" : "#5483B3",
                transition: "all 0.3s ease-in-out",
            }}
        >
            <h2
                style={{
                    color: "white", // White text
                    fontSize: "24px", // Bigger text
                    textAlign: "center", // Center the text
                }}
            >
                {name}
            </h2>
        </div>
    );
}
export default Card;