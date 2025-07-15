import { useState } from "react";

const useFormValidation = (initialValues, validateRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState(false);

  const validateFunction = (name, value, isBlur = false) => {
    const rule = validateRules[name];
    if (!rule) return;

    if (value.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Input cannot be empty." }));
      return; // Set error for empty values
    }

    switch (rule) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isBlur && !emailRegex.test(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "Invalid email address" }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
        break;
      }
      case "number": {
        if (isNaN(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "Value must be a number" }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
        break;
      }
      case "name":
      case "text":
      case "address": {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        break;
      }
      default:
        throw new Error("Unsupported validation type");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    try {
      validateFunction(id, value);
      setValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: error.message }));
    }
  };

  const handleBlur = (name) => {
    setIsTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateFunction(name, values[name], true); // Validate fully on blur
  };

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
