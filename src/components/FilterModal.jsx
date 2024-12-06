const FilterModal = ({CATEGORIES, toggleCategory, selectedCategories, toggleOthers, includeOthers}) => {
    
    
    return (<div className="py-5 absolute flex flex-wrap justify-center space-x-2 bg-yellow-400 shadow-lg object-center w-[min]">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`p-2 rounded-md shadow-md font-semibold ${
                            selectedCategories.includes(category)
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                        }`}
                    >
                        {category}
                    </button>
                ))}
                <button
                    onClick={toggleOthers}
                    className={`px-2 py-2 mt-2 rounded-md shadow-md font-semibold ${
                        includeOthers ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                >
                    Others
                </button>
            </div>)
        };

export default FilterModal;