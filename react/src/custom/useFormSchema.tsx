import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().min(6).max(12),
  email: yup.string().email().required("insert a vaild email"),
  password: yup
    .string()
    .min(6)
    .max(20)

    .matches(/\w+\d+[^a-zA-Z0-9]+/, "insert 1 number,1 letter and 1 character"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "doesn't match your password")
    .required(),
  phone: yup.string().min(10),
});

const useFormSchema = () => {
  return { schema };
};

export default useFormSchema;
