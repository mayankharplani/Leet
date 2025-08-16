import React from "react";
import { useForm } from "react-hook-form";

const AutofillForm = () => {
  const { setValue } = useForm();

  // Handle JSON Import
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const problemData = JSON.parse(text);

      // Auto-fill form values
      setValue("title", problemData.title || "");
      setValue("difficulty", problemData.difficulty || "");
      setValue("constraints", problemData.constraints || "");
      setValue("examples", problemData.examples || []);
      setValue("testcases", problemData.testcases || []);
      setValue("codeSnippets", problemData.codeSnippets || {});
      setValue("referenceSolution", problemData.referenceSolution || "");
    } catch (err) {
      console.error("Invalid JSON", err);
      alert("Invalid JSON File");
    }
  };

  return (
    <div className="flex items-center">
      {/* JSON Import Button */}
      <div class="flex items-center justify-center gap-3">
        <p className="text-sm " >Choose File(JSON)</p>
        <label
          for="fileUpload"
          class="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition"
        >
          Upload File
        </label>
        <input type="file" id="fileUpload" class="hidden" />
      </div>

      {/* Example fields */}
    </div>
  );
};

export default AutofillForm;
