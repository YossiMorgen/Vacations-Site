import { useEffect } from "react";

function useTitle(title: string) {

    useEffect(() => {
        document.title = "Vacations site | " + title;
    }, [title])

}

export default useTitle;