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
import { Menu, Play } from "lucide-react";

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
    <header className="sticky top-0 left-0 bg-gradient-to-r from-blue-600 to-fuchsia-600 mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600">
            <Play className="h-5 w-5 ml-0.5" />
          </div>
          <span className="text-white text-2xl font-bold">Creator CoPilot</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-white hover:text-white/80 font-medium">
            Features
          </Link>


          <SignedIn>

          <Link href="/manage-plan" className="text-white hover:text-white/80 font-medium">
            Manage Plan
          </Link>

              {/* User Button */}
              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-purple-100 border-purple-200">
                <UserButton />
              </div>          
          </SignedIn>
          <Link href="#about" className="text-white hover:text-white/80 font-medium">
            About
          </Link>

          <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white px-6 py-4 text-lg rounded-full hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

        </nav>
        <button className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </button>
      </header>
  );
}

export default Header;
