import { OrganizationsMap } from "./_SideSectionBarComponents/organizations-map";
import { AddOrganizationButton } from "./_SideSectionBarComponents/add-organizations-button";

/**
 * SideSectionBar component represents a fixed vertical sidebar
 * on the left side of the screen, typically used for displaying
 * a list of organizations and providing a button to add a new organization.
 *
 * - Displays the list of organizations through the `OrganizationsMap` component.
 * - Provides a button to add a new organization via the `AddOrganizationButton` component.
 *
 * @returns {JSX.Element} The sidebar containing the organizations map and add organization button.
 */
export const SideSectionBar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4">
      {/* List of organizations */}
      <OrganizationsMap />

      {/* Button to add a new organization */}
      <AddOrganizationButton />
    </aside>
  );
};
