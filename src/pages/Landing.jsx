import { Motion } from "@motionone/solid";
import { A } from "@solidjs/router";

const Landing = () => {

    return (
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>




        <div className="flex flex-col items-center justify-center min-h-screen gap-8 font-poppins">
            <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-4xl font-bold flex flex-col md:block text-center">Welcome to the <A href="https://github.com/" class=""><span class="bg-accent px-4 text-accent-content">Mock Test</span></A> App</h1>
                <p class="text-center p-4 badge shadow">Landing page is still under construction</p>
            </div>
            <div className="flex gap-16">
                <A href="/login" class="btn btn-warning px-8">Login</A>
                <A href="/signup" class="btn btn-info px-8">SignUp</A>
            </div>
        </div>
    </Motion>
    )
}

export default Landing;