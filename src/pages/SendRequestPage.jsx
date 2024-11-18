import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import RequestForm from '../components/RequestForm';


const SendRequestPage = () => {

    const { fridgeId } = useParams(); 


    return (
        <div>
            <BackButton />
            <header className="flex flex-col items-center text-center md:mt-2">
                <h1 className="font-bold text-2xl mb-2"> Request Form </h1>
                <p className="text-sm "> {`Fill out the form to request items`}</p>
            </header>

            <main>
                <RequestForm fridgeId={fridgeId}/>
            </main>
        </div>
    );

}


export default SendRequestPage; 