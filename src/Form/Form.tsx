import React from "react";
import "./Form.scss";

export const Form = () => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className="form" onSubmit={e => handleSubmit(e)}>
			<div className="input-wrapper">
				<label className="form__label" htmlFor="firstname">Firstname</label>
				<input className="form__input" id="firstname" placeholder="Firstname" type="text" value={""} onChange={() => {}}/>
			</div>
			<div className="input-wrapper">
				<label className="form__label"htmlFor="lastname">Lastname</label>
				<input className="form__input" id="lastname" placeholder="Lastname" type="text" value={""} onChange={() => {}}/>
			</div>
			<div className="input-wrapper">
				<label className="form__label" htmlFor="email">Email</label>
				<input className="form__input" id="email" placeholder="Email" type="text" value={""} onChange={() => {}}/>
			</div>
			<div className="input-wrapper">
				<label className="form__label" htmlFor="confirmEmail">Confirm email</label>
				<input className="form__input" id="confirmEmail" placeholder="Confirm email" type="text" value={""} onChange={() => {}}/>
			</div>
			<button className="form__button" type="submit">Submit</button>
		</form>
	);
};