"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useParams } from "next/navigation";


type LinkType =
  | "dashboard"
  | "schedule"
  | "calendar"
  | "users"
  | "details"
  | "upload"
  | "newChat";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState<LinkType>("dashboard");
  const params = useParams<{ projectID: string }>();


  const handleLinkClick = (link: LinkType) => {
    setActiveLink(link);
  };

  const isLinkActive = (link: LinkType) => activeLink === link;

  return (
    <div className="text-black w-12 h-full p-2 flex flex-col justify-between shadow-md">
      <ul className="flex gap-[18px] flex-col pl-1">
        {/* //! ----------------------------DASHBOARDS AND REPORTS ----------------------------------- */}
        <li className="mb-2 relative">
          <Tooltip
            title="Dashboards and Reports"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/Dashboard`}>
              <div
                onClick={() => handleLinkClick("dashboard")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("dashboard")
                      ? "/requirediconsforsidebarandheadercomponent/dashboardProgressHighlight.svg"
                      : "/requirediconsforsidebarandheadercomponent/dashboardProgress.svg"
                  }
                  width={isLinkActive("dashboard") ? 60 : 25}
                  height={isLinkActive("dashboard") ? 40 : 25}
                  alt="Dashboard Progress"
                  className={isLinkActive("dashboard") ? " max-w-14" : ""} 
                />
              </div>
            </Link>
          </Tooltip>
        </li>
        {/* //! ---------------------------- VIEWS ----------------------------------- */}

        <li className="mb-2 relative">
          <Tooltip
            title="Views"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/Views`}>
              <div
                onClick={() => handleLinkClick("schedule")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("schedule")
                      ? "/requirediconsforsidebarandheadercomponent/ScheduleHighlight.svg"
                      : "/requirediconsforsidebarandheadercomponent/ScheduleIcon.svg"
                  }
                  width={isLinkActive("schedule") ? 60 : 25}
                  height={isLinkActive("schedule") ? 40 : 25}
                  alt="Schedule"
                  className={isLinkActive("schedule") ? "max-w-14" : ""}
                />
              </div>
            </Link>
          </Tooltip>
        </li>

        {/* //! ---------------------------- SCHEDULE ----------------------------------- */}

        <li className="mb-2 relative">
          <Tooltip
            title="Schedule"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/Schedule`}>
              <div
                onClick={() => handleLinkClick("calendar")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("calendar")
                      ? "/requirediconsforsidebarandheadercomponent/calendarHighlightedIcon.svg"
                      : "/requirediconsforsidebarandheadercomponent/calendarIcon.svg"
                  }
                  width={isLinkActive("calendar") ? 60 : 25}
                  height={isLinkActive("calendar") ? 40 : 25}
                  alt="Calendar"
                  className={isLinkActive("calendar") ? "max-w-14" : ""}
                />
              </div>
            </Link>
          </Tooltip>
        </li>

        {/* //! ---------------------------- USERS ----------------------------------- */}

        <li className="mb-2 relative">
          <Tooltip
            title="Users"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/Users`}>
              <div
                onClick={() => handleLinkClick("users")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("users")
                      ? "/requirediconsforsidebarandheadercomponent/usersSelectionIcon.svg"
                      : "/requirediconsforsidebarandheadercomponent/usersUnselectedIcon.svg"
                  }
                  width={isLinkActive("users") ? 60 : 25}
                  height={isLinkActive("users") ? 40 : 25}
                  alt="Users"
                  className={isLinkActive("users") ? "max-w-14" : ""}
                />
              </div>
            </Link>
          </Tooltip>
        </li>

        {/* //! ---------------------------- PROJECT DETAILS ----------------------------------- */}


        <li className="mb-2 relative">
          <Tooltip
            title="Project Details"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/ProjectDetails`}>
              <div
                onClick={() => handleLinkClick("details")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("details")
                      ? "/requirediconsforsidebarandheadercomponent/projectDetailsHighlighted.svg"
                      : "/requirediconsforsidebarandheadercomponent/projectDetails.svg"
                  }
                  width={isLinkActive("details") ? 60 : 25}
                  height={isLinkActive("details") ? 60 : 25}
                  alt="Upload"
                  className={isLinkActive("details") ? "max-w-14" : ""}
                />
              </div>
            </Link>
          </Tooltip>
        </li>

        {/* //! ---------------------------- UPLOADER ----------------------------------- */}


        <li className="mb-2 relative">
          <Tooltip
            title="Uploader"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/Uploader`}>
              <div
                onClick={() => handleLinkClick("upload")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("upload")
                      ? "/requirediconsforsidebarandheadercomponent/uploadHighlight.svg"
                      : "/requirediconsforsidebarandheadercomponent/uploadIcon.svg"
                  }
                  width={isLinkActive("upload") ? 60 : 25}
                  height={isLinkActive("upload") ? 60 : 25}
                  alt="Upload"
                  className={isLinkActive("upload") ? "max-w-14" : ""}
                />
              </div>
            </Link>
          </Tooltip>
        </li>
      </ul>

      {/* //! ---------------------------- CHAT ----------------------------------- */}


      <ul>
        <li className="mb-2 relative">
          <Tooltip
            title="Chat Support"
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 20],
                    },
                  },
                ],
              },
            }}
          >
            <Link href={`/projects/${params.projectID}/Chat`}>
              <div
                onClick={() => handleLinkClick("newChat")}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={
                    isLinkActive("newChat")
                      ? "/requirediconsforsidebarandheadercomponent/chat_close.svg"
                      : "/requirediconsforsidebarandheadercomponent/newChatIconSidePanel.svg"
                  }
                  width={isLinkActive("newChat") ? 60 : 25}
                  height={isLinkActive("newChat") ? 40 : 25}
                  alt="New Chat"
                  className={isLinkActive("newChat") ? "max-w-14" : ""}
                />
              </div>
            </Link>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
