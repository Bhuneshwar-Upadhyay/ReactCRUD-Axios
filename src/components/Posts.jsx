import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi';
import Form from './Form';

const Posts = () => {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});

    const getPostData = async () => {
        const res = await getPost();
        setData(res.data)
        console.log(res.data);
    }

    useEffect(() => {
        getPostData();
    }, []);

    //Function to delete post
    const handleDelete = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status === 200) {
                const updatedDataPost = data.filter((curPost) => {
                    return curPost.id !== id;
                });
                setData(updatedDataPost)
            } else {
                console.log("Failed to Delete the past", res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (curElem) => {
        setUpdateDataApi(curElem);
        console.log(curElem);

    }


    return (
        <section className='mt-6'>
            <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
            <div>
                <p className='text-gray-500'>All Data : {data.length}</p>
                <ul className='grid grid-cols-3 gap-2'>
                    {
                        data.map((elem) => {
                            return (
                                <li className='w-full bg-gray-950 py-3 px-4 text-gray-500 rounded-2xl border-l-4 border-orange-700'>
                                    <p>{elem.id}</p>
                                    <h3 className='text-xl mb-3'>Title : {elem.title}</h3>
                                    <p>News : {elem.body}</p>
                                    <div className='mt-4 flex gap-2'>
                                        <button onClick={() => handleUpdate(elem)} className='text-white py-2 px-5 bg-green-600 hover:bg-green-700 cursor-pointer rounded-xl'>Edit</button>
                                        <button onClick={() => handleDelete(elem.id)} className='text-white py-2 px-5 bg-red-600 hover:bg-red-700 cursor-pointer rounded-xl'>Delete</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default Posts