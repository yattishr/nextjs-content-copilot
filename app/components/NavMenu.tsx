import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";

function NavMenu() {
  return (
    <>
      {/* Navigation Menu */}
      <NavigationMenu className="relative">
        <NavigationMenuList className="flex gap-8">
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
              Product
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <NavigationMenuLink
                  href="/features"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Features
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/pricing"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Pricing
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  About Us
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Contact
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <NavigationMenuLink
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Blog
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/guides"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Guides
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/support"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Support
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
              Company
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <NavigationMenuLink
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  About Us
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/careers"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Careers
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Contact
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

export default NavMenu;