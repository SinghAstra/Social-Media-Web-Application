import axios from 'axios'
const { CREATE_POST, FETCH_ALL_POST } = require('./actionTypes')

export const createPost = ({title,message,creator,tags,selectedFile}) =>{
    return async function (dispatch){
        try {
            const {data} = await axios.post("http://localhost:5000/post",{title,message,creator,tags,selectedFile})
            dispatch({type:CREATE_POST,payload:data})
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const fetchAllPost = () => {
    return async function(dispatch){
        try {
            const {data} = await axios.get("http://localhost:5000/post");
            dispatch({type:FETCH_ALL_POST,payload:data.data})
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const updatePost = (updatedFormData) => {
    return async function(dispatch){
        try {
            const {data} = await axios.get("http://localhost:5000/post");
            dispatch({type:FETCH_ALL_POST,payload:data.data})
        } catch (error) {
            console.log(error.message)
        }
    }
}

