import { FaRegTrashAlt } from "react-icons/fa";

const DeleteButton = ({ handleDelete }) => {
    return (
        <button className="w-full h-full bg-red-500 rounded-r-md hover:bg-red-600 flex items-center justify-center"
                onClick={handleDelete}>
            <FaRegTrashAlt style={{ color: 'white', fontSize: '21px' }}/>
        </button>
    )
}

export default DeleteButton;