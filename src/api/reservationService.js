import axios from "axios";

const seat_base_url = "http://localhost:5006/reservation/api/Seat"

const seatService = {
    getSeatByRoom: async (roomNum, token) => {
        try{
            const response = await axios.get(`${seat_base_url}/room/${roomNum}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data;
            
        }catch(error){
            console.log(error);
        }
    }
}

const ticketService = {

}

const foodService = {

}

const discountService = {

}

export {seatService, ticketService, foodService, discountService}