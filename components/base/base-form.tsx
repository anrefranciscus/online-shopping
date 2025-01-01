import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm, UseFormReturn, DefaultValues} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "../ui/button";


interface BaseForm<T extends FieldValues> {
    schema: ZodType<T>
    defaultValues: DefaultValues<T>
    onSubmit: (data: T) => Promise<void> | void
    children: (form: UseFormReturn<T>) => React.ReactNode
    loading?: boolean,
    action: string
}

export const BaseForm = <T extends FieldValues>({
    schema,
    defaultValues,
    onSubmit,
    children,
    loading = false,
    action
  }: BaseForm<T>) => {
      const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
      });
  
    return (
      <Form {...(form as UseFormReturn<FieldValues>)}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          {children(form)}
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    );
  };