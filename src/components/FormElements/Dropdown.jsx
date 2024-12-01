const Dropdown = (props) => {

    return (
        <div className="flex flex-col px-2">
            <label className="self-start font-bold" htmlFor={props.name}>{props.label}</label>
            <select 
                className={`border-2 border-purple-300 py-1 rounded-md ${
                    props.error ? 'border-red-500' : ''
                }`}
                id={props.name}
                name={props.name}
                value={props.data}
                onChange={(e) => props.handleChange(e)}
                required
            >
                <option value="">
                    --Select an Option -- 
                </option>
                <option value="Produce">
                    Produce 
                </option>
                <option value="Grains">
                    Grains 
                </option>
                <option value="Dairy">
                    Dairy
                </option>
                <option value="Snacks">
                    Snacks 
                </option>
                <option value="Beverage">
                    Beverage
                </option>
                <option value="Canned">
                    Canned
                </option>
                <option value="Frozen">
                    Frozen
                </option>
                <option value="Premade">
                    Premade
                </option>
            </select>
            {props.error && <span className="text-red-500 text-sm mt-1">{props.error}</span>}
        </div>
    );
};

export default Dropdown; 
