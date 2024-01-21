"use client";
import React, { useEffect, useState } from "react";
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
import { getToken } from "../../comp/cookie";
import { useRouter } from "next/navigation";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">('asc');
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/Login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dev2.constructn.ai/api/v1/projects/PRJ201897/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        

        const sortedData = response.data.result.sort((a: any, b: any) => {
          const dateA = new Date(a.assignedOn).getTime();                       //! Get TimeStamps between the dates start from JAN 1 !970 Unix epoch
          const dateB = new Date(b.assignedOn).getTime();                        

          if (sortOrder === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });

        setUserData(sortedData);
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
        sx={{ borderCollapse: "separate", tableLayout: "fixed" , width:'full' }}
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
        <div className="flex gap-2">
          {/* <Image src={user.user.avatar} width={20} height={10} alt="" className="rounded-lg"></Image> */}
          {user.user.fullName}
        </div>
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
          <Image
            src={"/requirediconsforsidebarandheadercomponent/search.svg"}
            width={25}
            height={25}
            alt="Dashboard Progress"
          />

          <Image
            src={
              "/requirediconsforsidebarandheadercomponent/UserFilterIcon.svg"
            }
            width={25}
            height={25}
            alt="Dashboard Progress"
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
              data={userData}
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

//! eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJVU1I1NjMxNjIiLCJmaXJzdE5hbWUiOiJHYW5lc2giLCJsYXN0TmFtZSI6IlNhbmt1cmF0cmkiLCJlbWFpbCI6ImdhbmVzaC5zYW5rdXJhdHJpQGNvbnN0cnVjdG4uYWkiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc1N1cHBvcnRVc2VyIjpmYWxzZSwibG9naW5UeXBlIjoiY29uc3RydWN0bi1vYXV0aCIsInZlcmlmaWNhdGlvblRpbWVzdGFtcHMiOlsiMjAyNC0wMS0xOFQwNzowNjowMy4xOTdaIl0sInJlc2V0UGFzc3dvcmRUaW1lc3RhbXBzIjpbXSwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMThUMDc6MDY6MDMuMTYxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMTlUMDc6Mjc6NTUuMDc1WiIsIl9fdiI6MSwiZnVsbE5hbWUiOiJHYW5lc2ggU2Fua3VyYXRyaSIsImNhblJlc2VuZFZlcmlmaWNhdGlvbiI6dHJ1ZSwiY2FuUmVzZXRQYXNzd29yZCI6dHJ1ZSwicHJvdmlkZXIiOiJwYXNzd29yZCIsImlhdCI6MTcwNTc1NTkwNywiZXhwIjoxNzA1ODM4NzA3fQ.CGmL6U-K2kqwifJc_iACTg-QPWZSLX5oAcswbtPnn5k
// !https://api.dev2.constructn.ai/api/v1/projects/PRJ201897/users
