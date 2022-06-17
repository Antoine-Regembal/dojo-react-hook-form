import React from "react";
import {
	IFormErrors,
	IInitialFormValues,
	IFieldValidationRules
} from "./Form.types";

export const fieldsValidationRules = {
	firstname: {
		required: true
	},
	lastname: {
		required: true
	},
	email: {
		required: true,
		regexValidation: "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
	},
	confirmEmail: {
		required: true,
		equalsTo: "email"
	}
};

const addFieldError = (
	setFormErrors: React.Dispatch<React.SetStateAction<IFormErrors>>,
	field: string,
	errorMessage: string
) => {
	setFormErrors((prevFieldsErrorsState: IFormErrors) => {
		return {
			...prevFieldsErrorsState,
			[field]: [
				...new Set([...prevFieldsErrorsState[field as keyof IFormErrors], errorMessage]),
			],
		};
	});
};

const removeFieldError = (
	setFormErrors: React.Dispatch<React.SetStateAction<IFormErrors>>,
	field: string,
	errorMessage: string
) => {
	setFormErrors((prevFieldsErrorsState: IFormErrors) => {
		return {
			...prevFieldsErrorsState,
			[field]: [
				...new Set([
					...prevFieldsErrorsState[field as keyof IFormErrors].filter(
						(currErrorMessage: string) => currErrorMessage !== errorMessage
					),
				]),
			],
		};
	});
};

const isFieldValueEmpty = (fieldValue: string) => fieldValue === undefined || fieldValue === null || fieldValue === "";

export const validateFieldRules = (
	field: string,
	value: string,
	fieldValidationRules: IFieldValidationRules,
	setFormErrors: React.Dispatch<React.SetStateAction<IFormErrors>>,
	formValues?: IInitialFormValues
) => {
	Object.entries(fieldValidationRules).forEach(([ruleName, ruleValue]) => {
		switch (ruleName) {
		case "required":
			if (ruleValue) {
				isFieldValueEmpty(value)
					? addFieldError(setFormErrors, field, "Field cannot be empty")
					: removeFieldError(setFormErrors, field, "Field cannot be empty");
			}
			break;
		case "regexValidation":
			!value.match(ruleValue as string)
				? addFieldError(setFormErrors, field, "Invalid format")
				: removeFieldError(setFormErrors, field, "Invalid format");
			break;
		case "equalsTo":
			!(value === formValues?.[ruleValue as keyof IInitialFormValues])
				? addFieldError(setFormErrors, field, "Does not match")
				: removeFieldError(setFormErrors, field, "Does not match");
			break;
		default:
			break;
		}
	});
};

export const validateForm = (
	formValues: IInitialFormValues,
	formErrors: IFormErrors,
	setFormErrors: React.Dispatch<React.SetStateAction<IFormErrors>>
) => {
	Object.entries(formValues).forEach(([field, value]: [field: string, value: string]) => {
		const fieldValidationRules = fieldsValidationRules[field as keyof typeof fieldsValidationRules];

		validateFieldRules(
			field,
			value,
			fieldValidationRules,
			setFormErrors,
			formValues
		);
	});
};
