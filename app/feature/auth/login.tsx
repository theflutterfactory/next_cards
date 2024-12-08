import { useAuth } from "./hooks/useAuth";

function Login() {
  const { data, isLoading, error } = useAuth();

  console.log(data);
  console.log(isLoading);
  console.log(error);
  return (
    <div>
      Login
    </div>
  );
}

export default Login;