"use client";
import { useOrganizationList } from "@clerk/nextjs";
import { OrganizationHint } from "./organization-hint";
/**
 * `OrganizationsMap` Component
 *
 * Displays a vertical list of organizations the current user is a member of.
 * It uses the Clerk `useOrganizationList` hook to fetch user memberships.
 *
 * - If the user is a member of one or more organizations, the component renders
 *   an unordered list (`<ul>`) where each item is an `OrganizationHint`.
 * - If no memberships are found, the component renders nothing (`null`).
 *
 * @returns {JSX.Element | null} A list of `OrganizationHint` components or `null` if no memberships exist.
 */
export const OrganizationsMap = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // Don't render if user has no organization memberships
  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((membership) => (
        <OrganizationHint
          key={membership.organization.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
