import { jwtDecode } from "jwt-decode";
import { AUTH ,LOG_OUT} from "./actionTypes";
import { googleLogout } from '@react-oauth/google';

export const logInUser = (credential,navigate) => {
    return async function(dispatch){
        try{
            const userObject = jwtDecode(credential);
            localStorage.setItem('user', JSON.stringify(userObject));
            dispatch({type:AUTH,payload:userObject})
            navigate('/');
        }catch(error){
            console.log("error in authAction is ",error)
        }
    }
}
export const signInUser = (formData,navigate) => {
    return async function(dispatch){
        try{
            // Sign In User
            navigate('/')
        }catch(error){
            console.log("error in signInUser is ",error)
        }
    }
}
export const signUpUser = (formData,navigate) => {
    return async function(dispatch){
        try{
            // Sign Up User
            navigate('/')
        }catch(error){
            console.log("error in signUpUser is ",error)
        }
    }
}

export const logOutUser = (setUser) => {
    return async function(dispatch){
        try{
            googleLogout();
            localStorage.clear();
            dispatch({type:LOG_OUT})
            setUser(null)
        }catch(error){
            console.log("error in logOutUser is ",error)
        }
    }

}