import {create} from "zustand"
import axios from "axios";
import toast from "react-hot-toast";
import db from "../db";
import { useParams, useRouter } from "next/navigation"

interface SettingsStore {
    open: boolean
    loading: boolean
    setOpen: (value: boolean) => void
    setLoading: (value: boolean) => void
    onSubmit: (storeId: null, data: null) => Promise<void>
    onDelete: (storeId: string) => Promise<void>
}

const useSettingsStore = create<SettingsStore>((set) => ({
    open: false,
    loading: false,
    setOpen: (value) => set({ open: value }),
    setLoading: (value) => set({ loading: value }),

    onSubmit: async (storeId, data) => {
        
    },

    onDelete: async (storeId) => {
        const router = useRouter()
        try {
            set({ loading: true })
            await axios.delete(`/api/stores/${storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Toko berhasil dihapus")
        } catch (error) {
            toast.error("Cek kembali data dan koneksi mu")
        } finally {
            set({ loading: false, open: false })
        }
    },
}))

export default useSettingsStore