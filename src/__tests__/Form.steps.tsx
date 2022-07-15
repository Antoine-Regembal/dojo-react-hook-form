import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {defineFeature, loadFeature, DefineStepFunction} from "jest-cucumber";
import { App } from "../App";

const feature = loadFeature("./Form.feature", {loadRelativePath: true});

describe("Form", function () {
	const formComponentIsMounted = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^form component is mounted$/, () => {
			render(<App />);
		});

	const xIsWrittenInTheYField = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^"(.*)" is written in the "(.*)" field$/, (value: string, fieldLabel: string) => {
			const fieldElement = screen.getByLabelText(fieldLabel);

			fireEvent.change(fieldElement, {target: {value: value}});
		});

	const xInputTypeAndErase = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^"(.*)" input is clicked$/, (fieldLabel: string) => {
			const fieldElement = screen.getByLabelText(fieldLabel);

			userEvent.type(fieldElement, "a{backspace}");
		});

	const formIsSubmittedByClickingXButton = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^form is submitted by clicking "(.*)" button$/, (buttonName: string) => {
			const submitButton = screen.getByRole("button", {name: buttonName});

			userEvent.click(submitButton);
		});

	const fieldBlur = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^"(.*)" field lose focus$/, (fieldLabel: string) => {
			const fieldElement = screen.getByLabelText(fieldLabel);

			fireEvent.blur(fieldElement);
		});

	const noErrorsAreDisplayed = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^no error messages are displayed$/, () => {
			const errorsElements = screen.queryAllByRole("alert");

			expect(errorsElements.length).toBe(0);
		});

	const theXFieldHaveTheYErrorMessages = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^the "(.*)" field have the "(.*)" error messages$/, async (fieldLabel: string, errorMessages: string) => {	
			await waitFor(() => {
				const formElement = screen.getByLabelText(fieldLabel).parentElement as HTMLInputElement;
				const errorElement = within(formElement).getByRole("alert");
	
				expect(errorElement.textContent).toEqual(errorMessages);
			});
		});

	defineFeature(feature, test => {
		test("Submitting a valid form", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xIsWrittenInTheYField(and);
			xIsWrittenInTheYField(and);
			xIsWrittenInTheYField(and);
			xIsWrittenInTheYField(and);
			formIsSubmittedByClickingXButton(when);
			noErrorsAreDisplayed(then);
		});

		test("Submitting an invalid form with empty fields", ({ given, when, then, and }) => {
			formComponentIsMounted(given);
			formIsSubmittedByClickingXButton(when);
			theXFieldHaveTheYErrorMessages(then);
			theXFieldHaveTheYErrorMessages(and);
			theXFieldHaveTheYErrorMessages(and);
			theXFieldHaveTheYErrorMessages(and);
		});

		test("Quitting \"<fieldLabel>\" field with invalid empty value", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xInputTypeAndErase(and);
			fieldBlur(when);
			theXFieldHaveTheYErrorMessages(then);
		});

		test("Validating email field with invalid \"<emailValue>\" value", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xIsWrittenInTheYField(and);
			fieldBlur(when);
			theXFieldHaveTheYErrorMessages(then);
		});

		test("Validating invalid confirm email field with \"foor.bar@email.com\" and \"foo.bar@email.com\" value for email field", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xIsWrittenInTheYField(and);
			xIsWrittenInTheYField(and);
			fieldBlur(when);
			theXFieldHaveTheYErrorMessages(then);
		});
	});
});