import { useState } from 'react'; 
import InputField from './InputField';
import { useDbUpdate } from '../utilities/firebase';

const RequestForm = ({ id }) => {

    const [update, result] = useDbUpdate(`/${id}`);

    const [data, setData] = useState({
        item: "",
        quantity: ""
    })


    const handleChange = (e) => {
        const { value, name } = e.target;
        setData((oldData) => ({... oldData, [name]:value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        


    }

    return (
        <div className="mt-2">

            <form className="flex flex-col mx-auto items-center w-3/4">

               <InputField name="item" data={data.item} handleChange={handleChange}/>

               <InputField name="quantity" data={data.quantity} handleChange={handleChange}/>


               <button className="mt-2 py-2 px-4 border-2 rounded-md self-end text-white
                                 border-blue-500 bg-blue-400 hover:border-blue-700 
                                 hover:scale-105"> 
                    Submit 
                </button>
               

            </form>


        </div>
    );
}


export default RequestForm; 