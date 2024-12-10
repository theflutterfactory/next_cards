import { Field } from "@/components/ui/field";
import { Input, Text } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

function AuthInput({
  register,
  name,
  errorText,
}: {
  register: UseFormRegisterReturn;
  name: string;
  errorText: string | undefined;
}) {
  return (
    <Field
      invalid
      label={<Text textTransform='capitalize'>{name}</Text>}
      errorText={errorText}
    >
      <Input
        {...register}
        type={name}
        focusRingColor='black'
        focusRingWidth={5}
        padding={4}
        bgColor='white'
        _focusVisible={{
          borderColor: 'deepskyblue',
          focusRingColor: 'deepskyblue'
        }}
        color='black'

      />
    </Field>
  );
}

export default AuthInput;
