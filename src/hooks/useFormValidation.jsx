import { useState } from "react";

const useFormValidation = (initialValues, validateRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState(false);


// To set errors null for a specified field
  const setErrorsFn = (name) =>
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));

  // Validate function to check values against rules
  const validateFunction = (name, value, isBlur = false) => {
    const rule = validateRules[name];
    if (!rule) return;

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} is required.`,
      }));
      return; // Set error for empty values
    }

    switch (rule) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isBlur && !emailRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Invalid email address",
          }));
        } else {
          setErrorsFn(name);
        }
        break;
      }
      case "number": {
        if (isNaN(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Value must be a number",
          }));
        } else {
          setErrorsFn(name);
        }
        break;
      }
      case "name":
      case "text":
      case "address": {
        setErrorsFn(name);
        break;
      }
      default:
        throw new Error("Unsupported validation type");
    }
  };

// Handle input change event and update values
  const handleChange = (e) => {
    const { id, value } = e.target;
    validateFunction(id, value);
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // handle the input if the input is touched
  const handleBlur = (name) => {
    setIsTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateFunction(name, values[name], true); // Validate fully on blur
  };

// reset inputs values to initial
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsTouched({});
  };

  return {
    values,
    errors,
    touched: isTouched,
    handleChange,
    handleBlur,
    resetForm,
  };
};

export default useFormValidation;
