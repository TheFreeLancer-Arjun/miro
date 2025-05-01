"use client";

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import { SearchInput } from "./_NavbarSectionBarComponents/search-input";
import { InviteButton } from "./_NavbarSectionBarComponents/invite-button";

interface NavbarSectionBarProps {
  // No specific props passed to this component
}

/**
 * NavbarSectionBar component is a flexible navigation bar section that includes:
 * - A search input field (visible on large screens).
 * - An organization switcher (visible on smaller screens).
 * - An invite button (visible if an organization is selected).
 * - A user button for user-specific actions (such as profile, sign out, etc.).
 *
 * This component handles the layout and behavior for displaying the various elements 
 * of the navigation bar based on the screen size and organization context.
 *
 * @returns {JSX.Element} The rendered NavbarSectionBar component
 */
export const NavbarSectionBar = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center gap-x-4 p-5 ">
      {/* Search input field visible only on large screens */}
      <div className="hidden lg:flex-1 lg:flex ">
        <SearchInput />
      </div>

      {/* Organization switcher for mobile screens */}
      <div className="block lg:hidden flex-1 ">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB", 
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>

      {/* Invite button, shown only if the user is part of an organization */}
      {organization && <InviteButton />}

      {/* User button for profile actions */}
      <UserButton />
    </div>
  );
};
