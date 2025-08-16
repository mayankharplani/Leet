import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AutofillForm = () => {
  const { setValue } = useForm();

  // Handle JSON Import
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const problemData = JSON.parse(text);
      console.log(problemData)
      // fill form with JSON
      Object.keys(problemData).forEach((key) => {
        setValue(key, problemData[key]);
      });
      toast("Problem Added Successfully",{
        position: "top-right"
      })
    } catch (err) {
      console.error("Invalid JSON", err);
      toast("Error Adding Problem", {
        position: "top-right"
      })
    }
  };

  return (
    <div className="flex items-center">
      {/* JSON Import Button */}
      

      {/* Example fields */}
    </div>
  );
};

export default AutofillForm;
