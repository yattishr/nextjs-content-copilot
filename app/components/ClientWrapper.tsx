'use client';
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schematicPublishableKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  if (!schematicPublishableKey) {
    throw new Error("Schematic Publishable Key is required");
  }

  return (
    <ConvexClientProvider>
      <SchematicProvider publishableKey={schematicPublishableKey}>
        <SchematicWrapped>
          {children}
        </SchematicWrapped>
      </SchematicProvider>
    </ConvexClientProvider>
  )
}

// https://clerk.com/docs/customization/themes