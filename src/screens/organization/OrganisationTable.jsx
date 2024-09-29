import { useState } from "react";
import ReusableModal from "../../components/reusable/Modal";
import ReusableInput from "../../components/reusable/InputField";
import ReusableTable from "../../components/reusable/Table";
import IconButton from "@mui/material/IconButton";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const OrganisationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const organizationColumns = [
    { id: "orgName", label: "Organization Name", sortable: true },
    { id: "email", label: "Email", sortable: true },
    { id: "industry", label: "Industry", sortable: false },
    { id: "employees", label: "Employees", align: "right", sortable: false },
    { id: "contactNo", label: "Contact No", align: "right", sortable: false },
    { id: "onboardedBy", label: "Onboarded By", sortable: true }, // New Column
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
      format: (row) => (
        <>
          <IconButton style={{ color: "black" }}>
            <FaEye size={16} />
          </IconButton>
          <IconButton
            style={{ color: "black" }}
            onClick={() => handleEditClick(row)}
          >
            <FaPencilAlt size={16} />
          </IconButton>
        </>
      ),
    },
  ];

  const organizationsData = [
    {
      id: 1,
      orgName: "Tech Innovations",
      email: "contact@techinnovations.com",
      industry: "Technology",
      employees: 250,
      contactNo: "+1234567890",
      onboardedBy: "John Doe",
      status: "Active",
    },
    {
      id: 2,
      orgName: "Health Solutions",
      email: "info@healthsolutions.com",
      industry: "Healthcare",
      employees: 120,
      contactNo: "+0987654321",
      onboardedBy: "Jane Smith",
      status: "Inactive",
    },
    {
      id: 3,
      orgName: "EduTech",
      email: "support@edutech.com",
      industry: "Education",
      employees: 400,
      contactNo: "+1122334455",
      onboardedBy: "Mike Johnson",
      status: "Active",
    },
  ];

  const handleSort = (columnId) => {
    console.log("Sorting by", columnId);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    handleModalClose();
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = organizationsData.filter((item) => {
    return (
      (selectedDomain === "" || item.industry === selectedDomain) &&
      (searchQuery === "" ||
        item.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.industry.toLowerCase().includes(searchQuery.toLowerCase()))
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
    edit: (row) => (
      <>
        <IconButton style={{ color: "black" }}>
          <FaEye size={16} />
        </IconButton>
        <IconButton
          style={{ color: "black" }}
          onClick={() => handleEditClick(row)}
        >
          <FaPencilAlt size={16} />
        </IconButton>
      </>
    ),
  };

  return (
    <>
      <div className="flex flex-row gap-4 mt-4 mb-4 w-full">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Domain
          </label>
          <select
            value={selectedDomain}
            onChange={handleDomainChange}
            className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
          >
            <option value="">All Domains</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
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
      <div>
        <ReusableTable
          columns={organizationColumns}
          data={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          onSort={handleSort}
          customRender={customRender}
        />
      </div>
      <div>
        {isModalOpen && (
          <ReusableModal
            open={isModalOpen}
            onClose={handleModalClose}
            heading={`Edit Company`}
            submitText="Save Changes"
            cancelText="Cancel"
            onSubmit={handleSaveChanges}
            onCancel={handleModalClose}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <ReusableInput
                label="Company Name"
                placeholder="company name"
                value=""
                required
              />
              <ReusableInput
                label="Email Address"
                placeholder="email"
                value=""
                required
              />
              <ReusableInput
                label="Number of Employees"
                placeholder="no of employees"
                value=""
                required
              />
              <ReusableInput
                label="Company Website"
                placeholder="company website"
                type={"select"}
                options={[{ label: "company website", value: "" }]}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-4">
              <ReusableInput label="Country" placeholder="country" value="" />
              <ReusableInput
                label="Domain Name"
                placeholder="domain name"
                type={"select"}
                options={[{ label: "domain", value: "" }]}
              />
              <ReusableInput
                label="Status"
                placeholder="status"
                type={"select"}
                options={[{ label: "status", value: "" }]}
                required
              />
            </div>
          </ReusableModal>
        )}
      </div>
    </>
  );
};

export default OrganisationTable;
