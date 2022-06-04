import { Link } from "react-router-dom";

import { DocumentationNavProps } from "./DocumentationNav.types";

export const DocumentationNav = ({onNavLinkClick, pagesLinks}: DocumentationNavProps) => (
	<nav>
		<ul className="nav">
			{
				Object.values(pagesLinks).map(link => (
					<li key={link} className="nav__list" onClick={() => onNavLinkClick(link)}>
						<Link to={`/${link}`}>{link}</Link>
					</li>
				))
			}
		</ul>
	</nav>
);
