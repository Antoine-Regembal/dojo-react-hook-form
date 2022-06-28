export const Subject = () => (
	<>
		<section>
			<h2 className="section__title--subject">Subject</h2>
			<section>
				<h3>Existing and goal</h3>
				<p>You have been given a simple react form. The form is entirely functional with state management, form validation and errors management.</p>
				<p>
                    This form does not initially includes react-hook-form.
                    Your goal is to refactor the form to include react-hook-form for state management, form validation and errors management.
				</p>
			</section>
			<section>
				<h3>Optional challenges</h3>
				<p>If you want to, you can complete the initial goal with these optional ones :</p>
				<ul>
					<li>Persist the form state in the sessionStorage and make sure form data are retrieved and processed by react-hook-form when reloading the application page</li>
					<li>
                        Adding a{" "}
						<a href="https://react-hook-form.com/api/useform/#validationResolver" target="_blank" rel="noreferrer">resolver</a>{" "}
                        for the errors management with react-hook-form. With{" "}
						<a href="https://www.npmjs.com/package/yup" target="_blank" rel="noreferrer">Yup</a>{" "}
                        for example
					</li>
					<li>Adding more fields with interaction between fields, like a checkbox that display and hide a field when clicking on it (and see how react-hook-form manage hidden fields 🤔)</li>
				</ul>
			</section>
		</section>
		<section>
			<h2 className="section__title--refactor-validation">How to validate that my refactoring is correct ?</h2>
			<section>
				<h3>Use existing tests</h3>
				<p>The project comes with a full set of tests covering the different use cases of the form.</p>
				<p>To validate that your refactoring is correct, run the different tests suites with the command below.</p>
				<p>If after your refactoring all the test are passing, then you can consider that your refactoring is working.</p>
				<div className="snippet" onClick={() => {navigator.clipboard.writeText("npm run test");}}>
					<p>npm run test</p>
				</div>
			</section>
		</section>
		<section>
			<h2 className="section__title--tips">Tips</h2>
			<ul className="tips">
				<li>Launch tests suites during all the refactoring process to check what is working and what is not</li>
				<li>Try to not change everything at once. That could result on a really hard time to make test passing again</li>
				<li>
					Do not modify existing tests, they make sure the form is working and confirm if your refactoring is working too.
					However if you are adding more fields for the opitonal challenges make sure to add needed tests to cover the new cases
				</li>
				<li>Use the React Developer Tool to see what is happening inside your form while refactoring</li>
				<li>Read the documentation</li>
			</ul>
		</section>
	</>
);