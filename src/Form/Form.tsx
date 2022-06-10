import React, {useReducer} from "react";
import "./Form.scss";

import {DispatchFormValue, FieldValueUpdate, IFormErrors, FieldErrorsUpdate} from "./Form.types";

export const Form = () => {
	const initialFormValues = {
		firstname: "",
		lastname: "",
		email: "",
		confirmEmail: ""
	};
	const dispatchFormValue = (state: typeof initialFormValues, fieldValueUpdate: FieldValueUpdate) => {
		return {...structuredClone(state), [fieldValueUpdate.field]: fieldValueUpdate.value} as typeof initialFormValues;
	};
	const [formValues, setFormValues] = useReducer<DispatchFormValue<typeof initialFormValues, FieldValueUpdate>>(
		dispatchFormValue,
		initialFormValues
	);

	const dispatchFormErrors = (state: IFormErrors, fieldsErrorsUpdate: FieldErrorsUpdate) => ({
		...structuredClone(state),
		[fieldsErrorsUpdate.field]: fieldsErrorsUpdate.value
	});
	const [formErrors, setFormErrors] = useReducer<DispatchFormValue<IFormErrors, FieldErrorsUpdate>>(
		dispatchFormErrors,
		{
			firstname: [],
			lastname: [],
			email: [],
			confirmEmail: []
		}
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		Object.entries(formValues).forEach(([field, value]) => {
			const fieldErrors = formErrors[field as keyof IFormErrors];

			if (value === undefined || value === null || value === "") {
				setFormErrors({field, value: [...new Set([...fieldErrors, "Field cannot be empty"])]});
			} else {
				setFormErrors({field, value: fieldErrors.filter(errorMessage => errorMessage !== "Field cannot be empty")});
			}
		});
	};

	return (
		<form className="form form--required" onSubmit={e => handleSubmit(e)}>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="firstname">Firstname</label>
				<input
					className={`form__input${formErrors.firstname.length ? " form__input--error" : ""}`}
					id="firstname"
					placeholder="Firstname"
					type="text"
					value={formValues.firstname}
					onChange={e => setFormValues({field: "firstname", value: e.target.value})} />
				<em className="form__error">{formErrors.firstname.join(" - ")}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="lastname">Lastname</label>
				<input
					className={`form__input${formErrors.lastname.length ? " form__input--error" : ""}`}
					id="lastname"
					placeholder="Lastname"
					type="text"
					value={formValues.lastname}
					onChange={e => setFormValues({field: "lastname", value: e.target.value})} />
				<em className="form__error">{formErrors.lastname.join(" - ")}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="email">Email</label>
				<input
					className={`form__input${formErrors.email.length ? " form__input--error" : ""}`}
					id="email"
					placeholder="Email"
					type="text"
					value={formValues.email}
					onChange={e => setFormValues({field: "email", value: e.target.value})} />
				<em className="form__error">{formErrors.email.join(" - ")}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="confirmEmail">Confirm email</label>
				<input
					className={`form__input${formErrors.confirmEmail.length ? " form__input--error" : ""}`}
					id="confirmEmail"
					placeholder="Confirm email"
					type="text"
					value={formValues.confirmEmail}
					onChange={e => setFormValues({field: "confirmEmail", value: e.target.value})} />
				<em className="form__error">{formErrors.confirmEmail.join(" - ")}</em>
			</div>
			<button className="form__button" type="submit">Submit</button>
		</form>
	);
};