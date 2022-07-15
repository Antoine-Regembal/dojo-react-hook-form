import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
  const yupValidationSchema = yup.object().shape({
    firstname: yup.string().required("Field cannot be empty"),
    lastname: yup.string().required("Field cannot be empty"),
    email: yup
      .string()
      .required("Field cannot be empty")
      .email("Invalid format"),
    confirmEmail: yup
      .string()
      .required("Field cannot be empty")
      .oneOf([yup.ref("email")], "Does not match"),
  });

  const { register, formState, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(yupValidationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      confirmEmail: "",
    },
  });

  return (
    <form className="form form--required" onSubmit={handleSubmit(() => null)}>
      <div className="input-wrapper">
        <label
          className="form__label form__label--required"
          htmlFor="firstname"
        >
          Firstname
        </label>
        <input
          className={`form__input${
            formState.errors.firstname ? " form__input--error" : ""
          }`}
          id="firstname"
          placeholder="Firstname"
          type="text"
          {...register("firstname")}
        />
        {formState.errors.firstname && (
          <em role="alert" className="form__error">
            {formState.errors.firstname.message as string}
          </em>
        )}
      </div>
      <div className="input-wrapper">
        <label className="form__label form__label--required" htmlFor="lastname">
          Lastname
        </label>
        <input
          className={`form__input${
            formState.errors.lastname ? " form__input--error" : ""
          }`}
          id="lastname"
          placeholder="Lastname"
          type="text"
          {...register("lastname")}
        />
        {formState.errors.lastname && (
          <em role="alert" className="form__error">
            {formState.errors.lastname.message as string}
          </em>
        )}
      </div>
      <div className="input-wrapper">
        <label className="form__label form__label--required" htmlFor="email">
          Email
        </label>
        <input
          className={`form__input${
            formState.errors.email ? " form__input--error" : ""
          }`}
          id="email"
          placeholder="Email"
          type="text"
          {...register("email")}
        />
        {formState.errors.email && (
          <em role="alert" className="form__error">
            {formState.errors.email.message as string}
          </em>
        )}
      </div>
      <div className="input-wrapper">
        <label
          className="form__label form__label--required"
          htmlFor="confirmEmail"
        >
          Confirm email
        </label>
        <input
          className={`form__input${
            formState.errors.confirmEmail ? " form__input--error" : ""
          }`}
          id="confirmEmail"
          placeholder="Confirm email"
          type="text"
          {...register("confirmEmail")}
        />
        {formState.errors.confirmEmail && (
          <em role="alert" className="form__error">
            {formState.errors.confirmEmail.message as string}
          </em>
        )}
      </div>
      <button className="form__button" type="submit">
        Submit
      </button>
    </form>
  );
};
