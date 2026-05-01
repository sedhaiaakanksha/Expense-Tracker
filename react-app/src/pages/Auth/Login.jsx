import React, { useState } from "react";
import Input from "../../components/Inputs/input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle login

  const handleLogin = async (e) => {};
  return (
    <AuthLayout>
      <div className="lg:w-[70%] max-h-full flex flex-col justify-center mt-50">
        <h3 className="text-xl font-semibold text-black">Welcome Back!!</h3>
        <p className="text-xs text-slate-700 mt-5px mb-6">
          Please Enter Your Details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="johndoe@example.com"
            type="text"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
