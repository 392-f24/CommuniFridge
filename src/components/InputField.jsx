
const InputField = (props) => {

    return (
    <div className="flex flex-col relative items-center w-full mb-4">
        <input id={props.name}
            type="text"
            name={props.name}
            value={props.data}
            onChange={props.handleChange}
            className="w-full p-4 mt-4 outline-none border-2 border-black text-sm rounded-md peer valid:border-blue-500  focus:border-blue-500 transition-all" 

            required/>
        <label htmlFor={props.name}
            className="absolute top-8 left-4 bg-white px-1 text-gray-500 transition-all transform 
                     peer-focus:top-1 peer-focus:left-4 peer-focus:text-blue-500 peer-focus:font-bold peer-focus:scale-105 
                     peer-valid:top-1 peer-valid:left-4 peer-valid:text-blue-500 peer-valid:font-bold peer-valid:scale-105 
                     z-10"> 
             {`Enter ${props.name}`}
        </label>
    </div>
    );

}


export default InputField; 