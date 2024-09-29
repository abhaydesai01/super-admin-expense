import { useState } from "react";
import { GoPlus } from "react-icons/go";
import ReusableTable from "../../components/reusable/Table";
import IconButton from "@mui/material/IconButton";
import { FaPencilAlt } from "react-icons/fa";
import ReusableButton from "../../components/reusable/Button";
import { IoSearchOutline } from "react-icons/io5";
import AddApprovals from "./AddApprovals";

const columns = [
  { id: "Department", label: "Department", sortable: true, minWidth: 200 },
  { id: "Designation", label: "Designation", sortable: true, minWidth: 200 },
  {
    id: "Stages",
    label: "No of Approval Stages",
    sortable: true,
    minWidth: 200,
  },
  {
    id: "edit",
    label: "Edit",
    align: "center",
    sortable: false,
    minWidth: 100,
    width: 100,
  },
];

const dummyData = [
  {
    id: 1,
    Department: "HR",
    Designation: "HR Manager",
    Stages: 3,
  },
  {
    id: 2,
    Department: "Finance",
    Designation: "Finance Director",
    Stages: 4,
  },
  {
    id: 3,
    Department: "IT",
    Designation: "IT Head",
    Stages: 2,
  },
];

const Approvals = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingApproval, setIsAddingApproval] = useState(false);

  const handleSort = (columnId) => {
    console.log("Sorting by", columnId);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = dummyData.filter((item) => {
    return (
      (selectedDepartment === "" || item.Department === selectedDepartment) &&
      (searchQuery === "" ||
        item.Designation.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const customRender = {
    edit: () => (
      <IconButton style={{ color: "black" }}>
        <FaPencilAlt size={16} />
      </IconButton>
    ),
  };

  const handleBack = () => {
    setIsAddingApproval(false);
  };

  return (
    <>
      {isAddingApproval ? (
        <AddApprovals onBack={handleBack} />
      ) : (
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div>
              <h1 className="text-2xl font-semibold">Approvals</h1>
              <p className="text-gray-600 mt-1 mb-6">
                List of all approval processes
              </p>
            </div>
            <div>
              <ReusableButton
                outlined={false}
                icon={<GoPlus size={18} />}
                onClick={() => setIsAddingApproval(true)}
              >
                Add Approval
              </ReusableButton>
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-4 mb-4 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
              >
                <option value="">All Departments</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
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
                placeholder="Search by Designation"
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
      )}
    </>
  );
};

export default Approvals;
