// import { useState } from "react";
// import { GoPlus } from "react-icons/go";
// import ReusableTable from "../../components/reusable/Table";
// import IconButton from "@mui/material/IconButton";
// import { FaPencilAlt } from "react-icons/fa";
// import ReusableButton from "../../components/reusable/Button";
// import { IoSearchOutline } from "react-icons/io5";

// const columns = [
//   { id: "Name", label: "Name", sortable: true, minWidth: 500 },
//   { id: "status", label: "Status", sortable: false, minWidth: 100, width: 100 },
//   {
//     id: "edit",
//     label: "Edit",
//     align: "center",
//     sortable: false,
//     minWidth: 100,
//     width: 100,
//   },
// ];

// const dummyData = [
//   {
//     id: 1,
//     Name: "Medical",
//     status: "Active",
//   },
//   {
//     id: 2,
//     Name: "Travel",
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     Name: "Food",
//     status: "Active",
//   },
// ];

// const Dashboard = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedDomain, setSelectedDomain] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const getStatusStyles = (status) => ({
//     backgroundColor: status === "Active" ? "#DFF0EA" : "#f8d7da",
//     color: status === "Active" ? "#22B470" : "#721c24",
//     borderRadius: "4px",
//     padding: "4px 8px",
//     textAlign: "center",
//     fontWeight: "bold",
//   });

//   const handleSort = (columnId) => {
//     console.log("Sorting by", columnId);
//   };

//   const handleDomainChange = (event) => {
//     setSelectedDomain(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredData = dummyData.filter((item) => {
//     return (
//       (selectedDomain === "" || item.Name === selectedDomain) &&
//       (searchQuery === "" ||
//         item.Name.toLowerCase().includes(searchQuery.toLowerCase()))
//     );
//   });

//   const customRender = {
//     status: (status) => <span style={getStatusStyles(status)}>{status}</span>,
//     edit: () => (
//       <>
//         <IconButton style={{ color: "black" }}>
//           <FaPencilAlt size={16} />
//         </IconButton>
//       </>
//     ),
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-start items-start w-full">
//         <div className="flex flex-row justify-between items-center w-full">
//           <div>
//             <h1 className="text-2xl font-semibold">Spend Categories</h1>
//             <p className="text-gray-600 mt-1 mb-6">
//               List of all categories available
//             </p>
//           </div>
//           <div>
//             <ReusableButton outlined={false} icon={<GoPlus size={18} />}>
//               Add Category
//             </ReusableButton>
//           </div>
//         </div>

//         <div className="flex flex-row gap-4 mt-4 mb-4 w-full">
//           <div>
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Domain
//             </label>
//             <select
//               value={selectedDomain}
//               onChange={handleDomainChange}
//               className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
//             >
//               <option value="">All Domains</option>
//               <option value="Medical">Medical</option>
//               <option value="Travel">Travel</option>
//               <option value="Food">Food</option>
//             </select>
//           </div>

//           <div className="relative w-full">
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Search
//             </label>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder="Search"
//               className="px-8 border border-gray-300 rounded-md p-2 w-full focus:outline-none"
//             />
//             <span className="absolute bottom-3 left-2">
//               <IoSearchOutline className="text-gray-400" size={18} />
//             </span>
//           </div>
//         </div>

//         <ReusableTable
//           columns={columns}
//           data={filteredData}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           setPage={setPage}
//           setRowsPerPage={setRowsPerPage}
//           onSort={handleSort}
//           customRender={customRender}
//         />
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import { GoPlus } from "react-icons/go";
import ReusableTable from "../../components/reusable/Table";
import IconButton from "@mui/material/IconButton";
import { FaPencilAlt } from "react-icons/fa";
import ReusableButton from "../../components/reusable/Button";
import ReusableModal from "../../components/reusable/Modal";
import ReusableInput from "../../components/reusable/InputField";
import { IoSearchOutline } from "react-icons/io5";

// Define the columns for the table
const columns = [
  { id: "Name", label: "Name", sortable: true, minWidth: 120 },
  { id: "Policy_ID", label: "Policy ID", sortable: true, minWidth: 150 },
  { id: "category", label: "Category", sortable: true, minWidth: 150 },
  { id: "subCategory", label: "Sub-Category", sortable: true, minWidth: 150 },
  { id: "status", label: "Status", sortable: false, minWidth: 100 },
  {
    id: "edit",
    label: "Edit",
    align: "center",
    sortable: false,
    minWidth: 100,
  },
];

// Initial dummy data with category and sub-category
const dummyData = [
  {
    id: 1,
    Name: "Medical",
    Policy_ID: "POL001",
    category: "Salaries and Wages",
    subCategory: "Employee salaries",
    status: "Active",
  },
  {
    id: 2,
    Name: "Travel",
    Policy_ID: "POL002",
    category: "Travel and Entertainment",
    subCategory: "Business travel expenses",
    status: "Inactive",
  },
  {
    id: 3,
    Name: "Food",
    Policy_ID: "POL003",
    category: "Office Supplies and Equipment",
    subCategory: "Stationery",
    status: "Active",
  },
];

