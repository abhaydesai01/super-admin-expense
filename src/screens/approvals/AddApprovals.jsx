import { useState } from "react";
import ReusableButton from "../../components/reusable/Button";
import ReusableInput from "../../components/reusable/InputField";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const AddApprovals = ({ onBack }) => {
  const [stages, setStages] = useState([
    { id: 1, branch: "", department: "", employee: "", designation: "" },
  ]);

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        id: stages.length + 1,
        branch: "",
        department: "",
        employee: "",
        designation: "",
      },
    ]);
  };

  const handleDeleteStage = (id) => {
    setStages(stages.filter((stage) => stage.id !== id));
  };

  const handleChange = (id, field, value) => {
    const updatedStages = stages.map((stage) =>
      stage.id === id ? { ...stage, [field]: value } : stage
    );
    setStages(updatedStages);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-start mb-4">
        <IoArrowBackOutline
          size={24}
          className="cursor-pointer"
          onClick={onBack}
        />
        <h1 className="ml-4 text-2xl font-semibold">Approvals</h1>
      </div>

      {stages.map((stage, index) => (
        <div
          key={stage.id}
          className="flex justify-center items-center mb-4 gap-4"
        >
          <ReusableInput
            label="Branch"
            value={stage.branch}
            onChange={(e) => handleChange(stage.id, "branch", e.target.value)}
          />
          <ReusableInput
            label="Department"
            value={stage.department}
            onChange={(e) =>
              handleChange(stage.id, "department", e.target.value)
            }
          />
          <ReusableInput
            label="Employee"
            value={stage.employee}
            onChange={(e) => handleChange(stage.id, "employee", e.target.value)}
          />
          <ReusableInput
            label="Designation"
            value={stage.designation}
            onChange={(e) =>
              handleChange(stage.id, "designation", e.target.value)
            }
          />
          <IoTrashOutline
            size={90}
            className="text-red-500 cursor-pointer pt-4"
            onClick={() => handleDeleteStage(stage.id)}
          />
        </div>
      ))}

      <div className="flex justify-between items-center mt-6">
        <div
          className="text-green-500 cursor-pointer flex items-center"
          onClick={handleAddStage}
        >
          <GoPlus size={18} className="mr-2" />
          <span>Add more stages</span>
        </div>

        <div className="flex gap-4">
          <ReusableButton outlined={false} onClick={() => console.log("Save")}>
            Save this approval
          </ReusableButton>
          <ReusableButton outlined={true} onClick={onBack}>
            Cancel
          </ReusableButton>
        </div>
      </div>
    </div>
  );
};

export default AddApprovals;
