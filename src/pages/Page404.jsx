import { A } from "@solidjs/router"
import { Motion } from "@motionone/solid"





const PageNotFound = () => {

    document.title = "404"

    return (
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <div class="h-screen w-screen flex justify-center items-center">
            <div class="card w-96 bg-primary text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">404</h2>
                    <p>The page you are looking for is not available</p>
                    <div class="card-actions justify-end">
                    <A href="/home" class="link">Go Back</A>
                    </div>
                </div>
            </div>
        </div>
        </Motion>
    )
}

export default PageNotFound