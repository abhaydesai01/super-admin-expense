import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import ReusableButton from "../../components/reusable/Button";
import ReusableInput from "../../components/reusable/InputField";

const BulkUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold tracking-wide">Bulk upload</h1>
        <p className="text-gray-500 text-sm">Upload the data in bulk</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-x-[2em] h-[80vh]">
        <div className="w-[60%] p-8 rounded-lg  mr-8">
          <div className="flex flex-row justify-between items-center border-2 border-[#E6E7EA] bg-[#F8F8F8] rounded-lg px-4 py-2 mb-6">
            <div className="flex flex-row items-center gap-x-2">
              <FaDownload className="text-gray-400 text-2xl mr-4" />
              <div className="flex flex-col">
                <span className="font-semibold">
                  Bulk Operations Sample Doc
                </span>
                <span className="text-gray-500 text-sm">
                  To upload bulk upload data, use template
                </span>
              </div>
            </div>
            <ReusableButton outlined={true}>Download</ReusableButton>
          </div>

          <div className="flex flex-col justify-center items-center mt-4">
            <ReusableInput
              type="file"
              onChange={handleFileChange}
              className="mb-4 border border-gray-300 p-2 rounded w-full hidden"
            />
            <ReusableButton
              onClick={handleUploadClick}
              disabled={!selectedFile}
              outlined={true}
            >
              Upload
            </ReusableButton>
          </div>
        </div>

        <div className="w-[30%] border-dotted border-2 border-custom-blue p-8 rounded-lg">
          <h2 className="text-custom-blue font-semibold mb-4">
            How to bulk upload Employee?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Click on Download Sample</li>
            <li>Fill all the mandatory columns in the template</li>
            <li>Click or drag & drop to upload template</li>
            <li>Moxey system will validate uploaded data.</li>
            <li>All valid data will be uploaded and saved</li>
            <li>
              All invalid data will have to be corrected and uploaded again.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BulkUploadScreen;
