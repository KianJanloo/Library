'use client'
import { login } from "@/services/auth";
import { Field, Form, Formik } from "formik";
import { redirect } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";



const LoginForm = () => {

  const onsubmit = async (values: {email: string, password: string}, { resetForm }: { resetForm: () => void }) => {
    login({
      email: values.email,
      password: values.password
    }).then((res) => {
      toast.success(res.data.message);
      window.location.href = '/'
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
    resetForm()
  };

  return (
    <div>
      <ToastContainer />
      <Formik initialValues={{ email: "", password: "" }} onSubmit={onsubmit}>
        <Form className="flex bg-white rounded-2xl gap-4 p-4 flex-col">
          <h2 className="mx-auto font-bold text-2xl text-black"> Login </h2>
          <Field
            placeholder="Please enter the email"
            name="email"
            className="border-2 rounded-full w-[300px] px-4 py-1 text-black outline-0 border-black"
          />
          <Field
            placeholder="Please enter the password"
            type='password'
            name="password"
            className="border-2 rounded-full w-[300px] px-4 py-1 text-black outline-0 border-black"
          />
          <button type="submit" className="cursor-pointer bg-black px-4 py-2 hover:scale-[1.02] transform-fill duration-300 text-white rounded-full"> Submit </button>
          <p className="text-black mx-auto"> {`Did you register?`} <span className="text-red-500 font-semibold cursor-pointer" onClick={() => redirect('/auth/register')}> Register </span> </p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
