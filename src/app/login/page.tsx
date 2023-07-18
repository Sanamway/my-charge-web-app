"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [otpVerification, setOtpVerification] = React.useState<boolean>(false);
  const [mobileNumberState, setMobileNumberState] = React.useState<any>("");
  const [otp, setOtp] = React.useState<any>(null);
  const [sessionId, setSessionId] = React.useState<any>("");

  const router = useRouter();
  const sendOtp = () => {
    console.log("Hyper");
    fetch(
      `https://2factor.in/API/V1/9088f07e-421f-11ec-a13b-0200cd936042/SMS/${mobileNumberState}/AUTOGEN/otp_template_name`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.Status === "Success") {
          setOtpVerification(true);
          setSessionId(json.Details);
        } else {
          window.alert("Error");
        }
      });
  };
  useEffect(() => {
    Parse.User.logOut();
  }, []);

  const getAllUsers = () => {
    const Users = Parse.Object.extend("_User");

    const parseQuery = new Parse.Query(Users);
    parseQuery.equalTo("Phone", String(mobileNumberState));

    parseQuery.find().then((result) => {
      let usersArray: any[] = [];
      if (result.length) {
        Parse.User.logIn(
          String(mobileNumberState),
          String(mobileNumberState)
        ).then((res) => router.push("/profile"));
      } else {
        router.push("/userInfo");
      }
    });
  };

  const verifyOtp = () => {
    fetch(
      `https://2factor.in/API/V1/9088f07e-421f-11ec-a13b-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.Status === "Success") {
          getAllUsers();
        } else {
          window.alert("Error");
        }
      });
  };

  return (
    <div className=" bg-no-repeat bg-left-bottom h-screen page__container flex flex-col ">
      {otpVerification ? (
        <p className="page__title text-black">Phone OTP</p>
      ) : (
        <p className="page__title text-black">Phone Number</p>
      )}
      {otpVerification ? (
        <h1 className="text-center text-2xl font-bold text-charge-green mt-20">
          Please Enter OTP
          <br />
          <small className="text-center text-sm font-light text-grey">
            We have sent you OTP of a number, Please check the message and enter
            the OTP below
          </small>
        </h1>
      ) : (
        <h1 className="text-center text-2xl font-bold text-charge-green mt-20">
          Please Enter Phone Number
          <br />
          <small className="text-center text-sm font-light text-grey">
            You shall receive an SMS with code for verification on this number
          </small>
        </h1>
      )}

      {otpVerification ? (
        <label className="relative block self-center mt-10">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-charge-green focus:ring-charge-green focus:ring-1 text-large"
            placeholder="Enter OTP"
            type="number"
            value={otp}
            onChange={(e: { target: { value: any } }) => setOtp(e.target.value)}
          />
        </label>
      ) : (
        <label className="relative block self-center mt-10">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 pr-6 text-black">
            +91
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-charge-green focus:ring-charge-green focus:ring-1 text-large"
            placeholder="Enter Phone Number"
            name="search"
            type="number"
            value={mobileNumberState}
            onChange={(e: { target: { value: any } }) =>
              setMobileNumberState(e.target.value)
            }
          />
        </label>
      )}

      {otpVerification ? (
        <button
          disabled={false}
          type={"button"}
          className={`custom-btn self-center bg-charge-green text-white rounded  mt-5 w-22`}
          onClick={() => {
            verifyOtp();
          }}
        >
          <span className={"flex"}>Verify OTP</span>
        </button>
      ) : (
        <button
          disabled={false}
          type={"button"}
          className={`custom-btn self-center bg-charge-green text-white rounded  mt-5 w-22`}
          onClick={() => {
            sendOtp();
          }}
        >
          <span className={"flex"}>Send OTP</span>
        </button>
      )}
    </div>
  );
}

export default Login;
