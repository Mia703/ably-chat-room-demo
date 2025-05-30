"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "./utils/interfaces";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        setError(false);
        formik.resetForm();
        router.push("/pages/chatroom");
      } else {
        setError(true);
      }
    },
  });

  return (
    <div className="col-span-4 flex h-screen w-full flex-col justify-center p-8 md:col-start-2 lg:col-start-5">
      <div className="form-container flex h-[40vh] flex-col justify-center rounded-2xl bg-white p-4 text-center">
        <h1 className="mt-4">Login</h1>
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          id="login-form"
          className="flex flex-col p-4"
        >
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
            Login
          </button>
        </form>

        {error ? (
          <div className="error-container">
            <small className="font-medium text-red-600">
              There was a problem logging in. Please try again.
            </small>
          </div>
        ) : (
          <div></div>
        )}

        <div className="forgot-container my-3 flex flex-col justify-center">
          <small>
            <Link
              href={"/pages/auth/forgot-email"}
              className="font-bold underline"
            >
              Forgot Email
            </Link>
          </small>
          <small>
            Don&apos;t have an account?{" "}
            <Link href={"/pages/auth/signup"} className="font-bold underline">
              Signup
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
