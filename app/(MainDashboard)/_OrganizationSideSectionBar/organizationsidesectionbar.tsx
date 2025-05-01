"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

/**
 * OrganizationSideSectionBar component represents the sidebar section of the dashboard.
 * It includes the organization logo, organization switcher, and navigation buttons to 
 * toggle between team boards and favorite boards.
 * 
 * - Displays the logo of the application and the name "Board".
 * - Provides an organization switcher for changing organizations.
 * - Includes two buttons that navigate to different sections of the application: 
 *   - "Team boards" section.
 *   - "Favorite boards" section, with the active state toggled based on query parameters.
 * 
 * @returns {JSX.Element} The sidebar with navigation elements and organization switcher.
 */
export const OrganizationSideSectionBar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      {/* Logo and application title */}
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/file.svg" alt="logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>

      {/* Organization Switcher */}
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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

      {/* Navigation Buttons */}
      <div className="space-y-1 w-full">
        {/* Button for "Team boards" section */}
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        
        {/* Button for "Favorite boards" section */}
        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
