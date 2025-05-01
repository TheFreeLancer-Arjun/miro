import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Props for the UserAvatar component.
 */
interface UserAvatarProps {
  /** The source URL of the user's profile picture */
  src?: string;
  
  /** The name of the user to display in the hint */
  name?: string;
  
  /** The fallback text to display when the user's picture is not available */
  fallback?: string;
  
  /** The border color for the avatar */
  borderColor?: string;
}

/**
 * UserAvatar component displays an avatar image with a customizable border color,
 * a fallback option for when the image is unavailable, and a tooltip showing the user's name.
 * 
 * The component utilizes the Hint component to show the user's name when hovered over.
 * The avatar image is wrapped inside a styled `Avatar` component with a fallback name or initial.
 * 
 * @param {UserAvatarProps} props - Component props
 * @returns A styled user avatar with fallback and a tooltip with the user's name.
 */
export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "name"} side="bottom" sideOffset={10}>
      <Avatar
        className="h-8 w-8 border-2"
        style={{ borderColor: borderColor }}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
