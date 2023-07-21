import {
  BsArrowDownCircleFill,
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsPencilFill,
} from "solid-icons/bs";
import { VsVerifiedFilled } from "solid-icons/vs";
import NavBar from "../components/NavBar";
import { A, useNavigate } from "@solidjs/router";
import { baseURL, fetchUser } from "../api/fetchGet";
import {
  error,
  isAuthenticated,
  setError,
  setUser,
  user,
} from "../../public/js/store";
import { createSignal } from "solid-js";

const Profile = () => {
  document.title = "Profile";
  let pfp;
  let closeBtn;
  let close;
  fetchUser();
  const [selectedImg, setSelectedImg] = createSignal(null);
  const navigate = useNavigate();
  let err;
  if (!isAuthenticated()) {
    setError("You are not logged in!!");
    return navigate("/login", { replace: true });
  }
  return (
    <>
      <NavBar />
      <div class="flex flex-col mb-24">
        <div class="h-[40vh] card m-2 relative bg-[url(/images/bg.webp)] bg-cover bg-no-repeat">
          <div class="absolute -bottom-24 flex justify-center items-center rounded-full left-0 right-0 m-auto w-48 h-48 bg-base-100">
            <Show
              when={user()}
              fallback={
                <>
                  <div class="w-[80%] h-[80%] rounded-full bg-base-300 animate-pulse"></div>
                </>
              }>
              <img
                ref={pfp}
                src={user().dp}
                class="w-[10rem] h-[10rem]"
                alt=""
              />
            </Show>
            <dialog id="pfp" class="modal">
              <form method="dialog" class="modal-box">
                <button
                  ref={closeBtn}
                  class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <h3 class="font-bold text-lg text-accent">
                  Change Profile Picture
                </h3>
                <div class="flex flex-wrap justify-center items-center gap-4 py-16">
                  <For each={new Array(12)}>
                    {(item, index) => {
                      return (
                        <img
                          src={`/public/images/avatar${index() + 1}.svg`}
                          class="w-32 h-32 rounded-full cursor-pointer p-2 btn btn-ghost hover:bg-accent"
                          onClick={(e) => {
                            Object.values(
                              e.target.parentElement.children
                            ).forEach((element) => {
                              if (
                                element.classList.contains(
                                  "bg-accent",
                                  "shadow-xl"
                                )
                              ) {
                                element.classList.remove(
                                  "bg-accent",
                                  "shadow-xl"
                                );
                                setSelectedImg(null);
                              }
                            });
                            e.target.classList.add("bg-accent", "shadow-xl");
                            setSelectedImg(e.target.src);
                          }}
                          alt=""
                        />
                      );
                    }}
                  </For>
                </div>
                <div
                  ref={err}
                  class="p-4 text-center font-bold text-error"></div>
                <div class="flex justify-end">
                  <div
                    onClick={(el) => {
                      if (selectedImg() === null) {
                        err.innerText = "Please select an image";
                        setTimeout(() => {
                          err.innerText = "";
                        }, 4000);
                      } else {
                        err.innerText = "";
                        const fetchProfile = async () => {
                          el.target.innerHTML = "Updating...";
                          console.log(el.target.innerHTML);
                          try {
                            const response = await fetch(
                              baseURL + "update-profile/",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization:
                                    "Bearer " + localStorage.getItem("token"),
                                },
                                body: JSON.stringify({ dp: selectedImg() }),
                              }
                            );
                            if (!response.ok) {
                              el.target.innerText = "Ok";
                              return setError(data.message);
                            }
                            const data = await response.json();
                            console.log(data);
                            pfp.src = selectedImg();
                            el.target.innerHTML = "Updated";
                            setTimeout(() => {
                              el.target.innerHTML = <>Change</>;
                            }, 2000);
                            closeBtn.click();
                            console.log(selectedImg());
                          } catch (err) {
                            el.target.innerText = "Ok";
                            console.log(err);
                          }
                        };
                        fetchProfile();
                      }
                    }}
                    class="btn btn-info">
                    Ok <BsCheckCircleFill />
                  </div>
                </div>
              </form>
            </dialog>
            <div class="absolute cursor-pointer right-0 m-auto top-2">
              <div
                onClick={() => window.pfp.showModal()}
                class="badge badge-primary">
                edit
              </div>
            </div>
          </div>
        </div>
        <Show
          when={user()}
          fallback={
            <>
              <div class="flex flex-col justify-center items-center gap-4 p-4 pt-32">
                <span class="h-8 w-48 md:w-56 inline-block bg-base-300 rounded-full animate-pulse"></span>
                <span class="h-8 w-32 inline-block bg-base-300 rounded-full animate-pulse"></span>
              </div>
            </>
          }>
          <div class="name text-xl pt-32 m-auto text-center">
            <p class="text-5xl">{user().username}</p>
            <Show when={user()}>
              <Show when={user().courses}>
                <p
                  style="font-variant:small-caps;"
                  class="font-montserrat font-light ">
                  {user().courses[0].level.name.toLowerCase()}
                </p>
              </Show>
            </Show>
            <div class="relative">
              <Show
                when={user().user}
                fallback={
                  <>
                    <div class="flex flex-col justify-center items-center gap-4">
                      <span class="h-8 w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                    </div>
                  </>
                }>
                <Show when={user()}>
                  <Show when={user().user}>
                    {user().user.emailVerified ? (
                      <div class="absolute top-5 -left-8 cursor-pointer">
                        <VsVerifiedFilled class="text-info" />
                      </div>
                    ) : (
                      <>
                        <div class="absolute top-5 -left-8 cursor-pointer">
                          <BsExclamationCircleFill
                            onClick={() => window.verify.showModal()}
                            class="text-warning"
                          />
                        </div>
                        <dialog id="verify" class="modal">
                          <form method="dialog" class="modal-box">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                            <h3 class="font-bold text-lg text-accent text-left">
                              Verify Email
                            </h3>
                            <p class="py-4 text-left text-base">
                              Click on the button below to send a verification
                              link to your linked email address.
                            </p>
                            <div class="flex justify-end">
                              <button class="btn btn-info">Verify</button>
                            </div>
                          </form>
                        </dialog>
                      </>
                    )}
                  </Show>
                </Show>
                <p class="font-[200] pt-4">{user().user.email}</p>
              </Show>
              <dialog id="new_email" class="modal">
                <form method="dialog" class="modal-box">
                  <button
                    ref={close}
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 class="font-bold text-lg text-accent text-left">
                    Change Email
                  </h3>
                  <div class="py-8 text-left text-base flex justify-center items-center">
                    <div class="w-full flex flex-col">
                      <input
                        id="email"
                        type="email"
                        class="input input-accent mt-2"
                      />
                    </div>
                  </div>
                  <div class="flex justify-center items-center flex-wrap flex-col">
                    {typeof error() == "string" ? (
                      <p class="text-xs lg:text-base border-2 border-red-500 text-red-500 font-semibold px-4">
                        {" "}
                        {error()}{" "}
                      </p>
                    ) : (
                      <For each={error()}>
                        {(err, i) => {
                          return (
                            <p class="text-xl text-red-500 font-semibold">
                              {" "}
                              {err}{" "}
                            </p>
                          );
                        }}
                      </For>
                    )}
                  </div>
                  <div class="flex justify-end">
                    <button
                      onClick={(el) => {
                        const fetchEmail = async () => {
                          try {
                            el.target.innerHTML = "Updating...";
                            const response = await fetch(
                              baseURL + "update-profile/",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization:
                                    "Bearer " + localStorage.getItem("token"),
                                },
                                body: JSON.stringify({
                                  email: document.getElementById("email").value,
                                }),
                              }
                            );
                            const data = await response.json();
                            if (!response.ok) {
                              console.log("this");
                              return setError(data.message);
                            }
                            console.log(data);
                            close.click();
                            el.target.innerHTML = "Updated";
                            setTimeout(() => {
                              el.target.innerHTML = <>Update</>;
                            }, 2000);
                          } catch (err) {
                            el.target.innerHTML = <>Update</>;
                            console.log("something went wrong");
                            setError("Something Went Wrong!!");
                            console.log(err);
                          }
                        };
                        if (document.getElementById("email").value == "")
                          return setError("Please enter an email");
                        else fetchEmail();
                      }}
                      class="btn btn-info">
                      Update
                    </button>
                  </div>
                </form>
              </dialog>
              <div class="absolute top-4 -right-8 cursor-pointer">
                <BsPencilFill
                  onClick={() => window.new_email.showModal()}
                  class="text-primary"
                />
              </div>
            </div>
          </div>
        </Show>
        <div>
          <Show
            when={user()}
            fallback={
              <>
                <div class="flex flex-col justify-center items-center gap-4">
                  <span class="h-8 w-72 md:w-96 inline-block bg-base-300 rounded-full animate-pulse"></span>
                </div>
              </>
            }>
            <p class="text-center p-4 text-xl font-thin">{user().bio}</p>
          </Show>
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
                  <Show when={user()} fallback={<>Loading...</>}>
                    <Show when={user().courses}>
                      <For each={user().courses}>
                        {(course) => {
                          return (
                            <A
                              href={`/subjects/${course.id}`}
                              class="badge p-4 md:btn">
                              {course.name}
                            </A>
                          );
                        }}
                      </For>
                    </Show>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
