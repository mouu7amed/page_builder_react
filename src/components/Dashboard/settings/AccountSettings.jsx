import React, { useState } from "react";
import { updateUser } from "../../../redux/features/user/userSlice";
import { useAuth } from "../../../context/AuthProvider";
import { useDispatch } from "react-redux";

export const AccountSettings = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState({
    phone: "",
  });
  const [validationError, setValidationError] = useState({
    phone: "",
  });

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const updatePhoneHandler = () => {
    //Phone Validation
    if (
      phoneValue &&
      !phoneValue.match(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    ) {
      setValidationError({
        ...validationError,
        phone: "Enter a valid phone number",
      });
      return;
    }

    const updatedUserInfo = { phone: phoneValue };

    try {
      dispatch(updateUser(updatedUserInfo, currentUser._id));
    } catch {
      console.log("Error updating your phone number!");
    }
  };

  return <div>AccountSettings</div>;
};
