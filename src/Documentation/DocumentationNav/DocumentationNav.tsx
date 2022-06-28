import { Link } from "react-router-dom";

import { DocumentationNavProps } from "./DocumentationNav.types";

export const DocumentationNav = ({
	onNavLinkClick,
	pagesLinks,
}: DocumentationNavProps) => {
	const isLinkSelected = (link: string, baseClass: string) =>
		sessionStorage.getItem("currentPage") === link
			? ` ${baseClass}--selected`
			: "";

	return (
		<nav>
			<ul className="nav">
				{Object.values(pagesLinks).map((link) => (
					<Link
						key={link}
						className="nav__list"
						to={`/${link}`}
						onClick={() => onNavLinkClick(link)}
					>
						<button
							type="button"
							className={`${
								link === "tips"
									? `nav__list__button--tips${isLinkSelected(
											link,
											"nav__list__button--tips"
									  )}`
									: `nav__list__button${isLinkSelected(
											link,
											"nav__list__button"
									  )}`
							}`}
						>
							{link}
						</button>
					</Link>
				))}
			</ul>
		</nav>
	);
};
