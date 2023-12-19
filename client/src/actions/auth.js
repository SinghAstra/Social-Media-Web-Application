import { jwtDecode } from "jwt-decode";
import { AUTH } from "./actionTypes";



export const logInUser = (credential) => {
    return async function(dispatch){
        try{
            const userObject = jwtDecode(credential);
            localStorage.setItem('user', JSON.stringify(userObject));
            dispatch({type:AUTH,payload:userObject})
        }catch(error){
            console.log("error in authAction is ",error)
        }
    }
}