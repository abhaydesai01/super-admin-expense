import { useState } from "react";
import ReusableTable from "../../components/reusable/Table";
import IconButton from "@mui/material/IconButton";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import ReusableButton from "../../components/reusable/Button";
import ReusableModal from "../../components/reusable/Modal";
import ReusableInput from "../../components/reusable/InputField";
import { IoSearchOutline } from "react-icons/io5";

const Policies = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const policiesColumns = [
    { id: "employeeLevel", label: "Employee Level", sortable: true },
    { id: "claimPeriod", label: "Claim Period", sortable: true },
    { id: "excessLimit", label: "Excess Limit (%)", sortable: false },
    { id: "dailyLimit", label: "Daily Limit", sortable: false },
    { id: "monthlyLimit", label: "Monthly Limit", sortable: false },
    { id: "createdBy", label: "Created By", sortable: true },
    {
      id: "status",
      label: "Status",
      sortable: false,
      format: (value) => (
        <span style={{ color: value === "Active" ? "green" : "red" }}>
          {value}
        </span>
      ),
    },
    {
      id: "edit",
      label: "Edit",
      align: "center",
      sortable: false,
      format: () => (
        <>
          <IconButton style={{ color: "black" }}>
            <FaEye size={16} />
          </IconButton>
          <IconButton style={{ color: "black" }}>
            <FaPencilAlt size={16} />
          </IconButton>
        </>
      ),
    },
  ];

  const policiesData = [
    {
      id: 1,
      employeeLevel: "Manager",
      claimPeriod: "Quarterly",
      excessLimit: "5%",
      dailyLimit: "AED 300",
      monthlyLimit: "AED 9000",
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: 2,
      employeeLevel: "Senior Developer",
      claimPeriod: "Monthly",
      excessLimit: "10%",
      dailyLimit: "AED 200",
      monthlyLimit: "AED 6000",
      createdBy: "HR",
      status: "Inactive",
    },
    {
      id: 3,
      employeeLevel: "Intern",
      claimPeriod: "Monthly",
      excessLimit: "0%",
      dailyLimit: "AED 50",
      monthlyLimit: "AED 1500",
      createdBy: "Admin",
      status: "Active",
    },
  ];

  const handleSort = (columnId) => {
    console.log("Sorting by", columnId);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const filteredData = policiesData.filter((item) => {
    return (
      (selectedDomain === "" || item.claimPeriod === selectedDomain) &&
      (searchQuery === "" ||
        item.claimPeriod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.employeeLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excessLimit.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const getStatusStyles = (status) => ({
    backgroundColor: status === "Active" ? "#DFF0EA" : "#f8d7da",
    color: status === "Active" ? "#22B470" : "#721c24",
    borderRadius: "4px",
    padding: "4px 8px",
    textAlign: "center",
    fontWeight: "bold",
  });

  const customRender = {
    status: (status) => <span style={getStatusStyles(status)}>{status}</span>,
    edit: () => (
      <>
        <IconButton style={{ color: "black" }}>
          <FaEye size={16} />
        </IconButton>
        <IconButton style={{ color: "black" }}>
          <FaPencilAlt size={16} />
        </IconButton>
      </>
    ),
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-wide">Policies</h2>
          <p className="text-sm text-gray-500 pt-1">
            List of all policies available
          </p>
        </div>
        <div>
          <ReusableButton
            outlined={false}
            icon={<GoPlus size={20} />}
            onClick={handleModalOpen}
          >
            Add New Policies
          </ReusableButton>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4 mb-4 w-full">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Categories
          </label>
          <select
            value={selectedDomain}
            onChange={handleDomainChange}
            className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
          >
            <option value="">All</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
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
            placeholder="Search"
            className="px-8 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
          <span className="absolute bottom-3 left-2">
            <IoSearchOutline className="text-gray-400" size={18} />
          </span>
        </div>
      </div>

      <div className="mt-6">
        <ReusableTable
          columns={policiesColumns}
          data={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          onSort={handleSort}
          customRender={customRender}
        />
      </div>

      {isModalOpen && (
        <ReusableModal
          open={isModalOpen}
          onClose={handleModalClose}
          heading="Add New Policy"
          submitText="Save"
          cancelText="Cancel"
          onSubmit={handleModalClose}
        >
          <div className="grid grid-cols-2 gap-x-4">
            <ReusableInput
              label="Policy Name"
              placeholder="Enter Policy Name"
            />
            <ReusableInput
              label="Employee Level"
              placeholder="Enter Employee Level"
            />
            <ReusableInput
              label="Claim Period"
              placeholder="Enter Claim Period"
            />
            <ReusableInput
              label="Status"
              placeholder="Select Status"
              type="select"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
            <ReusableInput label="Excess Limit" placeholder="Excess Limit" />
            <ReusableInput label="Daily Limit" placeholder="Daily Limit" />
            <ReusableInput label="Monthly Limit" placeholder="Monthly Limit" />
            <ReusableInput label="Created By" placeholder="Created By" />
          </div>
        </ReusableModal>
      )}
    </>
  );
};

export default Policies;
