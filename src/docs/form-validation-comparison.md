# Form Validation Comparison

This document compares the earlier form validation approach with the improved version, highlighting the changes made and the reasoning behind them. It also presents a merged approach that combines the best features of both.

---

## Earlier Approach

### Code:

```jsx
import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT": {
      return {
        ...state,
        value: action.value,
        isTouched: state.isTouched,
      };
    }
    case "BLUR": {
      return {
        ...state,
        isTouched: true,
      };
    }
    case "RESET": {
      return {
        value: "",
        isTouched: false,
      };
    }
    default:
      return state;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const isValueValid = validateValue(inputState.value);
  const hasError = !isValueValid && inputState.isTouched;

  const onValueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const onBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const onResetHandler = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: isValueValid,
    hasError,
    onValueChangeHandler,
    onBlurHandler,
    onResetHandler,
  };
};

export default useInput;
```

### Key Features:

- Used `useReducer` for managing input state.
- Validation logic was passed as a function (`validateValue`).
- State transitions were handled via actions (`INPUT`, `BLUR`, `RESET`).
- Errors were determined based on `isTouched` and `validateValue`.

### Limitations:

- Required separate hooks for each input field.
- Slightly verbose due to `useReducer` setup.
- Error handling was tightly coupled with state transitions.

---

## Improved Approach

### Code:

```jsx
import { useState } from "react";

const useFormValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateFunction = (name, value) => {
    switch (validate) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error("Invalid email address");
        }
        break;
      }
      case "number": {
        if (isNaN(value)) {
          throw new Error("Value must be a number");
        }
        break;
      }
      case "text": {
        if (value.trim() === "") {
          throw new Error("Value cannot be empty.");
        }
        break;
      }
      default:
        throw new Error("Unsupported validation type");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    try {
      validateFunction(name, value);
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    try {
      validateFunction(name, value);
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  return { values, errors, handleChange, handleBlur, resetField };
};

export default useFormValidation;
```

### Key Features:

- Uses `useState` for managing form state.
- Centralized validation logic in `validateFunction`.
- Errors are handled via `try-catch` blocks.
- Supports multiple validation types (`email`, `number`, `text`, etc.).
- Simplified API for managing form inputs.

### Improvements:

- **Centralized Validation**: All validation logic is in one place, making it easier to maintain.
- **Error Handling**: Errors are thrown and caught, decoupling validation from state transitions.
- **Reusable Hook**: Can handle multiple fields with a single hook.
- **Simpler State Management**: `useState` is more straightforward than `useReducer` for this use case.

---

## Merged Approach

### Code:

```jsx
import { useState } from "react";

const useFormValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateFunction = (name, value) => {
    switch (validate[name]) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error("Invalid email address");
        }
        break;
      }
      case "number": {
        if (isNaN(value)) {
          throw new Error("Value must be a number");
        }
        break;
      }
      case "text": {
        if (value.trim() === "") {
          throw new Error("Value cannot be empty.");
        }
        break;
      }
      default:
        throw new Error("Unsupported validation type");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    try {
      validateFunction(name, value);
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    try {
      validateFunction(name, value);
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const resetField = (name) => {
    setValues((prevValues) => ({ ...prevValues, [name]: "" }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return { values, errors, handleChange, handleBlur, resetField };
};

export default useFormValidation;
```

### Key Features:

- Combines `handleChange`, `handleBlur`, and `resetField` for comprehensive field management.
- Centralized validation logic for multiple fields.
- Simplified state management using `useState`.
- Scalable for forms with multiple fields and validation types.

---

## Why Changes Were Made

### Removed:

1. **`useReducer`**:

   - Reason: Overhead for simple input state management.
   - Replaced with `useState` for simplicity.

2. **Separate Hooks for Each Input**:
   - Reason: Redundant and harder to scale.
   - Replaced with a single hook that manages all fields.

### Retained:

1. **Validation Logic**:

   - Reason: Core functionality for ensuring input correctness.
   - Centralized in `validateFunction` for better maintainability.

2. **Error Handling**:

   - Reason: Essential for user feedback.
   - Improved with `try-catch` for cleaner separation of concerns.

3. **Field Management Functions**:
   - Reason: Useful for handling specific field events like blur and reset.

---

## Conclusion

The merged approach simplifies form validation by combining the best features of both earlier and improved approaches. It centralizes logic, reduces redundancy, and provides a scalable solution for managing complex forms.
