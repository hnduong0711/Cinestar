import React from "react";

const Stepper = ({ selectedCinema, selectedCombos }) => {
    return (
        <div>
            <h2>Stepper Component</h2>
            <p>Selected Cinema: {selectedCinema}</p>
            <ul>
                {selectedCombos.map((combo, index) => (
                    <li key={index}>{combo.name}</li> // Giả sử combo có thuộc tính name
                ))}
            </ul>
        </div>
    );
};

export default Stepper;
