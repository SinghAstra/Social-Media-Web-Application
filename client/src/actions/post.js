import { createPostApi, deletePostApi, getAllPostApi, likePostApi, updatePostApi } from '../api'
const { CREATE_POST, FETCH_ALL_POST, UPDATE_POST, DELETE_POST, LIKE_POST } = require('./actionTypes')

export const createPost = ({title,message,creator,tags,selectedFile}) =>{
    return async function (dispatch){
        try {
            const {data} = await createPostApi({title,message,creator,tags,selectedFile});
            dispatch({type:CREATE_POST,payload:data.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchAllPost = () => {
    return async function(dispatch){
        try {
            const {data} = await getAllPostApi();
            dispatch({type:FETCH_ALL_POST,payload:data.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePost = (updatedFormData) => {
    return async function(dispatch){
        try {
            const {data} = await updatePostApi(updatedFormData._id,updatedFormData);
            dispatch({type:UPDATE_POST,payload:data.data})
        } catch (error) {
            console.log(error)
        }
    }
}
export const deletePost = (id) => {
    return async function(dispatch){
        try {
            await deletePostApi(id);
            dispatch({type:DELETE_POST,payload:id})
        } catch (error) {
            console.log(error)
        }
    }
}
export const likePost = (id) => {
    return async function(dispatch){
        try {
            const {data} = await likePostApi(id);
            dispatch({type:LIKE_POST,payload:data.data})
        } catch (error) {
            console.log(error)
        }
    }
}



