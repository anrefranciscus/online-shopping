"use client"

import { BaseForm } from "@/components/base/base-form"
import { BaseFormField } from "@/components/base/base-form-field"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hook/use-origin"
import { Store } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(2)
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter()
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Toko berhasil di update");
    } catch (error) {
      toast.error("Cek kembali data yang diinput");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Toko berhasil dihapus");
    } catch (error) {
      toast.error("Cek kembali data dan koneksi mu");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Atur Toko" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <BaseForm
        schema={formSchema}
        defaultValues={initialData}
        onSubmit={onSubmit}
        loading={loading}
        action="Save"
      >
        {(form) => (
          <div className="grid grid-cols-3 gap-8">
            <BaseFormField
              control={form.control}
              name="name"
              label="Nama Toko"
              placeholder="Nama Toko"
              disabled={loading}
            />
          </div>
        )}
      </BaseForm>
      <Separator />
      <ApiAlert
        title="PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public" />
    </>
  )
}