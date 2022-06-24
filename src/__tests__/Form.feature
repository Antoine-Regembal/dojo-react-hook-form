Feature: Form

  Background:
    Given form component is mounted

  Scenario: Submitting a valid form
    And "Foo" is written in the "Firstname" field
    And "Bar" is written in the "Lastname" field
    And "foor.bar@email.com" is written in the "Email" field
    And "foor.bar@email.com" is written in the "Confirm email" field
    When form is submitted by clicking "Submit" button
    Then no error messages are displayed

  Scenario: Submitting an invalid form
    When form is submitted by clicking "Submit" button
    Then the "Firstname" field have the "Field cannot be empty" error messages
    And the "Lastname" field have the "Field cannot be empty" error messages
    And the "Email" field have the "Field cannot be empty - Invalid format" error messages
    And the "Confirm email" field have the "Field cannot be empty" error messages

  Scenario Outline: Quitting "<fieldLabel>" field with invalid empty value
    And "<fieldLabel>" input is clicked
    When "<fieldLabel>" field lose focus
    Then the "<fieldLabel>" field have the "<errorMessages>" error messages

    Examples:
      | fieldLabel    | value | errorMessages                          |
      | Firstname     |       | Field cannot be empty                  |
      | Lastname      |       | Field cannot be empty                  |
      | Email         |       | Field cannot be empty - Invalid format |
      | Confirm email |       | Field cannot be empty                  |

  Scenario Outline: Validating email field with invalid "<emailValue>" value
    And "<emailValue>" is written in the "Email" field
    When "Email" field lose focus
    Then the "Email" field have the "<errorMessages>" error messages

    Examples:
      | emailValue | errorMessages  |
      | foo        | Invalid format |
      | foo@       | Invalid format |
      | foo@bar    | Invalid format |
      | foo@bar.   | Invalid format |
      | foo@bar.x  | Invalid format |

  Scenario Outline: Validating invalid confirm email field with "<confirmEmailValue>" and "<emailValue>" value for email field
    And "<emailValue>" is written in the "Email" field
    And "<confirmEmailValue>" is written in the "Confirm email" field
    When "Confirm email" field lose focus
    Then the "Confirm email" field have the "<errorMessages>" error messages

    Examples:
      | confirmEmailValue  | emailValue         | errorMessages                          |
      |                    | foor.bar@email.com | Field cannot be empty - Does not match |
      | foor.bar@email.com |                    | Does not match                         |