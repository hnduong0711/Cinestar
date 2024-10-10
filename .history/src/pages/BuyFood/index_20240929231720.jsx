import React, { useState } from "react";
import ChoseCinema from './ChoseCinema';
import ListCombo from './CompoFirst';
import CheckOutFood from './CheckOutFood';
import { CinemaProvider } from "./Context";
const BuyCorn = () => {
    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='pt-[8rem] text-center'>
                <ChoseCinema/>

                    <ListCombo/>
                    
                </div>
            </div>
            <CinemaProvider>
                <CheckOutFood/>
            </CinemaProvider>
            
        </div>
    )
} 

export default BuyCorn;