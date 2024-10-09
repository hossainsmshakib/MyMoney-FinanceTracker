import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage: React.FC = () => {
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <RegisterForm />
        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
