import { BsArrowDownCircleFill, BsPencilFill } from "solid-icons/bs"
import NavBar from "../components/NavBar"
import { useNavigate } from "@solidjs/router"
import { fetchUser } from "../api/fetchGet"
import { isAuthenticated, setError, setUser, user } from "../../public/js/store"

const Profile = () => {
    fetchUser()
    const navigate = useNavigate()
    if(!isAuthenticated()) {setError("You are not logged in!!"); return navigate("/login", {replace:true})}
    console.log(user());
    return(
        <>
            <NavBar />
            <div class="flex flex-col mb-24">
                <div class="h-[40vh] card m-2 relative bg-[url(/images/try.webp)] bg-cover bg-no-repeat">
                    
                    <div class="absolute -bottom-24 flex justify-center items-center rounded-full left-0 right-0 m-auto w-48 h-48 bg-base-100">
                        <Show when={user()}>
                            <img src={user().dp} class="w-[10rem] h-[10rem]" alt="" />
                        </Show>
                        <dialog id="pfp" class="modal">
                            <form method="dialog" class="modal-box">
                                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <h3 class="font-bold text-lg text-accent">Change Profile Picture</h3>
                                <p class="py-4">Press ESC key or click on ✕ button to close</p>
                            </form>
                        </dialog>
                        <div class="absolute cursor-pointer right-0 m-auto top-2">
                            <div onClick={()=>window.pfp.showModal()} class="badge badge-primary">edit</div>
                        </div>
                    </div>
                </div>
                <Show when={user()} fallback={<>
                                <div class="flex flex-col justify-center items-center gap-4">
                                    <span class="h-8 w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                                    <span class="h-8 w-24 inline-block bg-base-300 rounded-full animate-pulse"></span>
                                </div>
                    </>}>
                    {console.log(user())}
                    <div class="name text-xl pt-32 m-auto text-center">
                        <p class="text-5xl">{user().username}</p>
                        <p style="font-variant:small-caps;" class="font-montserrat font-light ">diploma</p>
                        <div class="relative">
                            <Show when={user().user} fallback={<>
                                <div class="flex flex-col justify-center items-center gap-4">
                                    <span class="h-8 w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                                </div>
                            </>}>
                                <p class="font-[200] pt-4">{user().user.email}</p>
                            </Show>
                            <dialog id="email" class="modal">
                                <form method="dialog" class="modal-box">
                                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    <h3 class="font-bold text-lg text-accent text-left">Change Email</h3>
                                    <p class="py-4 text-left text-base">Press ESC key or click on ✕ button to close</p>
                                </form>
                            </dialog>
                            <div class="absolute top-4 -right-8 cursor-pointer">
                                <BsPencilFill onClick={()=>window.email.showModal()} class="text-primary" />
                            </div>
                        </div>
                    </div>
                </Show>
                <div>
                    <p class="text-center p-4 text-xl font-thin">just a bLanK homosapien</p>
                </div>
                <div class="text-center pt-24 font-light flex justify-center items-center gap-2">
                    Scroll Down
                    <BsArrowDownCircleFill />    
                </div>
                <div class="flex flex-wrap pt-64">
                    <div class="card w-full bg-accent text-accent-content m-2">
                        <div class="card-body">
                            <div class="flex justify-center items-center lg:justify-between flex-col lg:flex-row gap-4">
                                <h1 class="font-bold text-4xl w-max">Subjects Picked</h1>
                                <div class="flex gap-2 flex-wrap  justify-center items-center">
                                    <Show when={user().courses} fallback={<>Loading...</>}>
                                        <For each={user().courses}>{
                                            (course) => {
                                                return <div class="btn">{course.code}</div>
                                            }
                                        }</For>
                                    </Show>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile