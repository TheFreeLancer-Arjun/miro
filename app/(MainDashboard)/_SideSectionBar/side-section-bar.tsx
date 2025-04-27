import { OrganizationsMap } from "./_SideSectionBarComponents/organizations-map"
import { AddOrganizationButton } from "./_SideSectionBarComponents/add-organizations-button"
export const SideSectionBar=()=>{
    return (
        <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4">
            <OrganizationsMap/>
            <AddOrganizationButton/>
        </aside>
    )
} 