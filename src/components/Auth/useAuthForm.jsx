import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAuth } from '../../store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/shallow';

export const useAuthForm = (formType) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signUp, signIn } = useAuth(useShallow((state) => ({
    signUp: state.signUp,
    signIn: state.signIn,
  })));

  const schema = yup.object().shape({
    email: yup.string().required('Email required').email('Invalid email'),
    password: yup.string().required('Password required').min(5),
    ...(formType === 'register' && {
      username: yup.string().required('Username required'),
    }),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  setLoading(true);
  try {
    let result;

    if (formType === 'register') {
      result = await signUp(data.email, data.password, data.username);
      console.log("Register result:", result);

      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Registered successfully!");
        reset();
        navigate("/dashboard");
      }
    } else {
      result = await signIn(data.email, data.password);
      console.log("Login result:", result);

      if (result?.error) {
        toast.error(result.error.message || "Login failed");
      } else {
        console.log("✅ Login user ID:", result?.data?.id || result?.data?.session?.user?.id);
        toast.success("Logged in successfully!");
        reset();
        navigate("/dashboard");
      }
    }
  } catch (err) {
    toast.error("Unexpected error: " + err.message);
  } finally {
    setLoading(false);
  }
};


  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  };
};
