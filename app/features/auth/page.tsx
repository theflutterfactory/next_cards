import { useForm } from "react-hook-form";
import { useAuth } from "./hooks/useAuth";
import AuthInput from "./components/input";
import { Button, Center, Text } from "@chakra-ui/react";
import { LoginType } from "./types/auth";

function Login() {
  const { data, isLoading, error } = useAuth();

  console.log(data);
  console.log(isLoading);
  console.log(error);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>();

  function onLoginSubmit(data: LoginType) {
    console.log(data);
  }

  function onSignupSubmit(data: LoginType) {
    console.log(data);
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
      <div className="flex space-x-4">
        <Button
          className="flex-1 rounded-md"
          name="login"
          onClick={handleSubmit(onLoginSubmit)}
          colorScheme='white'
          type="submit"
          variant='solid'
          _hover={{
            bgColor: 'purple.600'
          }}
          bgColor='purple.fg'
        >
          Login
        </Button>
        <Button
          className="flex-1 rounded-md"
          name="signup"
          onClick={handleSubmit(onSignupSubmit)}
          colorScheme='white'
          type="submit"
          variant='solid'
          _hover={{
            borderWidth: 0.5
          }}
        >
          Signup
        </Button>
      </div>
    </form>
  );
}

export default Login;