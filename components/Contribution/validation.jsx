import { isEmail, isEmpty, isBoolean } from "utils/validation";

function validation(data) {
  let errors = {};

  if (isEmpty(data.title)) errors.title = "Title must not be empty";
  if (isEmpty(data.imgUrl)) errors.imgUrl = "You forgot to upload image";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
}

export default validation;
