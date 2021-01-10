import { API } from "../../backend";

export const createOrder = () =>{

    return fetch(`${API}/order/create/${userId}`, 
    {method : "POST",
    headers : {
        Accept :"application/JSON",
        "Content-Type" : "application/json",
        Authorization :`Bearer ${token}`
    },
    body : JSON.stringify({order : orderData})

    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

