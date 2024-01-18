"use client";
import React, { useState } from "react";
import Link from "next/link";
import { deleteCookie } from "../comp/cookie";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { Tooltip, Button, Fade } from "@mui/material";
import DrawerComponent from "./DrawerComponent";

export default function Nav() {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for the drawer

  const handleLogout = () => {
    deleteCookie();
    router.push("/Login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <main>
      <nav
        className={`flex items-center justify-between min-h-60 shadow-md ${
          isDrawerOpen ? "drawer-open" : ""
        } z-50`}
      >
        <ul>
          <li>
            <Link href={"/Home"}>
              <Image
                src="/requirediconsforsidebarandheadercomponent/logo-yellow.svg" // Replace with your image URL
                width={165}
                height={40}
                alt="No IMage"
                className="ml-4"
              />
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4 items-center mr-6">
          <li>
            <Tooltip
              title="Uploads in Progress"
              // TransitionComponent={Fade}
              // TransitionProps={{ timeout: 1000 }}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <Image
                src="/requirediconsforsidebarandheadercomponent/uploadIcon_1.svg"
                alt=""
                width={30}
                height={20}
              />
            </Tooltip>
          </li>

          <li>
            <Tooltip
              title="My Profile"
              // TransitionComponent={Fade}
              // TransitionProps={{ timeout: 1000 }}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <Image
                src="/requirediconsforsidebarandheadercomponent/defaultAvatar.svg"
                alt=""
                width={30}
                height={20}
              />
            </Tooltip>
          </li>

          <li>
            <Tooltip
              title="Support"
              // TransitionComponent={Fade}
              // TransitionProps={{ timeout: 1000 }}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <Image
                src="/requirediconsforsidebarandheadercomponent/Help.svg"
                alt=""
                width={30}
                height={20}
              />
            </Tooltip>
          </li>

          <li>
            <Tooltip
              title="Notifications"
              // TransitionComponent={Fade}
              // TransitionProps={{ timeout: 1000 }}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <Link href={""}>
                <Image
                  src="/requirediconsforsidebarandheadercomponent/Notification.svg"
                  alt=""
                  width={20}
                  height={20}
                  onClick={toggleDrawer}
                />
              </Link>
            </Tooltip>
          </li>

          <li
            className="relative transition-transform"
            onClick={toggleDropdown}
          >
            <Tooltip
              title="Menu"
              // TransitionComponent={Fade}
              // TransitionProps={{ timeout: 1000 }}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <Image
                src="/requirediconsforsidebarandheadercomponent/hamburgerMenu.svg"
                alt=""
                width={30}
                height={20}
              />
            </Tooltip>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 p-2 bg-white rounded-md shadow-md">
                <Link
                  className="block px-4 py-2 text-black hover:text-orange-400 cursor-pointer"
                  href="/Login"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <DrawerComponent  isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </main>
  );
}
