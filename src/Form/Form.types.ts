export interface FieldValueUpdate {
    field: string;
    value: string;
}

export interface FieldErrorsUpdate {
    field: string;
    value: string[];
}

export interface IInitialFormValues {
    firstname: string,
    lastname: string,
    email: string,
    confirmEmail: string
}

export 	interface IFormErrors  {
    firstname: string[],
    lastname: string[],
    email: string[],
    confirmEmail: string[]
}

export interface IFieldValidationRules {
    [ruleKey: string]: string | boolean;
}

export type DispatchFormValue<T, Y> = (state: T, fieldUpdate: Y) => T
