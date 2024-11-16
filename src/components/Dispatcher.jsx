import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendRequestPage from "../pages/SendRequestPage"; 


const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<p className="font-bold"> HOMEPAGE</p>}/>

            <Route path="/request/create/fridge/:id" element={<SendRequestPage/>}/>

        </Routes>
    </BrowserRouter>);

}

export default Dispatcher; 