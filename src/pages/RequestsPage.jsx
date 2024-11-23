import { useParams } from "react-router-dom";
import { useDbData } from "../utilities/firebase";
import BackButton from '../components/BackButton';
import RequestCard from '../components/RequestCard';
import { useState } from 'react'; 

const RequestsPage = () => {
    const { fridgeId } = useParams();

    const [data, error] = useDbData(`/fridges/${fridgeId}/requests`);
    
    const [searchTerm, setSearchTerm] = useState('');

    if (error) return <h1 className="text-red-500 text-2xl text-center">Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1 className="text-purple-400 text-2xl text-center">Loading data...</h1>;
    if (!data) return <h1 className="text-red-500 text-2xl text-center">No data found</h1>;
    
    const requestEntries = Object.entries(data);

    const filteredRequests = requestEntries.filter(([id, request]) =>
        request.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const requests = filteredRequests.map(([id, request]) => (
        <RequestCard key={id} quantity={request.quantity} item={request.item} />
    ));

    return (
        <div className="p-4">
            <BackButton /> 
            <header className="flex flex-col items-center text-center md:mt-2">
                <h1 className="font-bold text-2xl mb-2"> Items Requests </h1>
                
                {/* Search Bar */}
                <div className="w-full max-w-md mt-4">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </header>

            <div className="flex flex-col space-y-2 mt-4">
                {requests.length > 0 ? (
                    requests
                ) : (
                    <p className="text-gray-500 text-center">No matching items found.</p>
                )}
            </div>
        </div>
    );
}

export default RequestsPage;
