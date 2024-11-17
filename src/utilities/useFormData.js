import { useState } from 'react';

export const useFormData = (validator = null, initialData = {}) => {
  const [state, setState] = useState({
    data: initialData,
    errors: {},
  });

  const change = (evt) => {
    const { name, value, type, checked } = evt.target;

    let newValue;
    if (type === 'checkbox') {
      if (checked) {
        // Add the value to the array
        newValue = [...(state.data[name] || []), value];
      } else {
        // Remove the value from the array
        newValue = (state.data[name] || []).filter(item => item !== value);
      }
    } else {
      newValue = value;
    }

    const error = validator ? validator(name, newValue, { ...state.data, [name]: newValue }) : '';

    setState((prevState) => {
      const newData = { ...prevState.data, [name]: newValue };
      const newErrors = { ...prevState.errors, [name]: error };

      // Remove the error key if there's no error
      if (!error) {
        delete newErrors[name];
      }

      return { data: newData, errors: newErrors };
    });
  };

  return [state, change, setState];
};
