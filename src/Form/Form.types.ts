export interface FieldValueUpdate {
  action: "valueUpdate" | "errorsUpdate";
  field: string;
  value: string | string[];
}

export interface IFieldStates {
  value: string;
  errors: string[];
}

export interface IInitialFormValues {
  firstname: IFieldStates;
  lastname: IFieldStates;
  email: IFieldStates;
  confirmEmail: IFieldStates;
}

export interface IFieldValidationRules {
  [ruleKey: string]: string | boolean;
}

export type DispatchFormValue<T, Y> = (state: T, fieldUpdate: Y) => T;
