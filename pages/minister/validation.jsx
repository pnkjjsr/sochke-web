import { isEmail, isEmpty, isBoolean } from "utils/validation";

function validation(data) {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.comment)) errors.comment = "Comment must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

export default validation;
