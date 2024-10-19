import React, { useState } from "react";
import ChoseCinema from './ChoseCinema';
import ListCombo from './CompoFirst';
import CheckOutFood from './CheckOutFood';
import Button from "../../components/Button/Button";

const BuyCorn = () => {
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedCombos, setSelectedCombos] = useState([]);

    const onSelectCombos = (combos) => {
        setSelectedCombos(combos);
    };

    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='pt-[8rem] text-center'>
                    <ChoseCinema setSelectedCinema={setSelectedCinema} />
                    <ListCombo onSelectCombos={onSelectCombos} setSelectedCinema={setSelectedCinema} />
                  
                </div>
            </div>
            <CheckOutFood selectedCinema={selectedCinema} selectedCombos={selectedCombos} />
        </div>
    );
};

export default BuyCorn;
