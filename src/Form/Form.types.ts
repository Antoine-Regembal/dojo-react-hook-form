export interface FieldUpdate {
    field: string;
    value: string;
}

export type DispatchFormValue<T> = (state: T, fieldUpdate: FieldUpdate) => T
