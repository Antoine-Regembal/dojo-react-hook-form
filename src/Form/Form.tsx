import { useForm } from "react-hook-form";

export const Form = () => {
  const { register, formState, handleSubmit, getValues } = useForm({
    mode: "onBlur",
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
          {...register("firstname", { required: "Field cannot be empty" })}
        />
        {formState.errors.firstname && (
          <em role="alert" className="form__error">
            {formState.errors.firstname.message as unknown as string}
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
          {...register("lastname", { required: "Field cannot be empty" })}
        />
        {formState.errors.lastname && (
          <em role="alert" className="form__error">
            {formState.errors.lastname.message as unknown as string}
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
          {...register("email", {
            required: "Field cannot be empty",
            pattern: {
              value: new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
              message: "Invalid format",
            },
          })}
        />
        {formState.errors.email && (
          <em role="alert" className="form__error">
            {formState.errors.email.message as unknown as string}
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
          {...register("confirmEmail", {
            required: "Field cannot be empty",
            validate: (value: string) =>
              value === getValues().email || "Does not match",
          })}
        />
        {formState.errors.confirmEmail && (
          <em role="alert" className="form__error">
            {formState.errors.confirmEmail.message as unknown as string}
          </em>
        )}
      </div>
      <button className="form__button" type="submit">
        Submit
      </button>
    </form>
  );
};
