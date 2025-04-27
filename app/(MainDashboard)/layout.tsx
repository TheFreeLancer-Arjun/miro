
import { NavbarSectionBar } from "./_NavbarSectionBar/navbarsectionbar";
import { OrganizationSideSectionBar } from "./_OrganizationSideSectionBar/organizationsidesectionbar";
import { SideSectionBar } from "./_SideSectionBar/side-section-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <SideSectionBar />
      <div className="pl-[60px]  h-full">
        <div className="flex gap-x-3 h-full ">
          <OrganizationSideSectionBar />
          <div className="h-full flex-1 ">
            <NavbarSectionBar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardLayout;
