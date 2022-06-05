import React, {useReducer} from "react";
import "./Form.scss";

import {DispatchFormValue, FieldUpdate} from "./Form.types";

export const Form = () => {
	const initialFormValues = {
		firstname: "",
		lastname: "",
		email: "",
		confirmEmail: ""
	};
	const lazyFormValuesInitializer = (initialValues: typeof initialFormValues) => initialValues;
	const dispatchFormValue = (state: typeof initialFormValues, fieldUpdate: FieldUpdate) => {
		return {...structuredClone(state), [fieldUpdate.field]: fieldUpdate.value} as typeof initialFormValues;
	};

	const [formValues, setFormValues] = useReducer<DispatchFormValue<typeof initialFormValues>, typeof initialFormValues>(
		dispatchFormValue,
		initialFormValues,
		lazyFormValuesInitializer
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className="form" onSubmit={e => handleSubmit(e)}>
			<div className="input-wrapper">
				<label className="form__label" htmlFor="firstname">Firstname</label>
				<input
					className="form__input"
					id="firstname"
					placeholder="Firstname"
					type="text"
					value={formValues.firstname}
					onChange={e => setFormValues({field: "firstname", value: e.target.value})} />
			</div>
			<div className="input-wrapper">
				<label className="form__label"htmlFor="lastname">Lastname</label>
				<input
					className="form__input"
					id="lastname"
					placeholder="Lastname"
					type="text"
					value={formValues.lastname}
					onChange={e => setFormValues({field: "lastname", value: e.target.value})} />
			</div>
			<div className="input-wrapper">
				<label className="form__label" htmlFor="email">Email</label>
				<input
					className="form__input"
					id="email"
					placeholder="Email"
					type="text"
					value={formValues.email}
					onChange={e => setFormValues({field: "email", value: e.target.value})} />
			</div>
			<div className="input-wrapper">
				<label className="form__label" htmlFor="confirmEmail">Confirm email</label>
				<input
					className="form__input"
					id="confirmEmail"
					placeholder="Confirm email"
					type="text"
					value={formValues.confirmEmail}
					onChange={e => setFormValues({field: "confirmEmail", value: e.target.value})} />
			</div>
			<button className="form__button" type="submit">Submit</button>
		</form>
	);
};