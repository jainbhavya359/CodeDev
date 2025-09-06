import { SignedIn, SignedOut, SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      Home
      <SignedOut>
        <SignUpButton />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}
