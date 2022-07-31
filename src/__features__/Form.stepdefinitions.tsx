import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defineSteps } from "specflow-emulator";
import { Form } from "../Form";

export const stepDefinitions = defineSteps(
  [{ feature: "Form" }],
  ({ Given, When, Then }) => {
    Given(/^form component is mounted$/, () => () => {
      render(<Form />);
    });

    Given(
      /^"(.*)" is written in the "(.*)" field$/,
      () => (value: string, fieldLabel: string) => {
        const fieldElement = screen.getByLabelText(fieldLabel);

        fireEvent.change(fieldElement, { target: { value: value } });
      }
    );

    [Given, When].forEach((method) =>
      method(/^"(.*)" input is clicked$/, () => (fieldLabel: string) => {
        const fieldElement = screen.getByLabelText(fieldLabel);

        userEvent.type(fieldElement, "a{backspace}");
      })
    );

    When(
      /^form is submitted by clicking "(.*)" button$/,
      () => (buttonName: string) => {
        const submitButton = screen.getByRole("button", { name: buttonName });

        userEvent.click(submitButton);
      }
    );

    When(/^"(.*)" field lose focus$/, () => (fieldLabel: string) => {
      const fieldElement = screen.getByLabelText(fieldLabel);

      fireEvent.blur(fieldElement);
    });

    Then(/^no error messages are displayed$/, () => () => {
      const errorsElements = screen.queryAllByRole("alert");

      expect(errorsElements.length).toBe(0);
    });

    Then(
      /^the "(.*)" field borders appear red$/,
      () => (fieldlabel: string) => {
        const fieldElement = screen.getByLabelText(fieldlabel);

        expect(fieldElement).toHaveClass("form__input--error");
      }
    );

    Then(
      /^the "(.*)" field have the "(.*)" error message$/,
      () => async (fieldLabel: string, errorMessages: string) => {
        await waitFor(() => {
          const formElement = screen.getByLabelText(fieldLabel)
            .parentElement as HTMLInputElement;
          const errorElement = within(formElement).getByRole("alert");

          expect(errorElement.textContent).toEqual(errorMessages);
        });
      }
    );
  }
);
