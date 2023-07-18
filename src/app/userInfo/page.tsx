"use client";
import React, { useState } from "react";
import style from "./page.module.scss";
import { useRouter } from "next/navigation";
function User() {
  const router = useRouter();
  const [values, setValues] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    isSuperAdmin: "",
  });
  const submitAddUser = async () => {
    const myNewObject = new Parse.User();
    myNewObject.set("allowDashboard", false);
    myNewObject.set("isKYC", false);
    myNewObject.set("Phone", "7505086466");
    myNewObject.set("Credit", 0);
    myNewObject.set("FullName", values.firstName + " " + values.lastName);
    myNewObject.set("email", values.email);
    myNewObject.set("username", values.email); // phonenumber
    myNewObject.set("password", "123"); // phonenumber
    myNewObject.set("isSuperAdmin", false);
    try {
      await myNewObject.signUp();
      router.push("/ev");
      // Hooray! Let them use the app now.
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: ");
    }
    myNewObject.save().then((res) => {
      router.push("/ev");
    });
  };
  return (
    <div className="page__container">
      <p className={style.pageInfo}>Your Details</p>
      <p className={style.head}> Let us know you</p>
    </div>
  );
}

export default User;
