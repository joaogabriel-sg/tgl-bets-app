import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Input } from "../Input";

import * as S from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export const InputForm = React.forwardRef<TextInput, Props>(
  ({ control, name, error, ...props }, ref) => {
    return (
      <S.Container>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...props}
              ref={ref}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  }
);
