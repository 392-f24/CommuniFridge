import { useState } from 'react'; 
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';


const SendRequestPage = () => {

    const { id } = useParams(); 


    return (
        <div>
            <BackButton />
            <header className="flex flex-col items-center text-center md:mt-2">
                <h1 className="font-bold text-xl mb-1 md:text-2xl"> Request Form </h1>
                <p className="text-sm "> {`Fill out the form to request items for fridge ${id}`}</p>
            </header>


            



        </div>
    );

}


export default SendRequestPage; 