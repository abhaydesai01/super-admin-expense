import { useState } from "react";
import ReusableTable from "../../components/reusable/Table";
import ReusableButton from "../../components/reusable/Button";
import ReusableModal from "../../components/reusable/Modal";
import ReusableInput from "../../components/reusable/InputField";
import IconButton from "@mui/material/IconButton";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const TeamAndMembers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("users");

  const userRole = localStorage.getItem("userRole");

  const columns = [
    {
      id: selectedTab === "users" ? "userId" : "teamId",
      label: selectedTab === "users" ? "User ID" : "Team ID",
      sortable: true,
    },
    { id: "email", label: "Email Address", sortable: true },
    { id: "firstName", label: "First Name", sortable: true },
    { id: "lastName", label: "Last Name", sortable: true },
    { id: "userRole", label: "User Role", sortable: true },
    { id: "addedBy", label: "Added By", sortable: true },
    {
      id: "status",
      label: "Status",
      sortable: false,
      format: (value) => (
        <div className="flex items-center gap-1">
          {value === "Active" ? (
            <>
              <BsCheckCircle size={18} color="#22B470" />
              <span style={{ color: "#22B470" }}>Active</span>
            </>
          ) : (
            <>
              <BsXCircle size={18} color="#E53E3E" />
              <span style={{ color: "#E53E3E" }}>Inactive</span>
            </>
          )}
        </div>
      ),
    },
    {
      id: "edit",
      label: "Edit",
      align: "center",
      sortable: false,
      format: () => (
        <div>
          <IconButton style={{ color: "black" }}>
            <FaEye size={16} />
          </IconButton>
          <IconButton style={{ color: "black" }}>
            <FaPencilAlt size={16} />
          </IconButton>
        </div>
      ),
    },
  ];

  const userData = [
    {
      userId: "USR001",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      userRole: "Manager",
      addedBy: "Admin",
      status: "Active",
    },
    {
      userId: "USR002",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      userRole: "Employee",
      addedBy: "Admin",
      status: "Inactive",
    },
  ];

  const teamData = userData.map((user) => ({
    ...user,
    teamId: user.userId.replace("USR", "TEAM"),
  }));

  const handleAddNewUser = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData =
    selectedTab === "users"
      ? userData.filter(
          (item) =>
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : teamData.filter(
          (item) =>
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const renderTabs = () => (
    <div className="relative flex items-center w-full gap-4 mb-4">
      <button
        className={`py-1 ${
          selectedTab === "users"
            ? "border-b-[3px] border-green-500 text-green-500"
            : "text-gray-500"
        }`}
        onClick={() => setSelectedTab("users")}
      >
        Users
      </button>
      <button
        className={`py-1 ${
          selectedTab === "teams"
            ? "border-b-[3px] border-green-500 text-green-500"
            : "text-gray-500"
        }`}
        onClick={() => setSelectedTab("teams")}
      >
        Teams
      </button>
      <p className="absolute bottom-0 w-full h-[2px] -z-[1] bg-gray-200"></p>
    </div>
  );

  const getStatusStyles = (status) => ({
    backgroundColor: status === "Active" ? "#DFF0EA" : "#f8d7da",
    color: status === "Active" ? "#22B470" : "#721c24",
    borderRadius: "4px",
    padding: "4px 8px",
    textAlign: "center",
    fontWeight: "bold",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            {selectedTab === "users" ? "Users" : "Teams"}
          </h2>
          <p className="text-sm text-gray-500 pt-1">
            List of all {selectedTab === "users" ? "users" : "teams"}
          </p>
        </div>
        <ReusableButton
          outlined={false}
          icon={<GoPlus size={20} />}
          onClick={handleAddNewUser}
        >
          {selectedTab === "users" ? "Create User" : "Create Team"}
        </ReusableButton>
      </div>

      {userRole === "corporateAdmin" && renderTabs()}

      <div className="relative w-full mb-4">
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

      <ReusableTable
        columns={columns}
        data={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        customRender={{
          status: (status) => (
            <span style={getStatusStyles(status)}>{status}</span>
          ),
          edit: () => (
            <div>
              <IconButton style={{ color: "black" }}>
                <FaEye size={16} />
              </IconButton>
              <IconButton style={{ color: "black" }}>
                <FaPencilAlt size={16} />
              </IconButton>
            </div>
          ),
        }}
      />

      {isModalOpen && (
        <ReusableModal
          open={isModalOpen}
          onClose={handleModalClose}
          heading={`Add New User`}
          submitText="Save"
          cancelText="Cancel"
          onSubmit={handleModalClose}
        >
          <div className="grid grid-cols-3 gap-x-4">
            <div className="col-span-3 flex gap-4">
              <ReusableInput label="First Name" placeholder="First Name" />
              <ReusableInput label="Last Name" placeholder="Last Name" />
              <div className="flex gap-2 w-full">
                <div className="w-24">
                  <ReusableInput
                    label="Select"
                    placeholder="Currency"
                    type={"select"}
                    options={[
                      { label: "INR", value: "INR" },
                      { label: "AED", value: "AED" },
                    ]}
                  />
                </div>
                <ReusableInput
                  label="Expense Limit"
                  placeholder="Expense Limit"
                />
              </div>
            </div>

            <div className="col-span-3 flex gap-4">
              <div className="flex gap-2 w-full">
                <div className="w-24">
                  <ReusableInput
                    label="Select"
                    placeholder="Code"
                    type={"select"}
                    options={[
                      { label: "+91", value: "+91" },
                      { label: "+971", value: "+971" },
                    ]}
                  />
                </div>
                <ReusableInput
                  label="Mobile Number"
                  placeholder="Mobile Number"
                />
              </div>
              <ReusableInput
                label="Email Address"
                placeholder="Email Address"
              />
            </div>

            <div className="col-span-3 flex gap-4">
              <ReusableInput
                label="Organization"
                placeholder="Select Organization"
                type={"select"}
                options={[{ label: "organisation", value: "+91" }]}
              />
              <ReusableInput
                label="Role"
                placeholder="Select Role"
                type={"select"}
                options={[{ label: "role", value: "+91" }]}
              />
              <ReusableInput
                label="Country"
                placeholder="Select Country"
                type={"select"}
                options={[{ label: "country", value: "" }]}
              />
            </div>
            <div className="col-span-3">
              <ReusableInput
                label="Select Policy"
                placeholder="Policy"
                type={"select"}
                options={[{ label: "policy", value: "" }]}
              />
            </div>
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default TeamAndMembers;
