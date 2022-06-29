export const Help = () => (
	<>
		<section>
			<h2 className="section__title--refactor">
				How do I refactor this application ?
			</h2>
			<section>
				<h3 className="section__title--tips">Tips</h3>
				<p className="block tips">
					Their are several comments in the original code that will
					guide you to start the refactoring process.
				</p>
			</section>
			<section>
				<h3>Step by Step</h3>
				<p>
					Do not change too much things at once if you are not
					comfortable with React, that could lead to a really hard
					time to make tests passing again.
				</p>
				<p>
					If you are really stuck in the refactoring process, these
					steps should help you be back on the track :
				</p>
				<ul className="block">
					<li>Import useForm hook into your component file</li>
					<li>
						Create an instance of the useForm hook inside your
						component and get the functions from it that will allow
						you to manage fields (like register). Check the
						documentation to see which parameters you could give to
						useForm to get the desired behavior from it 😉
					</li>
					<li>
						Register the fields into react-hook-form. Also if
						needed, define validation requirements for each fields
						with generic or custom rules and messages
					</li>
					<li>
						Remove legacy fields controls like onChange, onBlur,
						value. By default, react-hook-form do that for you
						(depending of the configuration you give to the useForm
						hook)
					</li>
					<li>
						When form is submited by clicking on the Submit button,
						make react-hook-form handle submition by getting the right function from useForm
					</li>
					<li>
						Get the formState from useForm and manage to display fields errors below them
					</li>
				</ul>
				<p>
					When the refactoring process is done, the useReducer originaly used for form
					state and errors management becomes useless and can be deleted.
					It is the same thing for the validateForm and validateFieldRules functions.
				</p>
			</section>
		</section>
		<section>
			<h2 className="section__title--refactor-validation">How can I know the form validation rules ?</h2>
			<section>
				<h3>Check the formValidation.ts file</h3>
				<p>
					This file contains the original validation logic without react-hook-form.
				</p>
				<p>It exports :</p>
				<ul className="block">
					<li>
						A validateForm function that is called when the form is submitted when clicking the Submit button.
						It then calls the validateFieldRules for each fields registered in the useReducer hook
					</li>
					<li>
						A validateFieldRules function that is called whenever a field is validated.
						For each fields validation rules, the field value is tested with that rule
						and if the value does not meet the rule requirements and error is registered
					</li>
					<li>
						A fieldsValidationRules object that defines validation requirements for each fields
					</li>
				</ul>
			</section>
			<section>
				<h3 className="section__title--tips">Tips</h3>
				<ul className="block tips">
					<li>
						At the end of the refactoring process, this file becomes useless as react-hook-form should
						now manage fields state, fields errors and fields validation for you (and that&apos;s awesome 😄)
					</li>
					<li>You can check the fieldsValidationRules object to know the fields validation requirements</li>
				</ul>
			</section>
			<section>
				<h3>Check the gherkins scenarios</h3>
				<p>
					Gherkin scenarios allows to define the expected behaviors from a component or every other part of an application.
					In the case of this DOJO, differents scenarios have been writtend to define the expected behaviors of the form
					component for it&apos;s validation. These scenarios are then used to run tests suites and to check if your
					refactoring did break the original form behavior or not.
				</p>
				<p>
					You can find the gherkin scenarios in the Form.feature file, inside the __tests__ folder.
				</p>
			</section>
		</section>
	</>
);
