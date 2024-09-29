import { useState } from "react";
import ExpenseTable from "../expenses/ExpenseTable";
import OrganisationTable from "../organization/OrganisationTable";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold tracking-wide">Analytics</h2>
        <p className="text-gray-500 text-sm mt-1">
          Business reports by running analytics based on various parameters
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col justify-start items-start mt-6">
        <div className="flex justify-satrt items-start gap-x-10">
          <button
            className={`pb-1 ${
              activeTab === 0
                ? "text-custom-blue border-b-[3px] border-custom-blue"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange(0)}
          >
            Expenses
          </button>
          <button
            className={`pb-1 ${
              activeTab === 1
                ? "text-custom-blue border-b-[3px] border-custom-blue"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange(1)}
          >
            Organisations
          </button>
          <button
            className={`pb-1 ${
              activeTab === 2
                ? "text-custom-blue border-b-[3px] border-custom-blue"
                : "text-gray-500"
            }`}
            onClick={() => handleTabChange(2)}
          >
            Cards
          </button>
        </div>
        <p className="text-gray-400 w-full bg-gray-300 h-[1px] -z-[1] -mt-[1px] rounded"></p>
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {activeTab === 0 && (
          <div>
            <ExpenseTable />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <OrganisationTable />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <p>No data available for Cards.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;
