import { SignIn } from '@clerk/nextjs';

/**
 * Page component renders the SignIn form provided by Clerk for user authentication.
 * 
 * This component displays a ready-to-use sign-in form where users can enter their credentials 
 * to authenticate with the application. The form is provided by the Clerk service.
 * 
 * @returns {React.ReactNode} The SignIn component from Clerk, allowing users to sign in.
 */
export default function Page() {
  return <SignIn />;
}
