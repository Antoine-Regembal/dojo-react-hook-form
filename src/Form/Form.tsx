import React, {useReducer} from "react";
//import {useForm} from "react-hook-form";
import {DispatchFormValue, FieldValueUpdate, IInitialFormValues} from "./Form.types";
import {validateFieldRules, validateForm, fieldsValidationRules} from "./formValidation";

export const Form = () => {
	/*const { register, formState } = useForm({
		mode: "all"
	});*/

	const dispatchFormValue = (state: IInitialFormValues, fieldValueUpdate: FieldValueUpdate) => {
		const { value, errors } = state[fieldValueUpdate.field as keyof IInitialFormValues];

		switch(fieldValueUpdate.action) {
		case "valueUpdate":
			return {...structuredClone(state), [fieldValueUpdate.field]: {errors, value: fieldValueUpdate.value}} as IInitialFormValues;
			
		case "errorsUpdate":
			return {...structuredClone(state), [fieldValueUpdate.field]: {value, errors: fieldValueUpdate.value}} as IInitialFormValues;
			
		default:
			break;
		}
		return state;
	};
	const [formValues, setFormValues] = useReducer<DispatchFormValue<IInitialFormValues, FieldValueUpdate>>(
		dispatchFormValue,
		{
			firstname: {
				value: "",
				errors: []
			},
			lastname: {
				value: "",
				errors: []
			},
			email: {
				value: "",
				errors: []
			},
			confirmEmail: {
				value: "",
				errors: []
			}
		}
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		validateForm(formValues, setFormValues);
	};

	return (
		<form className="form form--required" onSubmit={e => handleSubmit(e)}>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="firstname">Firstname</label>
				<input
					className={`form__input${formValues.firstname.errors.length ? " form__input--error" : ""}`}
					id="firstname"
					placeholder="Firstname"
					type="text"
					//{...register("firstname"), { /*maybe you should add some logic here...*/}}
					value={formValues.firstname.value}
					onBlur={() => validateFieldRules(
						"firstname",
						formValues.firstname,
						fieldsValidationRules.firstname,
						setFormValues,
						formValues
					)}
					onChange={e => setFormValues({action: "valueUpdate", field: "firstname", value: e.target.value})}/>
				<em role="alert" className="form__error">{formValues.firstname.errors?.[0]}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="lastname">Lastname</label>
				<input
					className={`form__input${formValues.lastname.errors.length ? " form__input--error" : ""}`}
					id="lastname"
					placeholder="Lastname"
					type="text"
					value={formValues.lastname.value}
					onBlur={() => validateFieldRules(
						"lastname",
						formValues.lastname,
						fieldsValidationRules.lastname,
						setFormValues,
						formValues
					)}
					onChange={e => setFormValues({action: "valueUpdate", field: "lastname", value: e.target.value})}/>
				<em role="alert" className="form__error">{formValues.lastname.errors?.[0]}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="email">Email</label>
				<input
					className={`form__input${formValues.email.errors.length ? " form__input--error" : ""}`}
					id="email"
					placeholder="Email"
					type="text"
					value={formValues.email.value}
					onBlur={() => validateFieldRules(
						"email",
						formValues.email,
						fieldsValidationRules.email,
						setFormValues,
						formValues
					)}
					onChange={e => setFormValues({action: "valueUpdate", field: "email", value: e.target.value})}/>
				<em role="alert" className="form__error">{formValues.email.errors?.[0]}</em>
			</div>
			<div className="input-wrapper">
				<label className="form__label form__label--required" htmlFor="confirmEmail">Confirm email</label>
				<input
					className={`form__input${formValues.confirmEmail.errors.length ? " form__input--error" : ""}`}
					id="confirmEmail"
					placeholder="Confirm email"
					type="text"
					value={formValues.confirmEmail.value}
					onBlur={() => validateFieldRules(
						"confirmEmail",
						formValues.confirmEmail,
						fieldsValidationRules.confirmEmail,
						setFormValues,
						formValues
					)}
					onChange={e => setFormValues({action: "valueUpdate", field: "confirmEmail", value: e.target.value})}/>
				<em role="alert" className="form__error">{formValues.confirmEmail.errors?.[0]}</em>
			</div>
			<button className="form__button" type="submit">Submit</button>
		</form>
	);
};