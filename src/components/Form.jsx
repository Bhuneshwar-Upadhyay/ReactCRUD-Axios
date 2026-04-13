import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi';

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    });

    const isEmpty = Object.keys(updateDataApi).length === 0;

    // get the updated data and add into input field
    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || "",
        })
    }, [updateDataApi])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const addPostData = async () => {
        const res = await postData(addData);
        console.log(res);

        if (res.status === 201) {
            setData([...data, res.data]);
            setAddData({ title: "", body: "" });
        }
    }

    // Updata post data
    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData);
            if (res.status === 200) {
                setData((prev) => {
                    console.log("Prev data", prev);
                    return prev.map((curElem) => {
                        return curElem.id === res.data.id ? res.data : curElem;
                    })
                });

                setAddData({ title: "", body: "" });
                setUpdateDataApi({});

            }

        } catch (error) {
            console.log(error);
        }

    }

    //form submission 
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;
        console.log(action);
        if (action === "ADD") {
            addPostData();
        } else if (action === "EDIT") {
            updatePostData();
        }
    }


    return (
        <div className='mb-5'>
            <form onSubmit={handleFormSubmit}>
                <input type='text' name="title" onChange={handleInputChange} value={addData.title} placeholder='Title' className='w-full border border-gray-500 mb-3 py-2 px-4 text-gray-500' />
                <textarea placeholder='Body' name="body" onChange={handleInputChange} value={addData.body} className='w-full border border-gray-500 mb-3 py-2 px-4 text-gray-500'></textarea>
                <button type='submit' value={isEmpty ? 'ADD' : 'EDIT'} className='text-white py-2 px-5 bg-green-600 hover:bg-green-700 cursor-pointer rounded-xl'>{isEmpty ? 'ADD' : 'EDIT'}</button>
            </form>
        </div>
    )
}

export default Form