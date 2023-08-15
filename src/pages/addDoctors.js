import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const AddDoctor = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate()

  const generateSucess = (value) => {
    toast.success(value, {
      position: "bottom-right",
    });
  };

  const departmentOptions = [
    { value: "", label: "Select a department" },
    { value: "cardiology", label: "Cardiology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "neurology", label: "Neurology" },
  ];

  const initialValues = {
    name: "",
    department: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name Required"),
    department: Yup.string().required("Please select a department"),
  });

  const handleSubmit = (values) => {
    axios
      .post("https://dev.hospitalbooking.in/doctors", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          generateSucess("Successfully Addedd");
          navigate('/')
        }
      })
      .catch((error) => {
        console.error("Error Message:", error.message);
      });
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white p-8 m-10  max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center font-bold uppercase">
          add doctors
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Name of Doctor
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Name of Doctor"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="block mb-1 font-medium">
                Department
              </label>
              <Field
                as="select"
                id="department"
                name="department"
                className="w-full p-2 border rounded-md outline-none"
              >
                {departmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="department"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 uppercase font-bold"
            >
              Submit
            </button>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddDoctor;
