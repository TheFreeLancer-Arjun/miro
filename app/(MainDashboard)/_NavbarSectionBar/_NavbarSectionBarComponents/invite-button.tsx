import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * InviteButton component provides a button that, when clicked, opens 
 * a dialog for inviting members to an organization.
 * 
 * - The button uses a `Plus` icon to indicate the invitation action.
 * - When clicked, it triggers the opening of a dialog that contains 
 *   the `OrganizationProfile` component from `@clerk/nextjs`, where 
 *   users can manage their organization and invite members.
 * - The dialog is styled with transparent background and no borders.
 * 
 * @returns {JSX.Element} The rendered invite button that triggers a dialog for inviting members.
 */
export const InviteButton = () => {
  return (
    <Dialog>
      {/* The button that triggers the dialog when clicked */}
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          <span>Invite members</span>
        </Button>
      </DialogTrigger>
      {/* Dialog content displaying the OrganizationProfile component */}
      <DialogContent className="p-0  bg-transparent border-none max-w-[880px] ">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};
