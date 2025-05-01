"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

/**
 * `AddOrganizationButton` is a React component that renders a button used to open a modal
 * for creating a new organization. It uses Clerk's `CreateOrganization` component inside a dialog.
 *
 * - The button displays a plus (`+`) icon.
 * - On hover, a tooltip ("Create organization") appears.
 * - When clicked, a modal opens with the organization creation form.
 *
 * @returns {JSX.Element} A styled button with a tooltip and modal integration for organization creation.
 */
export const AddOrganizationButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create organization" side="right" align="start" sideOffset={18}>
            <button className="bg-white/25 h-full w-full rounded-md flex justify-center items-center opacity-60 hover:opacity-100 transition">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
