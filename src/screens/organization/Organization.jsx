import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import ReusableButton from "../../components/reusable/Button";
import CompanyDetailsForm from "../../components/company/CompanyDetailsForm";
import OrganisationTable from "./OrganisationTable";

const Organizations = () => {
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  const handleAddCompany = () => {
    setIsAddingCompany(true);
  };

  return (
    <>
      {isAddingCompany ? (
        <>
          <div className="border rounded-md px-6 py-2">
            <div className="flex flex-row justify-start items-center gap-x-2 mt-2 mb-6">
              <span
                onClick={() => setIsAddingCompany(false)}
                className="hover:cursor-pointer"
              >
                <IoMdArrowBack size={22} />
              </span>
              <p className="font-semibold text-2xl tracking-wide">
                Add Company
              </p>
            </div>
            <CompanyDetailsForm />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-wide">
                Organisations
              </h2>
              <p className="text-sm text-gray-500 pt-1">
                List of all organisations available
              </p>
            </div>
            <div>
              <ReusableButton
                outlined={false}
                icon={<GoPlus size={20} />}
                onClick={handleAddCompany}
              >
                Add Company
              </ReusableButton>
            </div>
          </div>
          <div className="mt-6">
            <OrganisationTable />
          </div>
        </>
      )}
    </>
  );
};

export default Organizations;
