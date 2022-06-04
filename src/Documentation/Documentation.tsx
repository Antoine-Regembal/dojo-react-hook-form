import {useEffect, useState} from "react";
import {Routes, Route, useNavigate } from "react-router-dom";

import {Prerequisites} from "./routes/Prerequisites";
import {DocumentationNav} from "./DocumentationNav";

import { pagesLinks } from "./documentation.json";
import "./Documentation.scss";

export const Documentation = () => {
	const setCurrentPageInSessionStorage = (currentPage: string) => {
		sessionStorage.setItem("currentPage", currentPage);
		return currentPage;
	};

	const initSetCurrentPage = (defaultPage: string) =>
		sessionStorage.getItem("currentPage")
			? sessionStorage.getItem("currentPage")
			: setCurrentPageInSessionStorage(defaultPage);
	const [currentPage, setCurrentPage] = useState(() => initSetCurrentPage("prerequisites"));

	const navigate = useNavigate();
	useEffect(() => {
		navigate(`/${currentPage}`);
	}, []);

	const onNavLinkClick = (currentPage: string) => {
		setCurrentPage(setCurrentPageInSessionStorage(currentPage));
	};

	return (
		<div>
			<header>
				<h1>DOJO : react-hook-form</h1>
			</header>
			<DocumentationNav onNavLinkClick={onNavLinkClick} pagesLinks={pagesLinks} />
			<Routes>
				<Route path={pagesLinks.prerequisites} element={<Prerequisites/>}/>
			</Routes>
		</div>
	);
};
