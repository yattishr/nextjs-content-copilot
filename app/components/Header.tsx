"use client";
import Link from "next/link";
import { APP_NAME, features } from "../constants";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { SchematicClient } from "@schematichq/schematic-typescript-node"
import NavMenu from "./NavMenu";


async function getPaymentPlan() { 
  const apiKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY
  if (!apiKey) throw new Error('Schematic API key not found')
  
  const client = new SchematicClient({
      apiKey
  })


  const response = await client.plans.listPlans()
  console.log(response)
  return response.data
}


function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left most content */}
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-4">
              <AgentPulse size="small" color="purple" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text">
                {APP_NAME}
              </h1>
            </Link>

            <NavMenu />
          </div>

          {/* Right most content */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="outline"
                  className="mr-4 bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text"
                >
                  Manage Plan
                </Button>
              </Link>

              {/* User Button */}
              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-purple-100 border-purple-200">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
