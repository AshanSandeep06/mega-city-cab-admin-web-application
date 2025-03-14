// // components/vehicles/CreateVehicleForm.tsx
// "use client";
// import React from "react";
// import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
//
// import FormRow from "@/components/FormRow";
// import Input from "@/components/Input";
// import Button from "@/components/Button";
// import SpinnerMini from "@/components/Loader";
//
// import { useCreateOrEditVehicles } from "./hooks/useCreateVehicle";
// import { Vehicle } from "@/types";
//
// interface CreateVehicleFormProps {
//   vehicle?: Vehicle;
//   onCloseModal?: () => void;
// }
//
// const CreateVehicleForm: React.FC<CreateVehicleFormProps> = ({
//   vehicle,
//   onCloseModal,
// }) => {
//   const isEditSession = Boolean(vehicle?.vehicleId);
//   const { isWorking, createOrEditCabin } = useCreateOrEditVehicles(isEditSession);
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     getValues,
//     reset,
//   } = useForm({
//     defaultValues: {
//       plateNumber: vehicle?.plateNumber || "",
//       passengerCount: vehicle?.passengerCount || 0,
//       pricePerKm: vehicle?.pricePerKm || 0,
//       vehicleModel: vehicle?.vehicleModel || "",
//       status: vehicle?.status || "",
//       image: vehicle?.image || "",
//       category: vehicle?.category || "",
//     },
//   });
//
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     const {
//       plateNumber,
//       passengerCount,
//       pricePerKm,
//       vehicleModel,
//       status,
//       image,
//       category,
//     } = data;
//
//     // createOrEditCabin(
//     //   {
//     //     vehicleId: vehicle?.vehicleId,
//     //     plateNumber,
//     //     passengerCount,
//     //     pricePerKm,
//     //     vehicleModel,
//     //     status,
//     //     image: typeof image === "string" ? image : image[0],
//     //     category,
//     //   },
//     //   {
//     //     onSuccess: () => {
//     //       reset();
//     //       onCloseModal?.();
//     //     },
//     //   }
//     // );
//   };
//
//   const onError = (err: any) => {
//     console.log(err);
//   };
//
//   return (
//     <form
//       className="w-[800px] text-[14px]"
//       onSubmit={handleSubmit(onSubmit, onError)}
//     >
//       <FormRow label="Vehicle Model" error={errors?.vehicleModel?.message} id="vehicleModel">
//         <Input
//           type="text"
//           id="vehicleModel"
//           disabled={isWorking}
//           {...register("vehicleModel", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Plate Number" error={errors?.plateNumber?.message} id="plateNumber">
//         <Input
//           type="text"
//           id="plateNumber"
//           disabled={isWorking}
//           {...register("plateNumber", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Passenger Count" error={errors?.passengerCount?.message} id="passengerCount">
//         <Input
//           type="number"
//           id="passengerCount"
//           disabled={isWorking}
//           {...register("passengerCount", {
//             required: "This field is required",
//             min: { value: 1, message: "Passenger count should be at least 1" },
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Price per Km" error={errors?.pricePerKm?.message} id="pricePerKm">
//         <Input
//           type="number"
//           id="pricePerKm"
//           disabled={isWorking}
//           {...register("pricePerKm", {
//             required: "This field is required",
//             min: { value: 0.01, message: "Price per Km should be at least 0.01" },
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Status" error={errors?.status?.message} id="status">
//         <Input
//           type="text"
//           id="status"
//           disabled={isWorking}
//           {...register("status", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Category" error={errors?.category?.message} id="category">
//         <Input
//           type="text"
//           id="category"
//           disabled={isWorking}
//           {...register("category", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Vehicle Image" id="image" error={errors?.image?.message}>
//         <input
//           id="image"
//           type="file"
//           accept="image/*"
//           className="text-[14px] image-input outline-violet-700 dark:text-gray-300"
//           {...register("image", {
//             required: isEditSession ? false : "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow hasButton>
//         <Button variant="secondary" type="reset" onClick={() => onCloseModal?.()}>
//           Cancel
//         </Button>
//         <Button disabled={isWorking} type="submit" className="flex items-center gap-2">
//           {isWorking && <SpinnerMini />}
//           <span>{isEditSession ? "Edit Vehicle" : "Create New Vehicle"}</span>
//         </Button>
//       </FormRow>
//     </form>
//   );
// };
//
// export default CreateVehicleForm;

// -------------------------------------------------------------------------------------------

// // features/vehicles/CreateVehicleForm.tsx
// "use client";
// import React, { useState } from "react";
// import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
//
// import FormRow from "@/components/FormRow";
// import Input from "@/components/Input";
// import Button from "@/components/Button";
// import SpinnerMini from "@/components/Loader";
//
// import { useCreateVehicle } from "./hooks/useCreateVehicle";
// import { useUpdateVehicle } from "./hooks/useUpdateVehicle";
// import { VehicleCustomResult, VehicleDto } from "@/types";
//
// interface CreateVehicleFormProps {
//   vehicle?: VehicleCustomResult;
//   onCloseModal?: () => void;
// }
//
// const CreateVehicleForm: React.FC<CreateVehicleFormProps> = ({
//                                                                vehicle,
//                                                                onCloseModal,
//                                                              }) => {
//   const isEditSession = Boolean(vehicle?.vehicleId);
//   const { isCreating, createVehicle } = useCreateVehicle();
//   const { isUpdating, updateVehicle } = useUpdateVehicle();
//   const isWorking = isCreating || isUpdating;
//
//   const [imageFile, setImageFile] = useState<File | null>(null);
//
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm({
//     defaultValues: {
//       plateNumber: vehicle?.plateNumber || "",
//       passengerCount: vehicle?.passengerCount || 0,
//       pricePerKm: vehicle?.pricePerKm || 0,
//       vehicleModel: vehicle?.model || "",
//       status: vehicle?.vehicleStatus || "Available",
//       category: vehicle?.category || "",
//     },
//   });
//
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     if (!imageFile && !isEditSession) {
//       alert("Please upload an image");
//       return;
//     }
//
//     const dto: VehicleDto = {
//       vehicleId: vehicle?.vehicleId,
//       plateNumber: data.plateNumber,
//       passengerCount: Number(data.passengerCount),
//       pricePerKm: Number(data.pricePerKm),
//       vehicleModel: data.vehicleModel,
//       status: data.status,
//       category: data.category,
//     };
//
//     if (isEditSession) {
//       updateVehicle(
//           { dto, imageFile: imageFile || new File([], "") },
//           {
//             onSuccess: () => {
//               reset();
//               onCloseModal?.();
//             },
//           }
//       );
//     } else {
//       createVehicle(
//           { dto, imageFile: imageFile! },
//           {
//             onSuccess: () => {
//               reset();
//               onCloseModal?.();
//             },
//           }
//       );
//     }
//   };
//
//   const onError = (err: any) => {
//     console.log(err);
//   };
//
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImageFile(e.target.files[0]);
//     }
//   };
//
//   return (
//       <form
//           className="w-[800px] text-[14px]"
//           onSubmit={handleSubmit(onSubmit, onError)}
//       >
//         <FormRow label="Vehicle Model" error={errors?.vehicleModel?.message} id="vehicleModel">
//           <Input
//               type="text"
//               id="vehicleModel"
//               disabled={isWorking}
//               {...register("vehicleModel", { required: "This field is required" })}
//           />
//         </FormRow>
//
//         <FormRow label="Plate Number" error={errors?.plateNumber?.message} id="plateNumber">
//           <Input
//               type="text"
//               id="plateNumber"
//               disabled={isWorking}
//               {...register("plateNumber", { required: "This field is required" })}
//           />
//         </FormRow>
//
//         <FormRow label="Passenger Count" error={errors?.passengerCount?.message} id="passengerCount">
//           <Input
//               type="number"
//               id="passengerCount"
//               disabled={isWorking}
//               {...register("passengerCount", {
//                 required: "This field is required",
//                 min: { value: 1, message: "Passenger count should be at least 1" },
//               })}
//           />
//         </FormRow>
//
//         <FormRow label="Price per Km" error={errors?.pricePerKm?.message} id="pricePerKm">
//           <Input
//               type="number"
//               id="pricePerKm"
//               disabled={isWorking}
//               {...register("pricePerKm", {
//                 required: "This field is required",
//                 min: { value: 0.01, message: "Price per Km should be at least 0.01" },
//               })}
//           />
//         </FormRow>
//
//         <FormRow label="Status" error={errors?.status?.message} id="status">
//           <select
//               id="status"
//               disabled={isWorking}
//               {...register("status", { required: "This field is required" })}
//               className="w-full p-2 border rounded"
//           >
//             <option value="Available">Available</option>
//             <option value="Booking">Booking</option>
//           </select>
//         </FormRow>
//
//         <FormRow label="Category" error={errors?.category?.message} id="category">
//           <Input
//               type="text"
//               id="category"
//               disabled={isWorking}
//               {...register("category", { required: "This field is required" })}
//           />
//         </FormRow>
//
//         <FormRow label="Vehicle Image" id="image" error={errors?.image?.message}>
//           <input
//               id="image"
//               type="file"
//               accept="image/*"
//               className="text-[14px] image-input outline-violet-700 dark:text-gray-300"
//               onChange={handleFileChange}
//               {...register("image", {
//                 required: isEditSession ? false : "This field is required",
//               })}
//           />
//         </FormRow>
//
//         <FormRow hasButton>
//           <Button variant="secondary" type="reset" onClick={() => onCloseModal?.()}>
//             Cancel
//           </Button>
//           <Button disabled={isWorking} type="submit" className="flex items-center gap-2">
//             {isWorking && <SpinnerMini />}
//             <span>{isEditSession ? "Edit Vehicle" : "Create New Vehicle"}</span>
//           </Button>
//         </FormRow>
//       </form>
//   );
// };
//
// export default CreateVehicleForm;





// ==================================================================================================================


// features/vehicles/CreateVehicleForm.tsx
"use client";
import React, {useRef, useState} from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";

import { useCreateVehicle } from "./hooks/useCreateVehicle";
import { useUpdateVehicle } from "./hooks/useUpdateVehicle";
import { VehicleCustomResult, VehicleDto } from "@/types";

interface CreateVehicleFormProps {
  vehicle?: VehicleCustomResult;
  onCloseModal?: () => void;
}

const CreateVehicleForm: React.FC<CreateVehicleFormProps> = ({
                                                               vehicle,
                                                               onCloseModal,
                                                             }) => {
  const isEditSession = Boolean(vehicle?.vehicleId);
  const { isCreating, createVehicle } = useCreateVehicle();
  const { isUpdating, editVehicle } = useUpdateVehicle();
  const isWorking = isCreating || isUpdating;

  const [keepExistingImage, setKeepExistingImage] = useState(isEditSession);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref to access the file input directly

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      plateNumber: vehicle?.plateNumber || "",
      passengerCount: vehicle?.passengerCount || 0,
      pricePerKm: vehicle?.pricePerKm || 0,
      vehicleModel: vehicle?.model || "",
      status: vehicle?.vehicleStatus || "Available",
      category: vehicle?.category || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const fileInput = fileInputRef.current;
    const uploadedFile = fileInput?.files?.[0] || null; // Directly access the file input
    console.log("Submitting with uploadedFile from input:", uploadedFile); // Debug input

    console.log("Data: ", data);

    // For creating a new vehicle, image upload is mandatory
    if (!isEditSession && !uploadedFile) {
      alert("Please upload an image for the new vehicle.");
      return;
    }

    // For editing, if the user doesn't upload a new image and doesn't want to keep the existing one, show an error
    if (isEditSession && !uploadedFile && !keepExistingImage) {
      alert("Please upload a new image or choose to keep the existing image.");
      return;
    }

    const dto: VehicleDto = {
      vehicleId: vehicle?.vehicleId,
      plateNumber: data.plateNumber,
      passengerCount: Number(data.passengerCount),
      pricePerKm: Number(data.pricePerKm),
      vehicleModel: data.vehicleModel,
      status: data.status,
      category: data.category,
    };

    console.log("dto: ", dto);

    const fileToSend = uploadedFile || new File([], "placeholder.jpg"); // Use input file or fallback

    if (isEditSession) {
      editVehicle(
          { dto, imageFile: fileToSend },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
      );
    } else {
      createVehicle(
          { dto, imageFile: fileToSend },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
      );
    }
  };

  const onError = (err: any) => {
    console.log("Form submission error:", err);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed, files:", e.target.files); // Debug log
  };

  const handleKeepExistingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeepExistingImage(e.target.checked);
    if (e.target.checked && fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input when keeping existing image
    }
  };

  return (
      <form
          className="w-[800px] text-[14px]"
          onSubmit={handleSubmit(onSubmit, onError)}
      >
        <FormRow label="Vehicle Model" error={errors?.vehicleModel?.message} id="vehicleModel">
          <Input
              type="text"
              id="vehicleModel"
              disabled={isWorking}
              {...register("vehicleModel", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Plate Number" error={errors?.plateNumber?.message} id="plateNumber">
          <Input
              type="text"
              id="plateNumber"
              disabled={isWorking}
              {...register("plateNumber", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Passenger Count" error={errors?.passengerCount?.message} id="passengerCount">
          <Input
              type="number"
              id="passengerCount"
              disabled={isWorking}
              {...register("passengerCount", {
                required: "This field is required",
                min: { value: 1, message: "Passenger count should be at least 1" },
              })}
          />
        </FormRow>

        <FormRow label="Price per Km" error={errors?.pricePerKm?.message} id="pricePerKm">
          <Input
              type="number"
              id="pricePerKm"
              disabled={isWorking}
              {...register("pricePerKm", {
                required: "This field is required",
                min: { value: 0.01, message: "Price per Km should be at least 0.01" },
              })}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message} id="status">
          <select
              id="status"
              disabled={isWorking}
              {...register("status", { required: "This field is required" })}
              className="w-full p-2 border rounded"
          >
            <option value="Available">Available</option>
            <option value="Booking">Booking</option>
          </select>
        </FormRow>

        <FormRow label="Category" error={errors?.category?.message} id="category">
          <Input
              type="text"
              id="category"
              disabled={isWorking}
              {...register("category", { required: "This field is required" })}
          />
        </FormRow>

        {isEditSession && (
            <FormRow label="Keep Existing Image" id="keepExistingImage">
              <input
                  type="checkbox"
                  id="keepExistingImage"
                  checked={keepExistingImage}
                  onChange={handleKeepExistingImageChange}
                  disabled={isWorking}
              />
            </FormRow>
        )}

        <FormRow label="Vehicle Image" id="image" error={errors?.image?.message}>
          <input
              id="image"
              type="file"
              accept="image/*"
              className="text-[14px] image-input outline-violet-700 dark:text-gray-300"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isWorking || (isEditSession && keepExistingImage)}
          />
        </FormRow>

        <FormRow hasButton>
          <Button variant="secondary" type="reset" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking} type="submit" className="flex items-center gap-2">
            {isWorking && <SpinnerMini />}
            <span>{isEditSession ? "Edit Vehicle" : "Create New Vehicle"}</span>
          </Button>
        </FormRow>
      </form>
  );
};

export default CreateVehicleForm;






