import { useState } from "react";
import ReusableTable from "../../components/reusable/Table";
import "react-datepicker/dist/react-datepicker.css";

const ExpenseTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const columnsSuperAdmin = [
    { id: "expenseId", label: "Expense ID", minWidth: 100 },
    { id: "expenseDate", label: "Expense Date", minWidth: 120 },
    { id: "category", label: "Category", minWidth: 120 },
    { id: "username", label: "Username", minWidth: 150 },
    { id: "amount", label: "Amount", minWidth: 100, align: "right" },
    { id: "organisation", label: "Organisation", minWidth: 150 },
    { id: "receipt", label: "Receipt", minWidth: 100 }, // Remove onClick here
    { id: "status", label: "Status", minWidth: 100 },
  ];

  const data = [
    {
      expenseId: "EXP001",
      expenseDate: "2024-09-01",
      category: "Travel",
      username: "John Doe",
      amount: "AED200",
      organisation: "ABC Corp",
      receipt: "View",
      status: "Pending",
    },
    {
      expenseId: "EXP002",
      expenseDate: "2024-09-02",
      category: "Meals",
      username: "Jane Smith",
      amount: "AED50",
      organisation: "XYZ Ltd",
      receipt: "View",
      status: "Approved",
    },
    // more data...
  ];

  const filteredData = data.filter((item) => {
    const matchesCategory =
      categoryFilter === "" || item.category === categoryFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.expenseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organisation.toLowerCase().includes(searchQuery.toLowerCase());

    // Additional date filtering logic remains unchanged
    return matchesCategory && matchesSearch;
  });

  const columnStyles = {
    status: (value) => {
      let backgroundColor;
      let textColor;

      if (value === "Pending") {
        backgroundColor = "bg-orange-100";
        textColor = "text-orange-500";
      }

      if (value === "Approved") {
        backgroundColor = "bg-green-100";
        textColor = "text-green-500";
      }

      if (value === "Rejected") {
        backgroundColor = "bg-red-100";
        textColor = "text-red-500";
      }

      return `py-1 px-3 rounded-lg ${backgroundColor} ${textColor} font-bold text-center inline-block min-w-[80px]`;
    },
  };

  const customRender = {
    receipt: (value, row) => (
      <span
        className="underline cursor-pointer text-black"
        onClick={() => {}} // Remove handleRowClick, it's managed by the reusable table
      >
        {value}
      </span>
    ),
    status: (value) => (
      <span className={columnStyles.status(value)}>{value}</span>
    ),
  };

  // Custom rendering for expanded row content
  const renderRow = (row) => {
    return (
      <div className="p-4 bg-gray-100 border-t">
        <p>
          <strong>Expense Details:</strong>
        </p>
        <p>Expense ID: {row.expenseId}</p>
        <p>Category: {row.category}</p>
        <p>Amount: {row.amount}</p>
        <p>Organisation: {row.organisation}</p>
      </div>
    );
  };

  const renderFilters = () => (
    <div className="flex justify-between items-end mb-4 space-x-4">
      {/* Render your filter inputs here */}
    </div>
  );

  return (
    <div>
      {renderFilters()}

      <ReusableTable
        columns={columnsSuperAdmin}
        data={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        customRender={customRender}
        triggerColumn="receipt" // This specifies which column triggers expansion
        renderRow={renderRow} // Pass the content to render when expanded
      />
    </div>
  );
};

export default ExpenseTable;
