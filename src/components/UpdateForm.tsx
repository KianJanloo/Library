"use client";
import React from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { IBooks } from "@/types/Books-type";
import { redirect } from "next/navigation";

const UpdateForm = () => {
  const onSubmit = async (values: Omit<IBooks, "author">) => {
    console.log(values);
    axios.put("/api/posts", {
      id: values.id,
      name: values.name,
      describe: values.describe,
      authorId: values.authorId,
      image: values.image,
      price: values.price,
    });
    redirect("/library");
  };
  return (
    <Formik
      initialValues={{
        id: "",
        name: "",
        describe: "",
        authorId: 0,
        image: "",
        price: 0,
      }}
      onSubmit={onSubmit}
    >
      <Form className="text-black flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="id" className="font-bold">
            {" "}
            ID{" "}
          </label>
          <Field
            className="px-4 py-1 outline-0 border-black border-3 rounded-xl"
            name="id"
            placeholder="Please enter the book ID..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold">
            {" "}
            Name{" "}
          </label>
          <Field
            className="px-4 py-1 outline-0 border-black border-3 rounded-xl"
            name="name"
            placeholder="Please enter the book name..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="describe" className="font-bold">
            {" "}
            Describe{" "}
          </label>
          <Field
            className="px-4 py-1 outline-0 border-black border-3 rounded-xl"
            name="describe"
            type="textarea"
            placeholder="Please enter the book describe..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="authorId" className="font-bold">
            {" "}
            AuthorID{" "}
          </label>
          <Field
            className="px-4 py-1 outline-0 border-black border-3 rounded-xl"
            name="authorId"
            type='number'
            placeholder="Please enter the authorId..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-bold">
            {" "}
            Image{" "}
          </label>
          <Field
            className="px-4 py-1 outline-0 border-black border-3 rounded-xl"
            name="image"
            placeholder="Please enter the image..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-bold">
            {" "}
            Price{" "}
          </label>
          <Field
            className="px-4 py-1 outline-0 border-black border-3 rounded-xl"
            name="price"
            type="number"
            placeholder="Please enter the price..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-black rounded-2xl cursor-pointer"
        >
          {" "}
          Submit{" "}
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateForm;
