import { CldUploadWidget } from "next-cloudinary"
import { Button } from "../ui/button"
import { ImagePlus } from "lucide-react"

interface BaseUpload {
    onUpload: (result: any) => void
    disabled: boolean
}
const BaseUpload = ({ onUpload, disabled }: BaseUpload) => {
    return (
        <CldUploadWidget onSuccess={onUpload} uploadPreset="bn5dywki">
            {({ open }) => {
                const onClick = () => {
                    open()
                }
                return (
                    <Button
                        type="button"
                        disabled={disabled}
                        variant="secondary"
                        onClick={onClick}>
                        <ImagePlus className="w-4 h-4 mr-2" />
                        Upload Image
                    </Button>
                )
            }}
        </CldUploadWidget>
    )
}


export default BaseUpload