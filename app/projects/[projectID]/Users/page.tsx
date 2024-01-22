"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { getToken } from "../../../comp/cookie";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useParams } from "next/navigation";

interface UserData {
  user: {
    _id: string;
    avatar: string;
    fullName: string;
    email: string;
  };
  role: string;
  assignedOn: string;
}

const Users = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();
  const params = useParams<{ projectID: string }>();
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(params.projectID);

  const handleSearchIconClick = () => {
    setSearchActive(true);
  };

  const handleSearchClose = () => {
    setSearchActive(false);
    setSearchTerm("");
    setFilteredData([]); // Reset the filtered data when closing the search
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter the data based on the search term
    const filtered = userData.filter((user) =>
      user.user.fullName.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/Login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dev2.constructn.ai/api/v1/projects/${params.projectID}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sortedData = response.data.result.sort((a: any, b: any) => {
          const dateA = new Date(a.assignedOn).getTime();
          const dateB = new Date(b.assignedOn).getTime();

          if (sortOrder === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });

        setUserData(sortedData);
        setFilteredData(sortedData); // Initialize filteredData with the entire dataset
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const VirtuosoTableComponents: TableComponents<UserData> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed", width: "full" }}
      />
    ),
    TableHead: (props) => (
      <TableHead {...props} sx={{ backgroundColor: "#fff" }} />
    ),
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      <TableCell variant="head" align="left" style={{ width: 200 }}>
        Username
      </TableCell>
      <TableCell variant="head" align="left" style={{ width: 200 }}>
        User Email
      </TableCell>
      <TableCell variant="head" align="left" style={{ width: 200 }}>
        Role
      </TableCell>
      <TableCell variant="head" align="left" style={{ width: 200 }}>
        Assigned On
        <SwapVertIcon
          onClick={toggleSortOrder}
          className="text-orange-400 cursor-pointer"
        >
          Toggle Sort
        </SwapVertIcon>
      </TableCell>
    </TableRow>
  );

  const rowContent = (_index: number, user: UserData) => (
    <React.Fragment>
      <TableCell align="left" style={{ width: 200 }}>
        <div className="flex gap-2">{user.user.fullName}</div>
      </TableCell>
      <TableCell align="left" style={{ width: 200 }}>
        {user.user.email}
      </TableCell>
      <TableCell align="left" style={{ width: 200 }}>
        {user.role}
      </TableCell>
      <TableCell align="left" style={{ width: 200 }}>
        {formatDate(user.assignedOn)}
      </TableCell>
    </React.Fragment>
  );

  return (
    <div className="flex flex-col justify-center mr-4 ml-4">
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-xl font-semibold text-gray-700">Manage Users</h2>
        <div className="flex flex-row gap-6">
          {searchActive ? (
            <div className="border-2 border-slate-300 rounded-md flex hover:border-blue-500">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-md px-2 py-1 focus:border-none focus:outline-none mt-1 border-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Image
                src="/requirediconsforsidebarandheadercomponent/closeWithCircle.svg"
                width={20}
                height={15}
                alt="Search"
                className="mr-2"
                onClick={handleSearchClose}
                style={{ cursor: "pointer" }}
              />
            </div>
          ) : (
            <Image
              src="/requirediconsforsidebarandheadercomponent/search.svg"
              width={25}
              height={25}
              alt="Search"
              onClick={handleSearchIconClick}
              style={{ cursor: "pointer" }}
            />
          )}

          <Image
            src="/requirediconsforsidebarandheadercomponent/UserFilterIcon.svg"
            width={25}
            height={25}
            alt="User Filter"
          />
          <div className="bg-orange-500 text-white px-14 py-2 rounded-md">
            <button>Add User</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between ml-1 mt-4">
        <div className="w-full">
          <Paper
            style={{
              height: "81vh",
              width: "100%",
            }}
          >
            <TableVirtuoso
              data={searchTerm ? filteredData : userData}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Users;
