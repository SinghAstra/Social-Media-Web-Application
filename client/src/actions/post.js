import axios from 'axios'
const { CREATE_POST, FETCH_ALL_POST, UPDATE_POST, DELETE_POST } = require('./actionTypes')

export const createPost = ({title,message,creator,tags,selectedFile}) =>{
    return async function (dispatch){
        try {
            const {data} = await axios.post("http://localhost:5000/post",{title,message,creator,tags,selectedFile})
            dispatch({type:CREATE_POST,payload:data.data})
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
            const {data} = await axios.put(`http://localhost:5000/post/${updatedFormData._id}`,updatedFormData);
            dispatch({type:UPDATE_POST,payload:data.data})
        } catch (error) {
            console.log(error)
        }
    }
}
export const deletePost = (id) => {
    return async function(dispatch){
        try {
            await axios.delete(`http://localhost:5000/post/${id}`);
            dispatch({type:DELETE_POST,payload:id})
        } catch (error) {
            console.log(error)
        }
    }
}



