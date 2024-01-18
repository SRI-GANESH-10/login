"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Link from "next/link";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerComponent: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Include your authorization logic here
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhY3RpdmUiLCJsb2dpblR5cGUiOiJjb25zdHJ1Y3RuLW9hdXRoIiwicmVzZXRQYXNzd29yZFRpbWVzdGFtcHMiOltdLCJfaWQiOiJVU1I3NDQ4MzYiLCJmaXJzdE5hbWUiOiJWaW5lZXRoIiwibGFzdE5hbWUiOiJjb25zdHJ1Y3ROIiwiZW1haWwiOiJ2aW5lZXRoQGNvbnN0cnVjdG4uYWkiLCJjb250YWN0Ijp7ImNvZGUiOiI1MDAwNDkiLCJudW1iZXIiOjEyMzQ1Njc4OTB9LCJkb2IiOiIyMDI2LTEwLTIyVDAwOjAwOjAwLjAwMFoiLCJ2ZXJpZmllZCI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wMS0yNFQwNzoxOTowNC44MzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wMS0xOFQwOTowNjozOS4zNzJaIiwiX192IjoxLCJpc1N1cHBvcnRVc2VyIjpmYWxzZSwidmVyaWZpY2F0aW9uVGltZXN0YW1wcyI6WyIyMDIzLTA0LTA1VDA3OjA4OjQyLjEwMFoiXSwiZnVsbE5hbWUiOiJWaW5lZXRoIGNvbnN0cnVjdE4iLCJhZ2UiOi0zLCJjYW5SZXNlbmRWZXJpZmljYXRpb24iOnRydWUsImNhblJlc2V0UGFzc3dvcmQiOnRydWUsInByb3ZpZGVyIjoicGFzc3dvcmQiLCJpYXQiOjE3MDU1NzA5ODgsImV4cCI6MTcwNTY1Mzc4OH0.sqZtUnbHIF8NSgoSBZOhSDsr9CZkCF8rYN6nSb0vwvA"; // Replace with your actual access token

        const response = await axios.get(
          "https://api.dev2.constructn.ai/api/v1/user-notifications",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const transformedData = response.data.notifications.map(
          (notification: any) => ({
            _id: notification._id,
            message: notification.message,
            category: notification.category,
            createdAt: new Date(notification.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "UTC",
              }
            ),
          })
        );
        setData(transformedData);
        console.log(transformedData); // Assuming the notifications are under the "notifications" key
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (activeButton) {
      fetchData();
    }
  }, [activeButton]);

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
      // Add more cases for other categories if needed
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
          bottom: 0,
          height: "calc(100vh - 60px)",
        },
      }}
    >
      <Box sx={{ width: 436, height: 583.3 }}>
        <div>
          <div className="flex justify-between border-b-2">
            <span className="p-2">Notifications</span>
            <button className="p-2" onClick={onClose}>
              <HighlightOffIcon />
            </button>
          </div>

          <div className="flex justify-between mt-2 px-2">
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

          <Link href={`/${activeButton}`} passHref>
            <div className="mt-2">
              {/* //! -------------------------------- ALL -------------------------------------------- */}
              {activeButton === "All" && (
                <div className="p-2 bg-slate-200 h-full w-full">
                  {data.map((notification) => (
                    <div
                      key={notification._id}
                      className="mb-8 border border-b-black p-2 flex flex-row mt-2"
                    >
                      <div className="p-2">
                        {notification.category && (
                          <Image
                            src={getIconSrc(notification.category)}
                            alt=""
                            width={32}
                            height={20}
                            className="mt-0.5"
                          />
                        )}
                      </div>
                      <div className="flex flex-col ">
                        <p className="font-semibold">{notification.message}</p>
                        <p className="font-thin">{notification.createdAt}</p>
                      </div>
                    </div>
                  ))}
                  {/* Display message when no notifications are found */}
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
                        <div className="p-2">
                          <Image
                            src="/requirediconsforsidebarandheadercomponent/clipboardIcon.svg"
                            alt=""
                            width={32}
                            height={20}
                            className="mt-0.5"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <p className="font-semibold">
                            {notification.message}
                          </p>
                          <p className="font-thin">{notification.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  {/* Display message when no notifications are found */}
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
                        <div className="p-2">
                          <Image
                            src="/requirediconsforsidebarandheadercomponent/clipboardIcon.svg"
                            alt=""
                            width={32}
                            height={20}
                            className="mt-0.5"
                          />
                        </div>
                        <p>{notification.message}</p>
                      </div>
                    ))}
                  {/* Display message when no notifications are found */}
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
                        <div className="p-2">
                          <Image
                            src="/requirediconsforsidebarandheadercomponent/clipboardIcon.svg"
                            alt=""
                            width={32}
                            height={20}
                            className="mt-0.5"
                          />
                        </div>
                        <p>{notification.message}</p>
                      </div>
                    ))}
                  {/* Display message when no notifications are found */}
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
                            src="/requirediconsforsidebarandheadercomponent/clipboardIcon.svg"
                            alt=""
                            width={32}
                            height={20}
                            className="mt-0.5"
                          />
                        </div>
                        <p>{notification.message}</p>
                      </div>
                    ))}
                  {/* Display message when no notifications are found */}
                  {data.filter(
                    (notification: any) => notification.category === "Capture"
                  ).length === 0 && (
                    <div className="text-center text-gray-500">
                      Nothing to show
                    </div>
                  )}
                </div>
              )}

              {/* Add similar conditions for other categories */}
              {/* ... (similar conditions for other categories) */}
            </div>
          </Link>
        </div>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
