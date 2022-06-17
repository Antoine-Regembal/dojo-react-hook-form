import React, {useReducer, useState} from "react";
import "./Form.scss";

import {DispatchFormValue, FieldValueUpdate, IInitialFormValues, IFormErrors} from "./Form.types";

import {validateFieldRules, validateForm, fieldsValidationRules} from "./formValidation";

export const Form = () => {
	const dispatchFormValue = (state: IInitialFormValues, fieldValueUpdate: FieldValueUpdate) => {
		return {...structuredClone(state), [fieldValueUpdate.field]: fieldValueUpdate.value} as IInitialFormValues;
	};
	const [formValues, setFormValues] = useReducer<DispatchFormValue<IInitialFormValues, FieldValueUpdate>>(
		dispatchFormValue,
		{
			firstname: "",
			lastname: "",
			email: "",
			confirmEmail: ""
		}
	);

	const [formErrors, setFormErrors] = useState<IFormErrors>({
		firstname: [],
		lastname: [],
		email: [],
		confirmEmail: []
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		validateForm(formValues, formErrors, setFormErrors);
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
					onBlur={() => validateFieldRules(
						"firstname",
						formValues.firstname,
						fieldsValidationRules.firstname,
						setFormErrors
					)}
					onChange={e => setFormValues({field: "firstname", value: e.target.value})}/>
				<em role="alert" className="form__error">{formErrors.firstname.join(" - ")}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="lastname">Lastname</label>
				<input
					className={`form__input${formErrors.lastname.length ? " form__input--error" : ""}`}
					id="lastname"
					placeholder="Lastname"
					type="text"
					value={formValues.lastname}
					onBlur={() => validateFieldRules(
						"lastname",
						formValues.lastname,
						fieldsValidationRules.lastname,
						setFormErrors
					)}
					onChange={e => setFormValues({field: "lastname", value: e.target.value})}/>
				<em role="alert" className="form__error">{formErrors.lastname.join(" - ")}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="email">Email</label>
				<input
					className={`form__input${formErrors.email.length ? " form__input--error" : ""}`}
					id="email"
					placeholder="Email"
					type="text"
					value={formValues.email}
					onBlur={() => validateFieldRules(
						"email",
						formValues.email,
						fieldsValidationRules.email,
						setFormErrors
					)}
					onChange={e => setFormValues({field: "email", value: e.target.value})}/>
				<em role="alert" className="form__error">{formErrors.email.join(" - ")}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="confirmEmail">Confirm email</label>
				<input
					className={`form__input${formErrors.confirmEmail.length ? " form__input--error" : ""}`}
					id="confirmEmail"
					placeholder="Confirm email"
					type="text"
					value={formValues.confirmEmail}
					onBlur={() => validateFieldRules(
						"confirmEmail",
						formValues.confirmEmail,
						fieldsValidationRules.confirmEmail,
						setFormErrors,
						formValues
					)}
					onChange={e => setFormValues({field: "confirmEmail", value: e.target.value})}/>
				<em role="alert" className="form__error">{formErrors.confirmEmail.join(" - ")}</em>
			</div>
			<button className="form__button" type="submit">Submit</button>
		</form>
	);
};