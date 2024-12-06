import { useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";


const BackButton = () => {

    const nav = useNavigate();

    const handleClick = () => {
        nav(-1);
    }

    return (
        <button className="absolute top-3 left-2"
                onClick={handleClick}>
            <IoChevronBackCircle style={{ fontSize: '25px' }} />
        </button>
    );
}


export default BackButton; 