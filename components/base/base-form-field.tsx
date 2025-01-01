import React from "react";
import { ControllerRenderProps, FieldValues, UseControllerProps } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Ganti dengan komponen Input Anda

interface BaseFormFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  renderInput?: (field: any) => React.ReactNode; 
}

export const BaseFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  renderInput,
}: BaseFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {renderInput ? (
              renderInput(field)
            ) : (
              <Input {...field} placeholder={placeholder} disabled={disabled} />
            )}
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
