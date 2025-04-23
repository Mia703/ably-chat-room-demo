"use client";
import { User } from "@/app/utils/interfaces";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          id: data.message.id,
          firstName: data.message.firstName,
          lastName: data.message.lastName,
        };
        window.sessionStorage.setItem("user", JSON.stringify(user));
        setError("");
        formik.resetForm();
        router.push("/pages/chatroom");
      } else {
        const data = await response.json();
        const error_type = data.message?.key;

        if (error_type === "error") {
          setError("There was a problem signing up. Please try again.");
        }

        if (error_type === "exists") {
          setError("This email already exists. Please try logging in.");
        }
      }
    },
  });

  return (
    <div className="col-span-4 flex h-screen w-full flex-col justify-center p-8 md:col-start-2 lg:col-start-5">
      <div className="form-container flex h-[40vh] flex-col justify-center rounded-2xl bg-white p-4 text-center">
        <h1 className="mt-4">Signup</h1>
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          id="signup-form"
          className="flex flex-col p-4"
        >
          <div className="container flex flex-row justify-center gap-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name*"
              aria-label="First Name"
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />

            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name*"
              aria-label="Last Name"
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email*"
            aria-label="Email"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <button type="submit" className="mt-2">
            Signup
          </button>
        </form>

        {error != "" ? (
          <div className="error-container">
            <small className="font-medium text-red-600">{error}</small>
          </div>
        ) : (
          <div></div>
        )}

        <div className="login-container my-3 flex flex-col justify-center">
          <small>
            Already have an account?{" "}
            <Link href={"/"} className="font-bold underline">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
