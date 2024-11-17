import { useState, useRef } from 'react'; 
import InputField from './InputField';
import { useDbUpdate } from '../utilities/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


const RequestForm = ({ fridgeId }) => {

    const uuid = useRef(uuidv4());

    const nav =useNavigate();

    const [update, result] = useDbUpdate(`/fridges/${fridgeId}/requests/${uuid.current}`);

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
        update(data); 
        nav(-1);
    }

    return (
        <div className="mt-2">

            <form className="flex flex-col mx-auto items-center w-3/4"
                  onSubmit={(e) => {handleSubmit(e)}}>

               <InputField name="item" data={data.item} handleChange={handleChange}/>

               <InputField name="quantity" data={data.quantity} handleChange={handleChange}/>


               <button className="mt-2 py-2 px-4 border-2 rounded-md self-end text-white
                                 border-blue-500 bg-blue-400 hover:border-blue-700 
                                 hover:scale-105"
                        type="submit"> 
                    Submit 
                </button>
               
            </form>
        </div>
    );
}


export default RequestForm; 