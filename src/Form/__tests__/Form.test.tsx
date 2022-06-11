import {render} from "@testing-library/react";
import {Form} from "../Form";

describe("Form", function () {
	describe("snapshots", function () {
		it("should match empty form", function () {
			const {container} = render(<Form />);

			expect(container).toMatchSnapshot();
		});
	});
});
