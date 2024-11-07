import React, { useState } from "react";
import Stepper from "./Stepper"; // Đảm bảo đường dẫn đúng

const StepByStep = () => {
    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='pt-[8rem] text-center'>
                    <Stepper /> {/* Sửa tên thành Stepper */}
                </div>
            </div>
        </div>
    );
};

export default StepByStep;