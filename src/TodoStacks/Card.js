function Card({ name, highlight }) {
    return (
        <div
            style={{
                width: "400px",
                height: "100px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                display: "flex", 
                justifyContent: "center", 
                marginTop: "10px",
                marginBottom: "10px",
                alignItems: "center",
                boxShadow: highlight
                    ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                    : "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: highlight ? "#f9f9f9" : "white",
            }}
        >
            <h2>{name}</h2>
        </div>
    );
}
export default Card;