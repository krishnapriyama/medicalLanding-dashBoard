import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const handleSubmit = (values) => {
    axios
      .post("https://dev.hospitalbooking.in/auth/signin", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("accessToken",response.data.accessToken)
          navigate("/");
        }
      })
      .catch((error) => {
        generateError("Email or Password Incorrect");
        console.error("Error Status:", error.response.status);
        console.error("Error Message:", error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-10 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center font-bold uppercase">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 uppercase font-bold"
            >
              Login
            </button>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
