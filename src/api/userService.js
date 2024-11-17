import axios from "axios";

const user_base_url = "http://localhost:5006/auth/api/User"

const getUser = () => {
    try {
        const response = axios.get(
            `${user_base_url}`,
            { username, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    }catch(error){
        console.log(error); 
    }
}

const createUser = () => {

}

export {getUser}