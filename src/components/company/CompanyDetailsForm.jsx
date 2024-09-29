import { useState } from "react";
import ReusableInput from "../../components/reusable/InputField";
import ReusableButton from "../../components/reusable/Button";

const tabs = [
  "Organisation Information",
  "Organisation Documents",
  "Shareholder/UBO Details",
  "Director Details",
  "Authorised Signatory",
];

const CompanyDetailsForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [affiliated, setAffiliated] = useState(false);
  const [taxNumber, setTaxNumber] = useState("");
  const [tradeLicense, setTradeLicense] = useState(null);
  const [memorandum, setMemorandum] = useState(null);
  const [incorporationCert, setIncorporationCert] = useState(null);
  const [incumbencyCert, setIncumbencyCert] = useState(null);
  const [shareholderType, setShareholderType] = useState("individual");

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const nextTab = () => {
    setActiveTab((prevTab) => Math.min(prevTab + 1, tabs.length - 1));
  };

  const prevTab = () => {
    setActiveTab((prevTab) => Math.max(prevTab - 1, 0));
  };

  const renderFieldsForTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="grid grid-cols-3 gap-x-8 gap-y-4 w-full">
            <div className="col-span-3 flex gap-4">
              <ReusableInput label="First Name" placeholder="First Name" />
              <ReusableInput label="Last Name" placeholder="Last Name" />
              <div className="flex gap-2 w-full">
                <div className="w-20">
                  <ReusableInput
                    label="Select"
                    placeholder="code"
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
            </div>
            <ReusableInput
              label="Company Name"
              placeholder="Company Name"
              required
            />
            <ReusableInput
              label="Email Address"
              placeholder="Email Address"
              required
            />
            <ReusableInput
              label="No. of Employees"
              placeholder="No. of Employees"
              required
            />
            <ReusableInput
              label="Company Website"
              placeholder="Company Website"
              type={"select"}
              options={[{ label: "company website", value: "" }]}
            />
            <ReusableInput
              label="Country"
              placeholder="Country"
              required
              type={"select"}
              options={[{ label: "Country", value: "" }]}
            />
            <ReusableInput
              label="Domain Name"
              placeholder="Domain Name"
              required
              type={"select"}
              options={[{ label: "Domain Name", value: "" }]}
            />
            <div className="w-full col-span-3">
              <label className="block font-semibold mb-1">
                Affiliated to Regulatory?
              </label>
              <div className="flex items-center space-x-4 w-full">
                <label className="flex items-center border-2 px-2 py-2 w-full rounded-lg bg-gray-100">
                  <input
                    type="radio"
                    name="affiliated"
                    value="yes"
                    checked={affiliated === true}
                    onChange={() => setAffiliated(true)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center border-2 px-2 py-2 w-full rounded-lg bg-gray-100">
                  <input
                    type="radio"
                    name="affiliated"
                    value="no"
                    checked={affiliated === false}
                    onChange={() => setAffiliated(false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            {affiliated && (
              <div className="col-span-3">
                <ReusableInput
                  label="Regulator Name"
                  placeholder="Regulator Name"
                />
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <div className="col-span-2">
              <ReusableInput
                label="Tax Registration Number"
                placeholder="Enter tax registration number"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                Trade/Commercial License
              </label>
              <ReusableInput
                type="file"
                onChange={(e) => handleFileChange(e, setTradeLicense)}
                fullWidth
              />
              {tradeLicense && (
                <p className="text-sm mt-2">{tradeLicense.name}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                Memorandum/Articles of Association
              </label>
              <ReusableInput
                type="file"
                onChange={(e) => handleFileChange(e, setMemorandum)}
                fullWidth
              />
              {memorandum && <p className="text-sm mt-2">{memorandum.name}</p>}
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                Certificate of Incorporation
              </label>
              <ReusableInput
                type="file"
                onChange={(e) => handleFileChange(e, setIncorporationCert)}
                fullWidth
              />
              {incorporationCert && (
                <p className="text-sm mt-2">{incorporationCert.name}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                Certificate of Incumbency/Company Extract
              </label>
              <ReusableInput
                type="file"
                onChange={(e) => handleFileChange(e, setIncumbencyCert)}
                fullWidth
              />
              {incumbencyCert && (
                <p className="text-sm mt-2">{incumbencyCert.name}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Shareholder Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shareholderType"
                    value="individual"
                    checked={shareholderType === "individual"}
                    onChange={() => setShareholderType("individual")}
                    className="mr-2"
                  />
                  Individual
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shareholderType"
                    value="company"
                    checked={shareholderType === "company"}
                    onChange={() => setShareholderType("company")}
                    className="mr-2"
                  />
                  Company
                </label>
              </div>
            </div>
            {shareholderType === "individual" && (
              <>
                <div className="col-span-3 flex gap-4">
                  <ReusableInput label="First Name" placeholder="First Name" />
                  <ReusableInput label="Last Name" placeholder="Last Name" />
                  <div className="flex gap-2 w-full">
                    <div className="w-20">
                      <ReusableInput
                        label="Select"
                        placeholder="code"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ReusableInput label="Email" placeholder="Email" required />
                  <ReusableInput
                    label="Residential Address"
                    placeholder="Residential Address"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ReusableInput
                    label="Passport"
                    type="file"
                    placeholder="Upload Passport"
                    required
                  />
                  <ReusableInput
                    label="Emirates ID"
                    type="file"
                    placeholder="Upload Emirates ID"
                    required
                  />
                </div>
              </>
            )}
            {shareholderType === "company" && (
              <div className="grid grid-cols-2 gap-4">
                <ReusableInput
                  label="Trade/Commercial License"
                  type="file"
                  placeholder="Upload License"
                  required
                />
                <ReusableInput
                  label="Memorandum/Articles of Association"
                  type="file"
                  placeholder="Upload Memorandum"
                  required
                />
                <ReusableInput
                  label="Certificate of Incorporation"
                  type="file"
                  placeholder="Upload Certificate"
                  required
                />
                <ReusableInput
                  label="Certificate of Incumbency/Company Extract"
                  type="file"
                  placeholder="Upload Certificate"
                  required
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <>
            <div className="col-span-3 flex gap-4">
              <ReusableInput label="First Name" placeholder="First Name" />
              <ReusableInput label="Last Name" placeholder="Last Name" />
              <div className="flex gap-2 w-full">
                <div className="w-20">
                  <ReusableInput
                    label="Select"
                    placeholder="code"
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ReusableInput
                label="Email Address"
                placeholder="Email Address"
                required
              />
              <ReusableInput
                label="Residential Address"
                placeholder="Residential Address"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ReusableInput
                label="Passport"
                type="file"
                placeholder="Upload Passport"
                required
              />
              <ReusableInput
                label="Emirates ID"
                type="file"
                placeholder="Upload Emirates ID"
                required
              />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="col-span-3 flex gap-4">
              <ReusableInput label="First Name" placeholder="First Name" />
              <ReusableInput label="Last Name" placeholder="Last Name" />
              <div className="flex gap-2 w-full">
                <div className="w-20">
                  <ReusableInput
                    label="Select"
                    placeholder="code"
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ReusableInput
                label="Email Address"
                placeholder="Email Address"
                required
              />
              <ReusableInput
                label="Residential Address"
                placeholder="Residential Address"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ReusableInput
                label="Passport"
                type="file"
                placeholder="Upload Passport"
                required
              />
              <ReusableInput
                label="Emirates ID"
                type="file"
                placeholder="Upload Emirates ID"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-semibold ${
              activeTab === index
                ? "border-b-[3px] border-custom-blue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <form>
        {renderFieldsForTab()}

        <div className="flex justify-end mt-8 mb-2 gap-x-4">
          <ReusableButton
            onClick={prevTab}
            disabled={activeTab === 0}
            outlined={true}
          >
            Previous
          </ReusableButton>
          <ReusableButton
            onClick={nextTab}
            disabled={activeTab === tabs.length - 1}
          >
            {activeTab === tabs.length - 1 ? "Submit" : "Save and Continue"}
          </ReusableButton>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetailsForm;
