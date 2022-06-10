export interface FieldValueUpdate {
    field: string;
    value: string;
}

export interface FieldErrorsUpdate {
    field: string;
    value: string[];
}

export 	interface IFormErrors  {
    firstname: string[],
    lastname: string[],
    email: string[],
    confirmEmail: string[]
}

export type DispatchFormValue<T, Y> = (state: T, fieldUpdate: Y) => T
