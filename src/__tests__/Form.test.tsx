import {render} from "@testing-library/react";
import { App } from "../App";

describe("Form", function () {
	describe("snapshots", function () {
		it("should match empty form", function () {
			const {container} = render(<App />);
			expect(container).toMatchSnapshot();
		});
	});
});
