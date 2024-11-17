import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import FridgePageTemp from "../pages/FridgePageTemp";
import SendRequestPage from "../pages/SendRequestPage"; 

const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/fridge/:fridgeId" element={<FridgePageTemp />}/>
            <Route path="/fridge/:fridgeId/request/create" element={<SendRequestPage/>}/>
        </Routes>
    </BrowserRouter>);

}

export default Dispatcher; 