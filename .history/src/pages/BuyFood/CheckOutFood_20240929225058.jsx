import React from "react";
import { choseLocationNears, CompoFoods } from "../../constants/BuyFoot";

const CheckOutFood = () =>{

    return(
        
            <div className=" flex flex-col min-h-screen"> {/* Thêm min-h-screen để đảm bảo chiều cao tối thiểu của trang */}
                    
                <div className=" bg-green-500 w-full h-[100px] p-4 mt-auto"> {/* mt-auto để đẩy div xuống cuối */}
                    <div className="container">
                        <div className="flex w-full">
                            <div className="w-7/10"> {/* Chiếm 70% diện tích */}
                                Cinema
                            </div>
                            <div className="w-3/10 text-right"> {/* Chiếm 30% diện tích, căn phải */}
                                Thanh toán
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default CheckOutFood;
