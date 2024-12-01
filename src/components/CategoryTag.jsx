const CategoryTag = ({ category }) => {
    const categoryMap = {
        'Produce' : 'bg-emerald-700',
        'Grains' : 'bg-yellow-600',
        'Dairy' : 'bg-stone-400',
        'Snacks' : 'bg-pink-500',
        'Beverage' : 'bg-purple-600',  
        'Canned' : 'bg-red-700', 
        'Frozen' : 'bg-sky-500',
        'Premade' : 'bg-indigo-700',
    };

    return (
        <span className={`mr-1 px-2 py-0.5 text-xs font-medium text-white ${categoryMap[category]} rounded-full min-w-[67px] text-center`}>
            {category}
        </span>
    );
};

export default CategoryTag;