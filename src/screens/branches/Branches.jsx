import { useState } from "react";
import ReusableTable from "../../components/reusable/Table";
import IconButton from "@mui/material/IconButton";
import { FaPencilAlt } from "react-icons/fa";
import ReusableButton from "../../components/reusable/Button";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import AddBranches from "./AddBranches";

const columns = [
  { id: "Name", label: "Name", sortable: true, minWidth: 200 },
  { id: "Country", label: "Country", sortable: true, minWidth: 200 },
  { id: "City", label: "City", sortable: true, minWidth: 200 },
  {
    id: "Status",
    label: "Status",
    sortable: true,
    minWidth: 150,
    align: "center",
  },
  {
    id: "Edit",
    label: "Edit",
    sortable: false,
    align: "center",
    minWidth: 100,
    width: 100,
  },
];

const dummyData = [
  {
    id: 1,
    Name: "Branch 1",
    Country: "USA",
    City: "New York",
    Status: "Active",
  },
  {
    id: 2,
    Name: "Branch 2",
    Country: "UK",
    City: "London",
    Status: "Inactive",
  },
  {
    id: 3,
    Name: "Branch 3",
    Country: "India",
    City: "Mumbai",
    Status: "Active",
  },
];

const Branches = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);

  const getStatusStyles = (status) => ({
    backgroundColor: status === "Active" ? "#DFF0EA" : "#f8d7da",
    color: status === "Active" ? "#22B470" : "#721c24",
    borderRadius: "4px",
    padding: "4px 8px",
    textAlign: "center",
    fontWeight: "bold",
  });

  const handleSort = (columnId) => {
    console.log("Sorting by", columnId);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = dummyData.filter((item) => {
    return (
      (selectedCountry === "" || item.Country === selectedCountry) &&
      (searchQuery === "" ||
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const customRender = {
    Status: (status) => <span style={getStatusStyles(status)}>{status}</span>,
    Edit: () => (
      <IconButton style={{ color: "black" }}>
        <FaPencilAlt size={16} />
      </IconButton>
    ),
  };

  const handleAddBranch = () => {
    setIsAddBranchOpen(true);
  };

  const handleBack = () => {
    setIsAddBranchOpen(false);
  };

  return (
    <>
      {!isAddBranchOpen ? (
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div>
              <h1 className="text-2xl font-semibold">Branches</h1>
              <p className="text-gray-600 mt-1 mb-6">List of all branches</p>
            </div>
            <div>
              <ReusableButton
                outlined={false}
                icon={<GoPlus size={18} />}
                onClick={handleAddBranch}
              >
                Add Branches
              </ReusableButton>
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-4 mb-4 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
              >
                <option value="">All Countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
              </select>
            </div>

            <div className="relative w-full">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Branch Name"
                className="px-8 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
              />
              <span className="absolute bottom-3 left-2">
                <IoSearchOutline className="text-gray-400" size={18} />
              </span>
            </div>
          </div>

          <ReusableTable
            columns={columns}
            data={filteredData}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            onSort={handleSort}
            customRender={customRender}
          />
        </div>
      ) : (
        <AddBranches onBack={handleBack} />
      )}
    </>
  );
};

export default Branches;
