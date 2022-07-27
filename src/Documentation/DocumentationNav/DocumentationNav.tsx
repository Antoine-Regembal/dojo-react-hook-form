import { Link } from "react-router-dom";

import { DocumentationNavProps } from "./DocumentationNav.types";

export const DocumentationNav = ({
  onNavLinkClick,
  pagesLinks,
}: DocumentationNavProps) => {
  const isLinkSelected = (link: string) =>
    sessionStorage.getItem("currentPage") === link
      ? " nav__list__button--selected"
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
              className={`nav__list__button${isLinkSelected(link)}`}
            >
              {link}
            </button>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
