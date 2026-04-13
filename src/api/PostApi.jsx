import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

//get method
export const getPost = () => {
    return api.get("/posts");
}

//post method
export const postData = (post) => {
    return api.post("/posts", post)
}

//put method
export const updateData = (id, post) => {
    return api.put(`/posts/${id}`, post)
}


//delete method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}