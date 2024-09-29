import { useState } from "react";
import ExpenseTable from "./ExpenseTable";
import ReusableInput from "../../components/reusable/InputField";
import ReusableButton from "../../components/reusable/Button";
import ReusableModal from "../../components/reusable/Modal";
import { FaPlus } from "react-icons/fa";

const ExpensesTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-semibold text-xl tracking-wide">Expenses</h1>
          <p className="text-gray-400 text-sm mt-1">
            List of all expenses available
          </p>
        </div>
      </div>

      <ExpenseTable />

      {isModalOpen && (
        <ReusableModal
          open={() => setModalOpen(true)}
          onClose={handleModalClose}
          heading="Create New Expense"
        >
          <form className="grid grid-cols-2 gap-4">
            <ReusableInput label="Bill Date" type="date" />
            <ReusableInput
              label="Category"
              type="select"
              options={[
                "Travel",
                "Meals",
                "Accommodation",
                "Supplies",
                "Software",
                "Entertainment",
              ]}
            />
            <ReusableInput label="Actual Currency" type="number" />
            <ReusableInput label="VAT Amount" type="number" />
            <ReusableInput label="Total Amount" type="number" />
            <ReusableInput label="TRN" type="text" />
            <div className="col-span-2">
              <ReusableInput label="Upload Receipt" type="file" />
            </div>
            <ReusableInput label="Add Note" type="text" />
          </form>
        </ReusableModal>
      )}
    </>
  );
};

export default ExpensesTable;
