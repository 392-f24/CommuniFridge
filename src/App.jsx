import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for fridges
  const [fridges, setFridges] = useState([]);

  // Fetch fridges data (simulate)
  useEffect(() => {
    // Simulated data
    const data = [
      {
        id: 1,
        name: 'Sunrise Fridge',
        verifiedAt: '20 min ago',
        items: [
          { id: 1, name: 'Apples', quantity: 5 },
          { id: 2, name: 'Bananas', quantity: 10 },
        ],
      },
      {
        id: 2,
        name: 'Freedom Fridge',
        verifiedAt: '1 hour ago',
        items: [
          { id: 3, name: 'Sandwiches', quantity: 4 },
          { id: 4, name: 'Salads', quantity: 7 },
        ],
      },
      {
        id: 3,
        name: 'Soul Fridge',
        verifiedAt: '30 min ago',
        items: [
          { id: 5, name: 'Canned Soup', quantity: 12 },
          { id: 6, name: 'Pasta', quantity: 8 },
        ],
      },
      {
        id: 4,
        name: 'CNE Fridge',
        verifiedAt: '15 min ago',
        items: [
          { id: 7, name: 'Bread', quantity: 6 },
          { id: 8, name: 'Milk', quantity: 3 },
        ],
      },
    ];
    setFridges(data);
  }, []);

  // Handlers
  const handleTakeItem = (fridgeId, itemId) => {
    // Simulate taking an item
    setFridges(prevFridges =>
      prevFridges.map(fridge => {
        if (fridge.id === fridgeId) {
          return {
            ...fridge,
            items: fridge.items.map(item => {
              if (item.id === itemId && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            }),
          };
        }
        return fridge;
      })
    );
  };

  const handleAddItem = (fridgeId) => {
    const itemName = prompt('Enter the name of the item you want to add:');
    if (itemName) {
      setFridges(prevFridges =>
        prevFridges.map(fridge => {
          if (fridge.id === fridgeId) {
            const existingItem = fridge.items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (existingItem) {
              return {
                ...fridge,
                items: fridge.items.map(item => {
                  if (item.name.toLowerCase() === itemName.toLowerCase()) {
                    return { ...item, quantity: item.quantity + 1 };
                  }
                  return item;
                }),
              };
            } else {
              return {
                ...fridge,
                items: [...fridge.items, { id: Date.now(), name: itemName, quantity: 1 }],
              };
            }
          }
          return fridge;
        })
      );
    }
  };

  const handleRequestItem = () => {
    const itemName = prompt('Enter the name of the item you wish to request:');
    if (itemName) {
      // Simulate requesting an item
      alert(`You have requested ${itemName}`);
    }
  };

  return (
    <div className="App bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 min-h-screen p-6">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-10">Evanston Community Fridges</h1>
      <div className="fridges grid grid-cols-1 md:grid-cols-2 gap-10">
        {fridges.map(fridge => (
          <div key={fridge.id} className="fridge bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">{fridge.name}</h2>
            <p className="text-md text-gray-600 mb-6">Verified {fridge.verifiedAt}</p>
            <ul className="items-list mb-6">
              {fridge.items.map(item => (
                <li key={item.id} className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">{item.name} (Qty: {item.quantity})</span>
                  <button
                    onClick={() => handleTakeItem(fridge.id, item.id)}
                    className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-full transition duration-300"
                  >
                    Take This Item
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAddItem(fridge.id)}
                className="bg-green-400 hover:bg-green-500 text-white py-3 px-6 rounded-full transition duration-300"
              >
                Add New Item
              </button>
              <button
                onClick={handleRequestItem}
                className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-6 rounded-full transition duration-300"
              >
                Request Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;