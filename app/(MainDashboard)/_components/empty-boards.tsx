"use client";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutationHook } from "@/hook/use-api-mutation-hook";
import { toast } from "sonner"; 
import { useRouter } from "next/navigation";

/**
 * EmptyBoard component displays a message and a button to create the first board 
 * when there are no boards available for the user to view.
 * It allows users to create a new board by calling the API and redirecting to the created board's page.
 *
 * @returns {JSX.Element} The rendered component for creating a new board
 */
export const EmptyBoard = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutationHook(api.board.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
    .then((id) => {
      toast.success("Board created");
      router.push(`board/${id}`);
    })
    .catch(() => {
      toast.error("Failed to create board");
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/file.svg" height={110} width={110} alt="Empty" />

      <h2 className="text-2xl font-semibold mt-6">Create Your First Board</h2>

      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>

      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};
