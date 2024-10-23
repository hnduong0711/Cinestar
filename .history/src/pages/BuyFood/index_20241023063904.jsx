import React, { useState } from "react";
import ChoseCinema from './ChoseCinema';
import ListCombo from './CompoFirst';
import CheckOutFood from './CheckOutFood';
import Button from "../../components/Button/Button";

const BuyCorn = () => {
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(''); // Thêm state cho địa chỉ
    const [selectedCombos, setSelectedCombos] = useState([]);

    const onSelectCombos = (combos) => {
        setSelectedCombos(combos);
    };

    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='pt-[8rem] text-center'>
                    <ChoseCinema 
                        setSelectedCinema={setSelectedCinema} 
                        setSelectedAddress={setSelectedAddress} // Truyền setSelectedAddress vào ChoseCinema
                    />
                    <ListCombo onSelectCombos={onSelectCombos} setSelectedCinema={setSelectedCinema} />
                </div>
            </div>
            <CheckOutFood 
                selectedCinema={selectedCinema} 
                selectedCombos={selectedCombos} 
                selectedAddress={selectedAddress} // Có thể truyền địa chỉ nếu cần thiết
            />
        </div>
    );
};

export default BuyCorn;
