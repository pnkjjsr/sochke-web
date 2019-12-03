import { isEmail, isEmpty, isBoolean } from "utils/validation";

function validation(data) {
  let errors = {};

  if (isEmpty(data.currentPassword)) {
    errors.currentPassword = "Current password must not be empty";
  }

  if (isEmpty(data.newPassword)) {
    errors.newPassword = "New password must not be empty";
  }

  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
}

export default validation;
