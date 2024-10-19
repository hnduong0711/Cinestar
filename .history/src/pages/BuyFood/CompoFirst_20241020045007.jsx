import React, {useState} from "react";
import { choseLocationNears, CompoFoods } from "../../constants/BuyFoot";
const ListCombo = ({ onSelectCombos, setSelectedCinema }) => {

    const groupcomboFoods = CompoFoods.reduce((acc, food) => {
        if (!acc[food.category]) {
            acc[food.category] = [];
        }
        acc[food.category].push(food);
        return acc;
    }, {});

    const [quantities, setQuantities] = useState({});
    const [selectedCombos, setSelectedCombos] = useState([]);

    const handleIncrease = (id) => {
        setQuantities((prev) => {
            const newQuantity = (prev[id] || 0) + 1;
            updateSelectedCombos(id, newQuantity);
            return { ...prev, [id]: newQuantity };
        });
    };

    const handleDecrease = (id) => {
        setQuantities((prev) => {
            const newQuantity = Math.max((prev[id] || 0) - 1, 0);
            updateSelectedCombos(id, newQuantity);
            return { ...prev, [id]: newQuantity };
        });
    };

    const handleQuantityChange = (id, value) => {
        const newQuantity = Math.max(Number(value), 0);
        setQuantities((prev) => {
            updateSelectedCombos(id, newQuantity);
            return { ...prev, [id]: newQuantity };
        });
    };

    const updateSelectedCombos = (id, quantity) => {
        const food = CompoFoods.find((f) => f.id === id);
        if (food) {
            setSelectedCombos((prev) => {
                const existing = prev.find((combo) => combo.id === food.id);
                if (existing) {
                    if (quantity <= 0) {
                        return prev.filter((combo) => combo.id !== food.id);
                    } else {
                        return prev.map((combo) =>
                            combo.id === food.id
                                ? { ...combo, quantity }
                                : combo
                        );
                    }
                } else {
                    if (quantity > 0) {
                        return [...prev, { ...food, quantity }];
                    }
                    return prev;
                }
            });
        }
    };

    React.useEffect(() => {
        onSelectCombos(selectedCombos);
    }, [selectedCombos, onSelectCombos]);





    return(
        <div className="pt-[5rem]">
            {/* <div className="text-center mt-[50px] mb-[5px]">
                <h2 className="text-cinestar-custom-white text-[40px] font-medium pb-[4rem] font-title">COMBO</h2>
            </div> */}

            <div className="pt-[5rem]">
                {Object.keys(groupcomboFoods).map((category) => {
                    return (
                        <div key={category} className="mb-8">
                            <h2 className="text-cinestar-custom-white text-[40px] font-medium pb-[4rem] font-title uppercase">{category}</h2>
                            <div className="flex flex-wrap justify-center">
                                {groupcomboFoods[category].map((food) => {
                                    return (
                                        <div key={food.id} className="flex items-stretch mb-4 w-1/3 group pb-10"> {/* Thêm class group tại đây */}
                                            <div className="bg-[#ecf0f1] w-[184px] flex items-center justify-center relative overflow-hidden h-full">
                                                <div className="relative">
                                                    <img 
                                                        src={food.img} 
                                                        alt={food.title} 
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:rotate-[5deg] group-hover:-translate-x-1" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex-grow text-left ml-4 flex flex-col"> {/* Căn giữa nội dung */}
                                                    <h4 className="font-medium text-[16px] font-content text-white text-[18px] transition-colors duration-300 group-hover:text-cinestar-custom-yellow">{food.title.toUpperCase()}</h4>
                                                    <p className="text-white text-[16px] transition-colors duration-300 font-content">{food.content}</p>
                                                    <p className="text-cinestar-custom-white text-[16px] font-content">{food.price} VND</p>
                                                </div>
                                                <div className="flex mt-12 pl-[15px]"> {/* Thêm class group và hover:bg-yellow-500 */}
                                                    <div className="group cursor-default flex hover:bg-cinestar-custom-yellow ">
                                                        <button 
                                                            className="bg-gray-300 text-black w-[30px] h-[30px] group-hover:bg-cinestar-custom-yellow cursor-default"
                                                            onClick={() => handleDecrease(food.id)}
                                                        >
                                                            -
                                                        </button>
                                                        <input 
                                                            type="text" 
                                                            min="0" 
                                                            value={quantities[food.id] || 0} 
                                                            onChange={(e) => handleQuantityChange(food.id, e.target.value)} 
                                                            className="text-center w-[30px] h-[30px] bg-gray-300 group-hover:bg-cinestar-custom-yellow cursor-default" // Đặt kích thước bằng với nút
                                                            style={{ appearance: 'none', MozAppearance: 'textfield', WebkitAppearance: 'none' }} // Bỏ border và các mũi tên
                                                        />
                                                        <button 
                                                            className="bg-gray-300 text-black w-[30px] h-[30px] group-hover:bg-cinestar-custom-yellow cursor-default"
                                                            onClick={() => handleIncrease(food.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>





        </div>
    )
}

export default ListCombo;

