import React, { useState, useContext } from "react";
import Input from "../../components/Inputs/input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //Handle signUp Form submit

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");

    // Sign Up API Call

    try {
      //Upload image if present
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl =
          imageUploadRes?.imageUrl || imageUploadRes?.profileImageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.Please try again.");
      }
    }
  };
  return (
    <div>
      <AuthLayout>
        <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-xs text-slate-700 mt-1.25 mb-6">
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp}>
            <div className="mr-100px">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-150">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="johndoe@example.com"
                type="text"
              />

              {/* <div className="row-span-3"> */}
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
              {/* </div> */}
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <div className="w-150">
              <button type="submit" className="btn-primary">
                SIGN UP
              </button>
            </div>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
