import React, { useEffect, useState } from "react";
import { choseLocationNears, CompoFoods } from "../../constants/BuyFoot";
import foodService from "../../api/foodService";

const ListCombo = ({ onSelectCombos, setSelectedCinema }) => {
  const [food, setFood] = useState([]);

  // api lấy data food
  useEffect(() => {
    const fetchData = async () => {
      const storedData = sessionStorage.getItem("authToken");
      const { token } = JSON.parse(storedData);
      const data = await foodService.getAllFood(token);
      setFood(data);
    };
    fetchData();
  }, []);

  // console.log(food);

  // phân loại theo type
  const groupcomboFoods = food.reduce((acc, food) => {
    if (!acc[food.foodType]) {
      acc[food.foodType] = [];
    }
    acc[food.foodType].push(food);
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
    const itemFood = food.find((f) => f.id === id);
    if (itemFood) {
      setSelectedCombos((prev) => {
        const existing = prev.find((combo) => combo.id === itemFood.id);
        if (existing) {
          if (quantity <= 0) {
            return prev.filter((combo) => combo.id !== itemFood.id);
          } else {
            return prev.map((combo) =>
              combo.id === itemFood.id ? { ...combo, quantity } : combo
            );
          }
        } else {
          if (quantity > 0) {
            return [...prev, { ...itemFood, quantity }];
          }
          return prev;
        }
      });
    }
  };

  React.useEffect(() => {
    onSelectCombos(selectedCombos);
  }, [selectedCombos, onSelectCombos]);

  console.log('selectedCombo: ',selectedCombos);
  

  return (
    <div className="pt-[5rem] ">
      {Object.keys(groupcomboFoods).map((category) => {
        return (
          <div key={category} className="mb-8">
            <h2 className="text-cinestar-custom-white text-[40px] font-medium pb-[4rem] font-title uppercase text-center">
              {category}
            </h2>
            <div className="flex flex-wrap justify-center">
              {groupcomboFoods[category].map((food) => {
                return (
                  <div
                    key={food.id}
                    className="flex items-stretch mb-4 w-1/3 pb-10 lg:flex-row lg:flex-nowrap flex-col flex-wrap justify-center"
                  >
                    <div className="bg-[#ecf0f1] max-w-[150px] max-h-[180px] flex items-center justify-center relative overflow-hidden">
                      <div className="relative">
                        <img
                          src={`/${food.image}`}
                          alt={food.title}
                          className=" object-cover transition-transform duration-300 group-hover:rotate-[5deg] group-hover:-translate-x-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="flex-grow text-left ml-4 flex flex-col">
                        <h4 className="text-[16px] uppercase font-bold font-content transition-colors duration-300 text-cinestar-custom-yellow">
                          {food.name}
                        </h4>
                        <p className="text-white text-[14px] transition-colors duration-300 font-content">
                          {food.description}
                        </p>
                        <p className="text-cinestar-custom-white text-[16px] font-content">
                          {food.amount.toLocaleString("vi-VN")} VND
                        </p>
                      </div>
                      <div className="flex mt-12 pl-[15px]">
                        <div className="group cursor-default flex bg-gray-300 hover:bg-cinestar-custom-yellow px-3 py-1 rounded-md">
                          {/* Nút giảm */}
                          <button
                            className="text-black w-[24px] h-[24px] flex m-auto hover:bg-cinestar-purple hover:text-white rounded-full cursor-poiter transition-all duration-150"
                            onClick={() => handleDecrease(food.id)}
                          >
                            <span className="flex m-auto">-</span>
                          </button>
                          <input
                            type="text"
                            min="0"
                            value={quantities[food.id] || 0}
                            onChange={(e) =>
                              handleQuantityChange(food.id, e.target.value)
                            }
                            className="text-center w-[30px] h-[30px] group-hover:bg-cinestar-custom-yellow bg-gray-300 cursor-default"
                            // style={{
                            //   appearance: "none",
                            //   MozAppearance: "textfield",
                            //   WebkitAppearance: "none",
                            // }}
                          />
                          {/* Nút tăng */}
                          <button
                            className="text-black w-[24px] h-[24px] flex m-auto hover:bg-cinestar-purple hover:text-white rounded-full cursor-poiter transition-all duration-150"
                            onClick={() => handleIncrease(food.id)}
                          >
                            <span className="flex m-auto">+</span>
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
  );
};

export default ListCombo;
