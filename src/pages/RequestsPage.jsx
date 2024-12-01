import { useParams } from "react-router-dom";
import { useDbData } from "../utilities/firebase";
import BackButton from '../components/BackButton';
import RequestCard from '../components/RequestCard';
import { useState } from 'react'; 
import FulfillModal from "../components/FulfillModal";

const RequestsPage = () => {
    const { fridgeId } = useParams();

    const [data, error] = useDbData(`/fridges/${fridgeId}/requests`);
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const [sortOption, setSortOption] = useState('mostRequested');

    const [isFulfillOpen, setIsFulfillOpen] = useState(false);

    if (error) return <h1 className="text-red-500 text-2xl text-center">Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1 className="text-purple-400 text-2xl text-center">Loading data...</h1>;
    if (!data) return (<div> <BackButton/> <h1 className="text-red-500 text-2xl text-center">No data found</h1> </div>);
    
    const requestEntries = Object.entries(data);

    const filteredRequests = requestEntries.filter(([id, request]) =>
        request.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (sortOption === 'mostRequested') {
            // Sort by quantity in descending order
            return parseFloat(b[1].quantity) - parseFloat(a[1].quantity);
        } else if (sortOption === 'alphabetical') {
            // Sort by item name in alphabetical order
            return a[1].item.localeCompare(b[1].item);
        }
        return 0;
    });

    // Map sorted and filtered requests to RequestCard components
    const requests = sortedRequests.map(([id, request]) => (
        <RequestCard key={id} quantity={request.quantity} item={request.item} />
    ));

    return (
        <div className="p-4">
            <BackButton /> 
            <header className="flex flex-col md:mt-2">
                <h1 className="font-bold text-2xl mb-4 text-center">Items Requests</h1>
                
                {/* Container for Search and Sort */}
                <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
                    {/* Search Bar */}
                    <div className="flex-1 mr-4">
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {/* Sorting Dropdown */}
                    <div className="w-48">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="mostRequested">Sort by Most Requested</option>
                            <option value="alphabetical">Sort by Alphabetical Order</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="flex flex-col space-y-2 mt-6">
                {requests.length > 0 ? (
                    requests
                ) : (
                    <p className="text-gray-500 text-center">No matching items found.</p>
                )}
            </div>
            
            {/* New Fulfill Item button */}
            {isFulfillOpen && <FulfillModal isOpen={isFulfillOpen} setIsOpen={setIsFulfillOpen} fridgeId={fridgeId} />}
            <div className="flex flex-col p-10 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                <button 
                    onClick={() => setIsFulfillOpen(true)}
                    className="border-2 border-yellow-500 rounded-md bg-yellow-400 p-2 text-white hover:bg-yellow-500"
                >
                    Fulfill Item
                </button>
            </div>
        </div>
    );
}

export default RequestsPage;