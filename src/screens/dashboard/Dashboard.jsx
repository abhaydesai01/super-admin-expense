import { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { BsBank } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import ReusableTable from "../../components/reusable/Table";
import IconButton from "@mui/material/IconButton";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const columns = [
  { id: "companyName", label: "Company Name", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "domain", label: "Domain", sortable: false },
  { id: "onboardedBy", label: "Onboarded By", sortable: true },
  { id: "employees", label: "Employees", align: "right", sortable: false },
  { id: "contactNo", label: "Contact No", align: "right", sortable: false },
  { id: "status", label: "Status", sortable: false },
  { id: "edit", label: "Edit", align: "center", sortable: false },
];

const dummyData = [
  {
    id: 1,
    companyName: "Tech Solutions",
    email: "contact@techsolutions.com",
    domain: "techsolutions.com",
    onboardedBy: "John Doe",
    employees: 150,
    contactNo: "+1234567890",
    status: "Active",
  },
  {
    id: 2,
    companyName: "Health Corp",
    email: "info@healthcorp.com",
    domain: "healthcorp.com",
    onboardedBy: "Jane Smith",
    employees: 75,
    contactNo: "+0987654321",
    status: "Inactive",
  },
  {
    id: 3,
    companyName: "Edu World",
    email: "support@eduworld.com",
    domain: "eduworld.com",
    onboardedBy: "Robert Brown",
    employees: 250,
    contactNo: "+1122334455",
    status: "Active",
  },
];

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = dummyData.filter((item) => {
    return (
      (selectedDomain === "" || item.domain === selectedDomain) &&
      (searchQuery === "" ||
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase()))
    );
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
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-row justify-between items-center w-full">
          <div>
            <h1 className="text-lg md:text-xl font-semibold">Hi,Super Admin</h1>
            <p className="text-gray-600 mt-1">Welcome back to your dashboard</p>
          </div>
          {/* <div className="flex flex-row justify-center items-center gap-x-2 border-2 p-1 border-gray-200 rounded-lg">
            <p
              onClick={() => handleUserRole("corporateAdmin")}
              className={`px-2 py-1 rounded-md w-40 text-center hover:cursor-pointer ${
                userSelectedRole === "corporateAdmin"
                  ? "bg-custom-blue text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Corporate Admin
            </p>
            <p
              onClick={() => handleUserRole("superAdmin")}
              className={`px-2 py-1 rounded-md w-40 text-center hover:cursor-pointer ${
                userSelectedRole === "superAdmin"
                  ? "bg-custom-blue text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Super Admin
            </p>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1em] md:gap-[2em] mt-[1em] md:mt-[2em] mb-[1em] md:mb-[2em] w-full">
          <div className="px-6 py-6 rounded-lg border-l-4 border-custom-blue w-full flex flex-row justify-between items-center gap-x-[9em] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm text-gray-500">Total Organisations</p>
              <p className="text-3xl font-semibold">298</p>
            </div>
            <p className="text-custom-blue bg-blue-100 px-3 py-3 rounded-lg">
              <BsBank size={22} />
            </p>
          </div>

          <div className="px-6 py-6 rounded-lg border-l-4 border-custom-blue flex flex-row justify-between items-center gap-x-[9em] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm text-gray-500">Total Expense Cards</p>
              <p className="text-3xl font-semibold">35</p>
            </div>
            <p className="text-custom-blue bg-blue-100 px-3 py-3 rounded-lg">
              <CiCreditCard1 size={22} />
            </p>
          </div>

          <div className="px-6 py-6 rounded-lg border-l-4 border-custom-blue flex flex-row justify-between items-center gap-x-[9em] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm text-gray-500">Total Expense Amount</p>
              <p className="text-3xl font-semibold">
                <span className="text-sm pr-1">AED</span>298
              </p>
            </div>
            <p className="text-custom-blue bg-blue-100 px-3 py-3 rounded-lg">
              <CiWallet size={22} />
            </p>
          </div>
        </div>

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
              <option value="techsolutions.com">techsolutions.com</option>
              <option value="healthcorp.com">healthcorp.com</option>
              <option value="eduworld.com">eduworld.com</option>
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
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            />
            <span className="absolute right-2 top-9 transform translate-y-[-50%] text-gray-400">
              <IoSearchOutline />
            </span>
          </div>
        </div>

        <ReusableTable
          columns={columns}
          data={filteredData}
          customRender={customRender}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePageChange={(_, newPage) => setPage(newPage)}
          handleRowsPerPageChange={(event) =>
            setRowsPerPage(+event.target.value)
          }
          onSort={handleSort}
        />
      </div>
    </>
  );
};

export default Dashboard;
