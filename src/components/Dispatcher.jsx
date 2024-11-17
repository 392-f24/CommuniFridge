import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";


const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<HomePage/>}/>

        </Routes>
    </BrowserRouter>);

}

export default Dispatcher; 