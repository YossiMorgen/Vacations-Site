import {toast} from "react-toastify"
import "./Toastify.css"
class Toastify {
    private commonStyle = {
        position: toast.POSITION.BOTTOM_LEFT
    }
    public success(message: string) {
        toast.success(message, this.commonStyle);
    }

    public error(error: any) {
        toast.error(this.getErrorMessage(error), this.commonStyle);
    }

    public loading() {
        return toast.loading('loading...', this.commonStyle);
    }

    public message(message: string) {
        return toast.info(message, this.commonStyle);
    }

    public warning(message: string) {
        return toast.warning(message, this.commonStyle);
    }

    private getErrorMessage(err: any): string {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response.data;
        if (typeof err.message === "string") return err.message;
        return "Some error occurred, please try again later.";
    }

}

export default new Toastify();
