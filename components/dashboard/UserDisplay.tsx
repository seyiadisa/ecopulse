'use client';

import { UserButton, useUser } from '@clerk/nextjs';

export default function UserDisplay() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="animate-pulse size-7 rounded-full border bg-muted"></div>
    );
  }

  return <UserButton />;
}
