import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FridgePageTemp from "./FridgePageTemp";


const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/fridge/:fridgeId" element={<FridgePageTemp />}/>
            <Route path="/request/create/fridge/:id" element={<SendRequestPage/>}/>
        </Routes>
    </BrowserRouter>);

}


export default Dispatcher; 