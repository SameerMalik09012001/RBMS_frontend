import React, { useContext, useMemo } from "react";
import { HeaderGroup, useTable } from "react-table";
import UserContext from "../../contextAPI/userContextAPi";

interface Columns {
  Header: string;
  accessor: string;
  Cell?: Function;
  disableFilters?: true;
}

const showTable = ({ DATA, handleSalaryChange }) => {
  const COLUMNS: Columns[] = [
    {
      Header: "Id",
      accessor: "id",
      // Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Salary",
      accessor: "salary",
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ cell }: any) => (
        <button
          onClick={() => handleSalaryChange(cell)}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Edit Salary
        </button>
      ),
    },
  ];

  const columns: Columns[] = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);

  const { user, setUser } = useContext(UserContext);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full bg-white">
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr key={headerGroup.getHeaderGroupProps()['key']}>
        {headerGroup.headers.map((column) => (
          <th
            className="py-4 px-10 border-b text-left"
            key={column.getHeaderProps()['key']}
          >
            {column.render("Header")}
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row);
      return (
        <tr key={row.getRowProps()['key']}>
          {row.cells.map((cell) => (
            <td
              key={cell.getCellProps()['key']}
              className="py-2 px-10 border-b"
            >
              {cell.render("Cell")}
            </td>
          ))}
        </tr>
      );
    })}
  </tbody>
</table>

    </div>
  );
};

export default showTable;
