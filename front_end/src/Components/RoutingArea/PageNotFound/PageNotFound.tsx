import useTitle from "../../../Utils/useTitle"
import "./PageNotFound.css"

export default function PageNotFound(){
    
    useTitle("Page Not Found")

    return (
        <div className="PageNotFound">

            <iframe width="560" height="315" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true" allow="autoplay" title="Page not Found"></iframe>

        </div>
    )
}