import { isEmail, isEmpty, isBoolean } from "utils/validation";

function validation(data) {
  let errors = {};

  if (isEmpty(data.type)) errors.type = "Type must not be empty";
  if (isEmpty(data.title)) errors.title = "Title must not be empty";
  if (isEmpty(data.describe)) errors.describe = "Describe must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
}

export default validation;