// Define the categories and their sub-categories
const categories = [
  {
    domain: "Salaries and Wages",
    subCategories: ["Employee salaries", "Bonuses", "Overtime pay", "Payroll taxes", "Employee benefits"],
  },
  {
    domain: "Travel and Entertainment",
    subCategories: ["Business travel expenses", "Entertainment"],
  },
  {
    domain: "Office Supplies and Equipment",
    subCategories: ["Stationery", "Computers", "Office furniture"],
  },
  {
    domain: "Maintenance and Repairs",
    subCategories: ["Office maintenance", "Equipment repairs", "IT maintenance and support"],
  },
  {
    domain: "Software and Subscriptions",
    subCategories: ["Software licenses", "Subscriptions to online tools", "Cloud services"],
  },
];

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const getStatusStyles = (status) => ({
    backgroundColor: status === "Active" ? "#DFF0EA" : "#f8d7da",
    color: status === "Active" ? "#22B470" : "#721c24",
    borderRadius: "4px",
    padding: "4px 8px",
    textAlign: "center",
    fontWeight: "bold",
  });

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
    setSelectedSubCategory(""); // Reset sub-category when domain changes
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      (selectedDomain === "" || item.category === selectedDomain) &&
      (selectedSubCategory === "" || item.subCategory === selectedSubCategory) &&
      (searchQuery === "" || item.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Handle clicking the edit button
  const handleEditClick = (item) => {
    setEditItem({ ...item }); // Ensure the editItem is fully populated with the row's data
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Handle adding a new category
  const handleAddClick = () => {
    setEditItem({ Name: "", Policy_ID: "", category: "", subCategory: "", status: "Active" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditItem(null); // Reset the edit item
  };

  // Handle input change for form fields
  const handleInputChange = (e, key) => {
    setEditItem({ ...editItem, [key]: e.target.value });
  };

  // Save the changes for either adding or editing
  const handleSave = () => {
    if (isEditMode) {
      // Update the existing row
      setData((prevData) =>
        prevData.map((item) => (item.id === editItem.id ? editItem : item))
      );
    } else {
      // Add a new row
      setData((prevData) => [
        ...prevData,
        { ...editItem, id: prevData.length + 1 },
      ]);
    }
    handleModalClose(); // Close the modal after saving
  };

  const customRender = {
    status: (status) => <span style={getStatusStyles(status)}>{status}</span>,
    edit: (row) => (
      <IconButton onClick={() => handleEditClick(row)} style={{ color: "black" }}>
        <FaPencilAlt size={16} />
      </IconButton>
    ),
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-semibold">Spend Categories</h1>
            <p className="text-gray-600 mt-1 mb-6">List of all categories available</p>
          </div>
          <div>
            <ReusableButton outlined={false} icon={<GoPlus size={18} />} onClick={handleAddClick}>
              Add Category
            </ReusableButton>
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
              {categories.map((category) => (
                <option key={category.domain} value={category.domain}>
                  {category.domain}
                </option>
              ))}
            </select>
          </div>

          {selectedDomain && (
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Sub-Category
              </label>
              <select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
              >
                <option value="">All Sub-Categories</option>
                {categories
                  .find((category) => category.domain === selectedDomain)
                  ?.subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
              </select>
            </div>
          )}

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

        <ReusableTable
          columns={columns}
          data={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          customRender={customRender}
        />
      </div>

      {/* Modal for Adding/Editing */}
      {isModalOpen && (
        <ReusableModal
          open={isModalOpen}
          onClose={handleModalClose}
          heading={isEditMode ? "Edit Category" : "Add Category"}
          submitText="Save"
          cancelText="Cancel"
          onSubmit={handleSave}
        >
          <ReusableInput
            label="Name"
            value={editItem?.Name || ""}
            onChange={(e) => handleInputChange(e, "Name")}
          />
          <ReusableInput
            label="Policy ID"
            value={editItem?.Policy_ID || ""}
            onChange={(e) => handleInputChange(e, "Policy_ID")}
          />

          {/* Dropdown for Category */}
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Category
          </label>
          <select
            value={editItem?.category || ""}
            onChange={(e) => handleInputChange(e, "category")}
            className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.domain} value={category.domain}>
                {category.domain}
              </option>
            ))}
          </select>

          {/* Dropdown for Sub-Category */}
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Sub-Category
          </label>
          <select
            value={editItem?.subCategory || ""}
            onChange={(e) => handleInputChange(e, "subCategory")}
            className="border border-gray-300 text-gray-400 rounded-md p-2 focus:outline-none"
          >
            <option value="">Select Sub-Category</option>
            {categories
              .find((cat) => cat.domain === editItem?.category)
              ?.subCategories.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
          </select>

          <ReusableInput
            label="Status"
            value={editItem?.status || ""}
            onChange={(e) => handleInputChange(e, "status")}
          />
        </ReusableModal>
      )}
    </>
  );
};

export default Dashboard;
