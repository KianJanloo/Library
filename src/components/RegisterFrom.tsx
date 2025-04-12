"use client";
import { register } from "@/services/auth";
import { Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";

const RegisterForm = () => {
  const onsubmit = async (
    values: { email: string; password: string; name: string; phone: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    register({
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phone,
    }).then((res) => {
        toast.success(res.data.message)
        window.location.href = '/auth/login'
    }).catch((e) => {
        toast.error(e.response.data.message)
    })
    resetForm();
  };

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "", name: "", phone: "" }}
        onSubmit={onsubmit}
      >
        <Form className="flex bg-white rounded-2xl gap-4 p-4 flex-col">
          <h2 className="mx-auto font-bold text-2xl text-black"> Register </h2>
          <Field
            placeholder="Please enter the email"
            name="email"
            className="border-2 rounded-full w-[300px] px-4 py-1 text-black outline-0 border-black"
          />
          <Field
            placeholder="Please enter the password"
            type="password"
            name="password"
            className="border-2 rounded-full w-[300px] px-4 py-1 text-black outline-0 border-black"
          />
          <Field
            placeholder="Please enter the name"
            type="name"
            name="name"
            className="border-2 rounded-full w-[300px] px-4 py-1 text-black outline-0 border-black"
          />
          <Field
            placeholder="Please enter the phone"
            type="phone"
            name="phone"
            className="border-2 rounded-full w-[300px] px-4 py-1 text-black outline-0 border-black"
          />
          <button
            type="submit"
            className="cursor-pointer bg-black px-4 py-2 hover:scale-[1.02] transform-fill duration-300 text-white rounded-full"
          >
            {" "}
            Submit{" "}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
