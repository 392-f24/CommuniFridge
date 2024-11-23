import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

const DrawerButton = ({ isDrawerOpen, toggleDrawer }) => {
    return (
        <button
            onClick={toggleDrawer}
        >
            {isDrawerOpen ?
                <IoChevronUp className="text-xl"/>
            : <IoChevronDown className="text-xl" />
        }
        </button>
    );
};

export default DrawerButton;