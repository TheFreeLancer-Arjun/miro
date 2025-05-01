"use client";

import { use } from "react";
import { useOrganization } from "@clerk/nextjs";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favorite?: string;
  }>;
}

/**
 * `DashboardPage` is the main page component for the dashboard view.
 * 
 * It does the following:
 * - Uses Clerk's `useOrganization` hook to check if a user is in an organization.
 * - Renders `EmptyOrg` if no organization is active.
 * - Otherwise, renders a list of boards using `BoardList`, passing in the current organization ID
 *   and resolved search parameters.
 *
 * @param {DashboardPageProps} props - Props containing a `searchParams` Promise with optional `search` and `favorite` query strings.
 * @returns {JSX.Element} The dashboard content area showing either an empty state or a list of boards.
 */
const DashboardPage = (props: DashboardPageProps) => {
  const searchParams = use(props.searchParams);
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  );
};

export default DashboardPage;
