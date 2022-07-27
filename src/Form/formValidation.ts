import React from "react";
import {
  IInitialFormValues,
  IFieldValidationRules,
  FieldValueUpdate,
  IFieldStates,
} from "./Form.types";

export const fieldsValidationRules = {
  firstname: {
    required: true,
  },
  lastname: {
    required: true,
  },
  email: {
    required: true,
    regexValidation: "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
  },
  confirmEmail: {
    required: true,
    equalsTo: "email",
  },
};

const isFieldValueEmpty = (fieldValue: string) =>
  fieldValue === undefined || fieldValue === null || fieldValue === "";

export const validateFieldRules = (
  field: keyof IInitialFormValues,
  fieldStates: IFieldStates,
  fieldValidationRules: IFieldValidationRules,
  setFormValues: React.Dispatch<FieldValueUpdate>,
  formValues: IInitialFormValues
) => {
  const fieldErrors = Object.entries(fieldValidationRules).reduce(
    (acc, [ruleName, ruleValue]) => {
      switch (ruleName) {
        case "required":
          return ruleValue && isFieldValueEmpty(fieldStates.value)
            ? [...acc, "Field cannot be empty"]
            : acc;
        case "regexValidation":
          return !fieldStates.value.match(ruleValue as string)
            ? [...acc, "Invalid format"]
            : acc;
        case "equalsTo":
          return !(
            fieldStates.value ===
            formValues?.[ruleValue as keyof IInitialFormValues].value
          )
            ? [...acc, "Does not match"]
            : acc;
        default:
          return acc;
      }
    },
    [] as string[]
  );

  setFormValues({ action: "errorsUpdate", field, value: fieldErrors });
};

export const validateForm = (
  formValues: IInitialFormValues,
  setFormValues: React.Dispatch<FieldValueUpdate>
) => {
  Object.entries(formValues).forEach(
    ([field, fieldStates]: [field: string, value: IFieldStates]) => {
      const fieldValidationRules =
        fieldsValidationRules[field as keyof typeof fieldsValidationRules];

      validateFieldRules(
        field as keyof IInitialFormValues,
        fieldStates,
        fieldValidationRules,
        setFormValues,
        formValues
      );
    }
  );
};
