import { useState } from "react";
import ReusableButton from "../../components/reusable/Button";
import ReusableInput from "../../components/reusable/InputField";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const AddBranches = ({ onBack }) => {
  const [branches, setBranches] = useState([
    { id: 1, name: "", country: "", city: "", pincode: "" },
  ]);

  const handleAddBranch = () => {
    setBranches([
      ...branches,
      { id: branches.length + 1, name: "", country: "", city: "", pincode: "" },
    ]);
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const handleChange = (id, field, value) => {
    const updatedBranches = branches.map((branch) =>
      branch.id === id ? { ...branch, [field]: value } : branch
    );
    setBranches(updatedBranches);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <IoArrowBackOutline
            size={24}
            className="cursor-pointer"
            onClick={onBack}
          />
          <h1 className="ml-4 text-2xl font-semibold">Add Branch</h1>
        </div>
      </div>

      {branches.map((branch, index) => (
        <div key={branch.id} className="flex items-center mb-4 gap-4">
          <ReusableInput
            label="Name"
            value={branch.name}
            onChange={(e) => handleChange(branch.id, "name", e.target.value)}
          />
          <ReusableInput
            label="Country"
            value={branch.country}
            onChange={(e) => handleChange(branch.id, "country", e.target.value)}
          />
          <ReusableInput
            label="City"
            value={branch.city}
            onChange={(e) => handleChange(branch.id, "city", e.target.value)}
          />
          <ReusableInput
            label="Pincode"
            value={branch.pincode}
            onChange={(e) => handleChange(branch.id, "pincode", e.target.value)}
          />
          <IoTrashOutline
            size={80}
            className="text-red-500 cursor-pointer pt-2"
            onClick={() => handleDeleteBranch(branch.id)}
          />
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          className="flex items-center text-green-600 text-sm font-medium"
          onClick={handleAddBranch}
        >
          <span>
            <GoPlus size={20} />
          </span>
          Add More Branches
        </button>
        <div className="flex flex-row items-center gap-x-2">
          <ReusableButton outlined={true}>Cancel</ReusableButton>
          <ReusableButton outlined={false}>Save Branches</ReusableButton>
        </div>
      </div>
    </div>
  );
};

export default AddBranches;
