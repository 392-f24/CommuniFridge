import { BrowserRouter, Routes, Route } from "react-router-dom";


const Dispatcher = () => {

    return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<p className="font-bold"> HOMEPAGE</p>}/>

        </Routes>
    </BrowserRouter>);

}

export default Dispatcher; 