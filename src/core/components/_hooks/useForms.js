import { ModalAppContext } from "./_Context/ModalAppContext";
import { useContext, useState } from "react";
import { inputEmailValidation } from "../../HELPERS/_inputValidation";
import { createEvent, editEvent } from "../../HELPERS/firebase/queries/events";
import { login, register, updateUser } from "../../HELPERS/firebase/queries/users";

export const useForms = (fields = {}) => {

    const [useFieldsInputsValues, setFieldsInputsValues] = useState(fields);

    const [useErrorInput, setErrorInput] = useState([]);

    const { onCloseModal } = useContext(ModalAppContext);

    const onChangeInputValues = (e) => {
        setFieldsInputsValues({
            ...useFieldsInputsValues,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitFormData = (APPLY = "", ACTION = "", e) => {

        e.preventDefault();

        let arr_errors = [];

        switch (APPLY) {
            case "AUTH_LOGIN":
                delete useFieldsInputsValues.confirm_password;

                if (useFieldsInputsValues.email === "") {
                    arr_errors.push("The email field is required.");
                } else if (!inputEmailValidation(useFieldsInputsValues.email)) {
                    arr_errors.push("The email entered is invalid or already exists. Try it again!");
                }

                if (useFieldsInputsValues.password === "") {
                    arr_errors.push("The password field is required.");
                }

                // console.log(useFieldsInputsValues);
                break;

            case "AUTH_REGISTER":

                if (useFieldsInputsValues.email === "") {
                    arr_errors.push("The email field is required.");
                } else if (!inputEmailValidation(useFieldsInputsValues.email)) {
                    arr_errors.push("The email entered is invalid or already exists. Try it again!");
                }

                if (useFieldsInputsValues.password === "") {
                    arr_errors.push("The password field is required.");
                }

                if (useFieldsInputsValues.password !== useFieldsInputsValues.confirm_password) {
                    arr_errors.push("The password are not equals.");
                }

                break;

            case "EVENTS":
                if (useFieldsInputsValues.title === "") {
                    arr_errors.push("The title field is required.");
                }
                if (useFieldsInputsValues.entity === "") {
                    arr_errors.push("The location field is required.");
                }
                if (useFieldsInputsValues.type === "") {
                    arr_errors.push("The event type field is required.");
                }
                if (useFieldsInputsValues.category === "") {
                    arr_errors.push("The category event field is required.");
                }
                if (useFieldsInputsValues.event_starts === "") {
                    arr_errors.push("The event starts field is required.");
                }
                if (useFieldsInputsValues.event_ends === "") {
                    arr_errors.push("The event ends field is required.");
                }
                if (useFieldsInputsValues.start_time === "") {
                    arr_errors.push("The start time field is required.");
                }
                if (useFieldsInputsValues.end_time === "") {
                    arr_errors.push("The end time field is required.");
                }
                if (useFieldsInputsValues.description === "") {
                    arr_errors.push("The description field is required.");
                }
                if (!useFieldsInputsValues.isItsFree) {
                    if (useFieldsInputsValues.price === "") {
                        arr_errors.push("The price field is required.");
                    }
                }

                break;
            default:
                break;
        }

        if (arr_errors.length > 0) {
            setErrorInput(arr_errors);
            if (APPLY === "EVENTS") {
                console.log(arr_errors)
                document.getElementById("error_inputs").scrollIntoView({ behavior: 'smooth' });
            }
        } else {

            if (APPLY === "AUTH_REGISTER") {
                register(useFieldsInputsValues.email, useFieldsInputsValues.password);

            } else if (APPLY === "AUTH_LOGIN") {
                login(useFieldsInputsValues.email, useFieldsInputsValues.password);
            } else if (APPLY === "EVENTS") {
                if (ACTION === "EDIT") {
                    editEvent(useFieldsInputsValues).then(() => {
                        onCloseModal();
                    });
                } else if (ACTION === "ADD") {
                    createEvent(useFieldsInputsValues).then(() => {
                        onCloseModal();
                    });
                }
            } else if (APPLY === "FORM_CONFIG") {

                updateUser(useFieldsInputsValues, onCloseModal);
            }

            setErrorInput([]);
            setFieldsInputsValues({});
        }
    }

    return {
        useFieldsInputsValues,
        useErrorInput,
        setFieldsInputsValues,
        setErrorInput,
        onChangeInputValues,
        onSubmitFormData
    };
}