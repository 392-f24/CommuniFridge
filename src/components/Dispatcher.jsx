import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FridgePageTemp from "./FridgePageTemp";


const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/fridge/:fridgeId" element={<FridgePageTemp />}/>
        </Routes>
    </BrowserRouter>);

}


export default Dispatcher; 