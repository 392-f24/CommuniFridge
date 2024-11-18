import { useParams } from "react-router-dom";
import { useDbData } from "../utilities/firebase";
import BackButton from '../components/BackButton';
import RequestCard from '../components/RequestCard';


const RequestsPage = () => {
    const { fridgeId } = useParams();

    const [data, error] = useDbData(`/fridges/${fridgeId}/requests`);

    if (error) return <h1 className="text-red-500 text-2xl text-center">Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1 className="text-purple-400 text-2xl text-center">Loading data...</h1>;
    if (!data) return <h1 className="text-red-500 text-2xl text-center">No data found</h1>;
    
    const requests = Object.values(data).map((request, i) => <RequestCard key={i} quantity={request.quantity} item={request.item} />);

    return (
        <div>
            <BackButton /> 
            <header className="flex flex-col items-center text-center md:mt-2">
                <h1 className="font-bold text-2xl mb-2"> Items Requests  </h1>
            </header>

            <div className="flex flex-col space-y-2">
                {requests}
            </div>
            

        </div>
    );
}


export default RequestsPage;