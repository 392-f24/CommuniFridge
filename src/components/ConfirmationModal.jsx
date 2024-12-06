const ConfirmationModal = ({ itemName, handleClose, handleConfirmation }) => {
    return (
        <div
            className={`fixed z-[9999] inset-0 flex flex-col justify-center items-center bg-black/50`}
            onClick={handleClose}
        >
            <div
                className="flex flex-col justify-between py-4 bg-white rounded-md relative w-3/4 md:w-1/2 max-h-[90vh] min-h-[25%] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center align-center text-xl text-center m-2">
                    Delete {itemName} from the fridge?
                </div>

                <div className="flex justify-around">
                    <button
                        className="bg-red-500 hover:bg-red-600 rounded-md border border-red-700 px-6 py-3 text-white"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 rounded-md border border-green-700 px-6 py-3 text-white"
                        onClick={handleConfirmation}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;