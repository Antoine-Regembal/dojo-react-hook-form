import { Documentation } from "./Documentation";
import { Form } from "./Form";
import "./App.scss";

export const App = () => (
	<div className="grid">
		<div className="area area--documentation">
			<Documentation/>
		</div>
		<div className="area area--form"><Form /></div>
	</div>
);
