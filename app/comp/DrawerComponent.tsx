"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "../comp/cookie";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerComponent: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<number>(5); //TODO Initial number of messages to display
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      if (!token) {
        router.push("/Login");
      }
      try {
        const response = await axios.get(
          "https://api.dev2.constructn.ai/api/v1/user-notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const transformedData = response.data.notifications.map(
          (notification: any) => ({
            _id: notification._id,
            message: notification.message,
            category: notification.category,
            createdAt: new Date(notification.createdAt).toLocaleDateString(
              //TODO Date converts to Date time format
              //* LocalDateString converts to string based on local
              "en-US", //? In English
              {
                year: "numeric",
                month: "2-digit", //? Atleast Two digits
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "UTC",
              }
            ),
          })
        );
        setTransformedData(transformedData);
        const limitedData = transformedData.slice(0, visibleMessages); //TODO Starting and the visibleMessages not including it
        setData(limitedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (activeButton) {
      fetchData();
    }
  }, [activeButton, visibleMessages, router]);

  const handleLoadMore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setVisibleMessages((prevVisibleMessages) => prevVisibleMessages + 5);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const getIconSrc = (category: string): string => {
    switch (category) {
      case "Project":
        return "/requirediconsforsidebarandheadercomponent/clipboardIcon.svg";
      case "Issue":
        return "/requirediconsforsidebarandheadercomponent/issuesIcon.svg";
      case "Task":
        return "/requirediconsforsidebarandheadercomponent/fileTextIcon.svg";
      case "Capture":
        return "/requirediconsforsidebarandheadercomponent/cameraIcon.svg";
      default:
        return "";
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        ".MuiDrawer-paper": {
          top: "60px",

          height: "calc(100vh - 60px)",
        },
      }}
    >
      <Box sx={{ width: 446 }}>
        <div className="flex justify-between border-b-2 sticky top-0 bg-white z-10">
          <span className="p-2">Notifications</span>
          <button className="p-2" onClick={onClose}>
            <HighlightOffIcon />
          </button>
        </div>

        <div className="flex justify-between px-2 pt-2 pb-1 sticky top-11 bg-white">
          {/* //! ------------------------------ BUTTON FOR ALL ------------------------------------------------ */}
          <button
            onClick={() => handleButtonClick("All")}
            className={`flex ${
              activeButton === "All"
                ? "text-orange-400 border-b-2 border-orange-400"
                : ""
            } p-0.5`}
          >
            <Image
              src="/requirediconsforsidebarandheadercomponent/todoIcon.svg"
              alt=""
              width={22}
              height={20}
            />
            <div className="ml-1">All</div>
          </button>

          {/* //! ------------------------------ BUTTON FOR PROJECT ------------------------------------------------ */}

          <button
            onClick={() => handleButtonClick("Project")}
            className={`flex ${
              activeButton === "Project"
                ? "text-orange-400 border-b-2 border-orange-400"
                : ""
            }`}
          >
            <Image
              src="/requirediconsforsidebarandheadercomponent/clipboardIcon.svg"
              alt=""
              width={22}
              height={20}
              className="mt-0.5"
            />{" "}
            <div className="ml-1">Project</div>
          </button>

          {/* //! ------------------------------ BUTTON FOR ISSUE ------------------------------------------------ */}

          <button
            onClick={() => handleButtonClick("Issue")}
            className={`flex ${
              activeButton === "Issue"
                ? "text-orange-400 border-b-2 border-orange-400"
                : ""
            }`}
          >
            <Image
              src="/requirediconsforsidebarandheadercomponent/issuesIcon.svg"
              alt=""
              width={22}
              height={20}
            />{" "}
            <div className="ml-1">Issue</div>
          </button>

          {/* //! ------------------------------ BUTTON FOR TASK ------------------------------------------------ */}

          <button
            onClick={() => handleButtonClick("Task")}
            className={`flex ${
              activeButton === "Task"
                ? "text-orange-400 border-b-2 border-orange-400"
                : ""
            }`}
          >
            <Image
              src="/requirediconsforsidebarandheadercomponent/fileTextIcon.svg"
              alt=""
              width={22}
              height={20}
            />{" "}
            <div className="ml-1">Task</div>
          </button>

          {/* //! ------------------------------ BUTTON FOR CAPTURE ------------------------------------------------ */}

          <button
            onClick={() => handleButtonClick("Capture")}
            className={`flex ${
              activeButton === "Capture"
                ? "text-orange-400 border-b-2 border-orange-400"
                : ""
            }`}
          >
            <Image
              src="/requirediconsforsidebarandheadercomponent/cameraIcon.svg"
              alt=""
              width={22}
              height={20}
            />{" "}
            <div className="ml-1">Capture</div>
          </button>
        </div>

        <div>
          <Link href={`/${activeButton}`}>
            <div onClick={(e) => e.preventDefault()}>
              {/* //! -------------------------------- ALL -------------------------------------------- */}
              {activeButton === "All" && (
                <div className="p-2 bg-slate-200 h-full w-full flex-1">
                  {data.map((notification) => (
                    <div
                      key={notification._id}
                      className="mb-8 border border-b-black flex p-2 mt-2"
                    >
                      <div className="p-1">
                        {notification.category && (
                          <div className="w-6 h-6">
                            <Image
                              src={getIconSrc(notification.category)}
                              alt=""
                              width={32}
                              height={20}
                              className="mt-0.5"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col ml-2">
                        <p className="font-semibold">{notification.message}</p>
                        <p className="font-thin">{notification.createdAt}</p>
                      </div>
                    </div>
                  ))}

                  {data.length < transformedData.length && (
                    <button
                      className="text-black mt-2 p-1 bg-orange-400 rounded-md ml-4"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  )}

                  {data.length === 0 && (
                    <div className="text-center text-gray-500">
                      Nothing to show
                    </div>
                  )}
                </div>
              )}

              {/* //! -------------------------------- PROJECT -------------------------------------------- */}

              {activeButton === "Project" && (
                <div className="p-2 bg-slate-200 h-full w-full">
                  {data
                    .filter(
                      (notification: any) => notification.category === "Project"
                    )
                    .map((notification: any) => (
                      <div
                        key={notification._id}
                        className="mb-8 border border-b-black p-2 flex flex-row mt-2"
                      >
                        <div className="p-1">
                          <div className="w-6 h-6">
                            <Image
                              src="/requirediconsforsidebarandheadercomponent/clipboardIcon.svg"
                              alt=""
                              width={32}
                              height={20}
                              className="mt-0.5"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <p className="font-semibold">
                            {notification.message}
                          </p>
                          <p className="font-thin">{notification.createdAt}</p>
                        </div>
                      </div>
                    ))}

                  {data.filter(
                    (notification: any) => notification.category === "Project"
                  ).length === 0 && (
                    <div className="text-center text-gray-500">
                      Nothing to show
                    </div>
                  )}
                </div>
              )}

              {/* //! -------------------------------- ISSUE -------------------------------------------- */}

              {activeButton === "Issue" && (
                <div className="p-2 bg-slate-200 h-full w-full">
                  {data
                    .filter(
                      (notification: any) => notification.category === "Issue"
                    )
                    .map((notification: any) => (
                      <div
                        key={notification._id}
                        className="mb-8 border border-b-black p-2 flex flex-row mt-2"
                      >
                        <div className="p-1">
                          <div className="w-6 h-6">
                            <Image
                              src="/requirediconsforsidebarandheadercomponent/issuesIcon.svg"
                              alt=""
                              width={32}
                              height={20}
                              className="mt-0.5"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col ml-2">
                          <p className="font-semibold">
                            {notification.message}
                          </p>
                          <p className="font-thin">{notification.createdAt}</p>
                        </div>
                      </div>
                    ))}

                  {data.filter(
                    (notification: any) => notification.category === "Issue"
                  ).length === 0 && (
                    <div className="text-center text-gray-500">
                      Nothing to show
                    </div>
                  )}
                </div>
              )}

              {/* //! -------------------------------- TASK -------------------------------------------- */}

              {activeButton === "Task" && (
                <div className="p-2 bg-slate-200 h-full w-full">
                  {data
                    .filter(
                      (notification: any) => notification.category === "Task"
                    )
                    .map((notification: any) => (
                      <div
                        key={notification._id}
                        className="mb-8 border border-b-black p-2 flex flex-row mt-2"
                      >
                        <div className="p-1">
                          <div className="w-6 h-6">
                            <Image
                              src="/requirediconsforsidebarandheadercomponent/fileTextIcon.svg"
                              alt=""
                              width={32}
                              height={20}
                              className="mt-0.5"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col ml-2">
                          <p className="font-semibold">
                            {notification.message}
                          </p>
                          <p className="font-thin">{notification.createdAt}</p>
                        </div>
                      </div>
                    ))}

                  {data.filter(
                    (notification: any) => notification.category === "Task"
                  ).length === 0 && (
                    <div className="text-center text-gray-500">
                      Nothing to show
                    </div>
                  )}
                </div>
              )}
              {/* //! --------------------------- CAPTURE --------------------------------- */}

              {activeButton === "Capture" && (
                <div className="p-2 bg-slate-200 h-full w-full">
                  {data
                    .filter(
                      (notification: any) => notification.category === "Capture"
                    )
                    .map((notification: any) => (
                      <div
                        key={notification._id}
                        className="mb-8 border border-b-black p-2 flex flex-row mt-2"
                      >
                        <div className="p-2">
                          <Image
                            src="/requirediconsforsidebarandheadercomponent/cameraIcon.svg"
                            alt=""
                            width={32}
                            height={20}
                            className="mt-0.5"
                          />
                        </div>
                        <p>{notification.message}</p>
                      </div>
                    ))}

                  {data.filter(
                    (notification: any) => notification.category === "Capture"
                  ).length === 0 && (
                    <div className="text-center text-gray-500">
                      Nothing to show
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        </div>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
