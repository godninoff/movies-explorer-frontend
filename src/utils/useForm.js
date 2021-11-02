import React, {useCallback} from 'react';

const useForm = () => {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest("form").checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
          setValues(newValues);
          setErrors(newErrors);
          setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
      );

    return {handleChange, values, errors, resetForm, isValid, setValues};
};


export default useForm;
