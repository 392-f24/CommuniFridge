import { FaRegTrashAlt } from "react-icons/fa";

const DeleteButton = ({ handleDelete }) => {

    return (
        <button className="mt-2 p-2 w-auto border-1 border-red-600 bg-red-500 rounded-md hover:bg-red-600"
                onClick={handleDelete}>
            <FaRegTrashAlt style={{ color: 'white', fontSize: '21px' }}/>
        </button>
    )
}


export default DeleteButton;