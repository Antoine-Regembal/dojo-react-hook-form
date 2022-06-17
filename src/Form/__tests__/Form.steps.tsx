import { Form } from "../Form";
import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {defineFeature, loadFeature, DefineStepFunction} from "jest-cucumber";

const feature = loadFeature("./Form.feature", {loadRelativePath: true});

describe("Form", function () {
	const formComponentIsMounted = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^form component is mounted$/, () => {
			render(<Form />);
		});

	const xIsWrittenInTheYField = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^"(.*)" is written in the "(.*)" field$/, (value: string, fieldLabel: string) => {
			const fieldElement = screen.getByLabelText(fieldLabel);

			fireEvent.change(fieldElement, {target: {value: value}});
		});

	const xInputIsClicked = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^"(.*)" input is clicked$/, (fieldLabel: string) => {
			const fieldElement = screen.getByLabelText(fieldLabel);

			userEvent.click(fieldElement);
		});

	const formIsSubmittedByClickingXButton = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^form is submitted by clicking "(.*)" button$/, (buttonName: string) => {
			const submitButton = screen.getByRole("button", {name: buttonName});

			userEvent.click(submitButton);
		});

	const fieldLoseFocus = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^"(.*)" field lose focus$/, (fieldLabel: string) => {
			const fieldElement = screen.getByLabelText(fieldLabel);

			fireEvent.focusOut(fieldElement);
		});

	const noErrorsAreDisplayed = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^no error messages are displayed$/, () => {
			const errorsElements = screen.getAllByRole("alert");

			errorsElements.forEach((errorsElement: HTMLElement) => {
				expect(errorsElement.textContent).toBe("");
			});
		});

	const theXFieldHaveTheYErrorMessages = (defineStepFunction: DefineStepFunction) =>
		defineStepFunction(/^the "(.*)" field have the "(.*)" error messages$/, async (fieldLabel: string, errorMessages: string) => {
			const formElement = screen.getByLabelText(fieldLabel).parentElement as HTMLInputElement;
			const errorElement = within(formElement).getByRole("alert");
			
			await waitFor(() => {
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

		test("Submitting an invalid form", ({ given, when, then, and }) => {
			formComponentIsMounted(given);
			formIsSubmittedByClickingXButton(when);
			theXFieldHaveTheYErrorMessages(then);
			theXFieldHaveTheYErrorMessages(and);
			theXFieldHaveTheYErrorMessages(and);
			theXFieldHaveTheYErrorMessages(and);
		});

		test("Quitting \"<fieldLabel>\" field with invalid empty value", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xInputIsClicked(and);
			fieldLoseFocus(when);
			theXFieldHaveTheYErrorMessages(then);
		});

		test("Validating email field with invalid \"<emailValue>\" value", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xIsWrittenInTheYField(and);
			fieldLoseFocus(when);
			theXFieldHaveTheYErrorMessages(then);
		});

		test("Validating invalid confirm email field with \"<confirmEmailValue>\" and \"<emailValue>\" value for email field", ({ given, and, when, then }) => {
			formComponentIsMounted(given);
			xIsWrittenInTheYField(and);
			xIsWrittenInTheYField(and);
			fieldLoseFocus(when);
			theXFieldHaveTheYErrorMessages(then);
		});
	});
});