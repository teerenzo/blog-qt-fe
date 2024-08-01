import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { se } from "date-fns/locale";

const BlogModal = ({ isOpen, onClose, action, data }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (file) {
      formData.append("files", file);
    }

    await action(formData);
    setSubmitting(false);
    setIsLoading(false);
    setFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {data != null ? "Edit Blog Post" : "Create Blog Post"}
        </h2>
        <Formik
          initialValues={{
            title: data?.title ?? "",
            content: data?.content ?? "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            content: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (file === null && data == null) {
              setSubmitting(false);
              toast.error("Please upload an image");
              return;
            }
            handleSubmit(values, { setSubmitting });
            setSubmitting(false);
            // onClose();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700">
                  Content
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows="6"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {data == null && (
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                    onChange={(event) => {
                      setFile(event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogModal;
