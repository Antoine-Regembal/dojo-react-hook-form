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
			<section>
				<h3>Need more help ?</h3>
				<p>
					If you need more help to achieve this DOJO follow the steps described below.
					The links open documentation where you can find out how to achieve the step.
				</p>
				<p>
					Also you can find &quot;correction&quot; branches in the GIT repository that adds to the form the code from every steps.
				</p>
				<section>
					<h4>Manage fields with react-hook-form</h4>
					<p>The library gives a custom hook called useForm that can take optional arguments to modify the library behavior to fit your needs.</p>
					<p>This custom hook returns several variables and functions that you can use to manage fields, to get informations about fields or errors states, etc.</p>
					<a href="https://react-hook-form.com/api/useform" target="_blank" rel="noreferrer">First thing you need to do is to import useForm and to call it.</a>
					<h5 className="section__title--tips">Tips</h5>
					<section className="tips block">
						<p>This step should be easy as the code is already there, uncoment it 🙂</p>
					</section>
					<p>
						Once you called useForm and retrieved the right variables from it, you should use some of them direcly on the form fields.
					</p>
					<p>
						Keep in mind that you start from a controlled form that already has it&lsquo;s state and errors management. A field controlled with react-hook-form
						cannot also be controlled by a useState, useReducer or wathever. You will need to remove the old form management functions to let the useForm hook managem them for you.
					</p>
					<p>
						To achieve that, remove &quot;onChange&quot;, &quot;onBlur&quot;, &quot;value&quot; props and add a desctucturation of &quot;register&quot; that you retrieved from useForm hook.
					</p>
					<a href="https://react-hook-form.com/api/useform/register#main" target="_blank" rel="noreferrer">
						Documentation to register. Check the &quot;Options&quot; section for field validation rules documentation.
					</a>
					<h5 className="section__title--tips">Tips</h5>
					<section className="tips block">
						<p>
							An example of the use of register is already there, commented in the first field props.
							It shows you that you must give to it the field name to let react-hook-form know which
							field is controlled with this particular register destructuration and also that you can
							give an optional object for field validation.
						</p>
					</section>
					<p>
						Once you called useForm and used it&lsquo;s properties to manage your forms fields (and removed the old props), then you form is controlled by react hook form.
					</p>
				</section>
				<section>
					<h4>Validate fields and send form data</h4>
					<p>
						If you followed the steps above, then your form should now be managed by react-hook-form.
					</p>
					<p>
						Depending on the settings you gave to the useForm hook
						(<a href="https://react-hook-form.com/api/useform" target="_blank" rel="noreferrer" >
							check the documentation to know how change useForm behavior on your needs
						</a>) the register function you gave in props to your fields allows react-hook-form to validate them with the
						validation restrictions you defined. You may notice that your fields already are validated when you trigger the &quot;onBlur&quot; event
						by leaving the fields focus.
					</p>
					<p>
						But you may also notice, depending on the code you produced during the DOJO, that the global form validation isn&lsquo;t triggered
						when clicking on the &quot;Submit&quot; button.
					</p>
					<p>
						This is because the function called with the &quot;onSubmit&quot; action of the form was previoulsy coded and is now legacy
						(meaning that it does not use react-hook-form as we want to).
						Fortunately, useForm hook also gives us a function that fulfill this role : <a href="https://react-hook-form.com/api/useform/handlesubmit" target="_blank" rel="noreferrer" >the handleSubmit function</a>.
					</p>
					<p>
						The &quot;handleSubmit&quot; fonction from useForm hook validate all registered fields from your form, and different cases can occur :
					</p>
					<ul className="block">
						<li>If their is no form errors : the callback function you give to handleSubmit is called (like a post method to send form data to API for example)</li>
						<li>
							If their are form errors : form validation is triggered and the form state is updated with errors.
							In this case, the callback function you give to handleSubmit is NOT called. Your form must be valid to be sent
						</li>
					</ul>
				</section>
				<section>
					<h3 className="section__title--tips">Tips</h3>
					<p className="block tips">
						You can find the &quot;Manage fields with react-hook-form&quot; and &quot;Validate fields and send form data&quot; steps completed on the{" "}
						<a href="https://github.com/Antoine-Regembal/dojo-react-hook-form/tree/correction-manage-form" target="_blank" rel="noreferrer">
							&quot;correction-manage-form&quot; branch in the GIT repository.
						</a>
						{" "}Check{" "}
						<a href="https://github.com/Antoine-Regembal/dojo-react-hook-form/commit/74c4f3ec00795bec764fb9ec2a23497243765e5d?diff=unified" target="_blank" rel="noreferrer">
							this commit
						</a>
						{" "}to see how react-hook-form helped to reduce code complexity 😃 !
					</p>
				</section>
				<section>
					<h4>Adding Yup as a resolver to manage fields validation rules</h4>
					<p>
						<a href="https://www.npmjs.com/package/yup" target="_blank" rel="noreferrer">
							Yup
						</a>
						{" "}can be used as a resolver in the useForm settings as you can see in{" "}
						<a href="https://react-hook-form.com/ts#ResolverRef" target="_blank" rel="noreferrer">
							this part of the react-hook-form documentation.
						</a>
					</p>
					<p>
						To make it short, you can define a Yup validation schema that will create an object.
						In this object you may specify entries for each fields that needs to be validated.
						The entries keys must match the field name registered in react-hook-form.
					</p>
					<p>
						Then you can specify on the useForm settings to use this validation schema as a resolver,
						and react-hook-form will automatically use this schema for fields validation.
						This means that you can remove the previous validation rules you defined for each fields
						as react-hook-form will now use the resolver validation schema.
					</p>
				</section>
				<section>
					<h3 className="section__title--tips">Tips</h3>
					<p className="block tips">
						You can find the &quot;Adding Yup as a resolver to manage fields validation rules&quot; step completed on the{" "}
						<a href="https://github.com/Antoine-Regembal/dojo-react-hook-form/compare/main...correction-validation-yup" target="_blank" rel="noreferrer">
							&quot;correction-validation-yup&quot; branch in the GIT repository.
						</a>
						{" "}Check{" "}
						<a href="https://github.com/Antoine-Regembal/dojo-react-hook-form/commit/8daa77be29bb2e75aaec5985547dfa5e0cf22f4d" target="_blank" rel="noreferrer">
							this commit
						</a>
						{" "}to see how Yup can be used as a resolver for react-hook-form.
					</p>
				</section>
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
