import React, { useEffect, useMemo, useState } from "react";
import {
  HeaderGroup,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { format } from "date-fns";
import { debounce } from "lodash";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  role: string;
  gender: string;
  dob: string;
}

interface Columns {
  Header: string;
  accessor: string;
  // Filter: typeof ColumnFilter;
  disableFilters?: true;
}

const ShowTable = ({
  DATA,
  setColumnFilter,
  columnFilter,
}: {
  DATA: UserData[];
}) => {
  const COLUMNS: Columns[] = [
    {
      Header: "Employee Id",
      accessor: "id",
      // Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "First Name",
      accessor: "firstName",
      // Filter: ColumnFilter,
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      // Filter: ColumnFilter,
    },
    {
      Header: "Email",
      accessor: "email",
      // Filter: ColumnFilter,
    },
    {
      Header: "Gender",
      accessor: "gender",
      // Filter: ColumnFilter,
    },
    {
      Header: "contact No",
      accessor: "contactNo",
      // Filter: ColumnFilter,
    },
    {
      Header: "Role",
      accessor: "role",
      // Filter: ColumnFilter,
    },
    {
      Header: "D.O.B",
      accessor: "dob",
      // Filter: ColumnFilter,
      Cell: ({ value }: { value: string }) => {
        // Format the date string to 'yyyy-MM-dd'
        const formattedDate = format(new Date(value), "yyyy-MM-dd");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  console.log(DATA);
  const setColumnFilterDebounce = debounce(setColumnFilter, 300);

  const columns: Columns[] = useMemo(() => COLUMNS, []);
  const data: UserData[] = useMemo(() => DATA, [DATA]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<UserData>(
      {
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  const handleChangeInColumn = (e, name) => {
    setColumnFilterDebounce((prev) => ({
      ...prev,
      [name]: String(e.target.value).trim(),
    }));
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup.getHeaderGroupProps()['key']}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="py-2 px-2 border-b text-left"
                    key={column.getHeaderProps()['key']}
                  >
                    {column.render("Header")}
                    {column?.id !== "dob" && (
                      <input
                        type="text"
                        name={`${column?.id}`}
                        onChange={(e) => handleChangeInColumn(e, column?.id)}
                        placeholder={`Search ${column.render("Header")}`}
                        className="w-[150px] block px-2 py-1 text-sm border rounded outline-none"
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.getRowProps()["key"]}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={cell.getCellProps()["key"]}
                        className="py-2 px-2 border-b"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowTable;
