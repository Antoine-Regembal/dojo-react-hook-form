export interface DocumentationNavProps {
  onNavLinkClick: (currentPage: string) => void;
  pagesLinks: {
    [key: string]: string;
  };
}
