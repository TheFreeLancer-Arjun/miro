"use client";
import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

/**
 * `OrganizationHint` is a React component that renders an organization's image inside a tooltip.
 * When clicked, it sets the organization as active using Clerk's `useOrganizationList`.
 *
 * @param {ItemProps} props - The properties for the organization.
 * @param {string} props.id - The unique identifier for the organization.
 * @param {string} props.name - The display name of the organization (used in tooltip).
 * @param {string} props.imageUrl - URL for the organization's logo/image.
 *
 * @returns {JSX.Element} A square image with hover effects and a tooltip, allowing organization selection.
 */
export const OrganizationHint = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};
