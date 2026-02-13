
import toast from "react-hot-toast"
const AxiosToasrError=(error)=>{
    toast.error(
        error?.response?.data?.message
    )

}

export default AxiosToasrError