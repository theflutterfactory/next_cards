'use client';
import { useForm } from "react-hook-form";
import { useAuth } from "./hooks/useAuth";
import AuthInput from "./components/input";
import { Button, Center, Text } from "@chakra-ui/react";
import { LoginType } from "./types/auth";
import { useState } from "react";
import { supabase } from "@/app/lib/client";

function Login() {
  const { data, isLoading, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  console.log(data);
  console.log(isLoading);
  console.log(error);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginType>();

  async function onLoginSubmit(formData: LoginType) {
    const { data, error } = await supabase.auth.getSession();

    console.log(formData);
    console.log(data);
    console.log(error);
  }

  async function onSignupSubmit(formData: LoginType) {
    console.log(formData);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    console.log(data);
    console.log(error);
  }

  return (
    <form
      className="flex flex-col mx-auto w-1/3 gap-8 center h-screen justify-center"
    >
      <Center>
        <Text fontSize='6xl'>Next Cards</Text>
      </Center>
      <AuthInput
        name="email"
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          },
        })}
        errorText={errors.email?.message}
      />
      <AuthInput
        name="password"
        register={register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }

        })}
        errorText={errors.password?.message}
      />
      {
        !isLogin &&
        <AuthInput
          name="confirm password"
          register={register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) => value === watch('password') ||
              'Password and Confirm Password must match',
            minLength: {
              value: 8,
              message: 'Confirm Password must be at least 8 characters'
            }

          })}
          errorText={errors.confirmPassword?.message}
        />
      }
      <div className="flex space-x-4">
        <Button
          className="flex-1 rounded-md"
          name="login"
          onClick={
            isLogin ?
              handleSubmit(onLoginSubmit) :
              handleSubmit(onSignupSubmit)
          }
          colorScheme='white'
          type="submit"
          variant='solid'
          _hover={{
            bgColor: 'purple.600'
          }}
          bgColor='purple.fg'
        >
          {isLogin ? 'Login' : 'Signup'}
        </Button>
        <Button
          className="flex-1 rounded-md"
          onClick={() => setIsLogin(!isLogin)}
          _hover={{
            borderWidth: 0.5
          }}
          colorScheme='white'
        >
          {`Switch to ${isLogin ? 'Signup' : 'Login'}`}
        </Button>
      </div>
    </form>
  );
}

export default Login;