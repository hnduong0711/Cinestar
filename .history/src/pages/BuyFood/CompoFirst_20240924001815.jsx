import React from "react";
import { choseLocationNears, CompoFoods } from "../../constants/BuyFoot";

const ListCombo = () => {
    // Nhóm các combo foods theo category
    const groupComboFoods = CompoFoods.reduce((acc, food) => {
        // Tạo một danh sách nếu chưa có
        if (!acc[food.category]) {
            acc[food.category] = [];
        }

        // Thêm các phần tử vào danh sách
        acc[food.category].push(food);
        return acc;
    }, {});

    return (
        <div className="pt-[5rem]">
            <div className="text-center mt-[50px] mb-[5px]">
                <h2 className="text-cinestar-custom-white text-[40px] font-medium pb-[4rem] font-title">COMBO</h2>
            </div>

            <div className="pt-[5rem]">
                {Object.keys(groupComboFoods).map((category) => (
                    <div key={category} className="mb-8">
                        <h3 className="text-[30px] font-bold mb-4">{category}</h3>
                        {groupComboFoods[category].map((food) => (
                            <div key={food.id} className="flex items-center mb-4">
                                <img src={food.img} alt={food.title} className="w-[100px] h-auto mr-4" />
                                <div>
                                    <h4 className="font-medium">{food.title}</h4>
                                    <p>{food.content}</p>
                                    <p className="text-cinestar-custom-white">{food.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListCombo;