import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import FridgePageTemp from "./FridgePageTemp";


const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<HomePage />}/>

            <Route path="/fridge" element={<FridgePageTemp />}/>

        </Routes>
    </BrowserRouter>);

}

export default Dispatcher; 