import { NavbarSectionBar } from "./_NavbarSectionBar/navbarsectionbar";
import { OrganizationSideSectionBar } from "./_OrganizationSideSectionBar/organizationsidesectionbar";
import { SideSectionBar } from "./_SideSectionBar/side-section-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * `DashboardLayout` is a layout component that structures the main dashboard UI.
 * 
 * It includes:
 * - A fixed left-side navigation bar (`SideSectionBar`).
 * - An organization-specific sidebar (`OrganizationSideSectionBar`).
 * - A top navbar (`NavbarSectionBar`).
 * - A dynamic content area (`children`) that renders the main content.
 *
 * @param {DashboardLayoutProps} props - Props containing React children to be rendered inside the layout.
 * @returns {JSX.Element} A complete dashboard layout with sidebars and navbar.
 */
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <SideSectionBar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrganizationSideSectionBar />
          <div className="h-full flex-1">
            <NavbarSectionBar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
