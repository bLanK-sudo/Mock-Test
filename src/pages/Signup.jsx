import { createMutable } from "solid-js/store";
import { Motion } from "@motionone/solid";
import { error, setError } from "../../public/js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

const Signup = () => {
  let signUpBtn;
  const selectedCourses = createMutable([]);
  const navigate = useNavigate();
  setTimeout(() => {
    setError(null);
  }, 3000);
  const [courses, setCourses] = createSignal([]);
  const fetchCourses = async () => {
    const cr = await fetch(baseURL + "course/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await cr.json();
    setCourses(data);
  };
  fetchCourses();

  const setonclick = (el) => {
    let flag = true;
    for (let i = 0; i < selectedCourses.length; i++) {
      if (selectedCourses[i][0] == el.target.value) {
        flag = false;
      }
    }

    if (flag) {
      let val = el.target.value;
      let name = el.target.selectedOptions[0].innerText;
      selectedCourses.push([val, name]);
    }
  };

  return (
    <>
      <Motion
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.7, easing: "ease-in-out" }}>
        <div class="flex flex-col items-center justify-center min-h-screen pb-24">
          <div class="card bg-base-300 m-4">
            <h2 class="p-4 text-xl">SignUp</h2>
            <hr class="border border-accent" />
            <div class="card-body flex flex-col gap-4">
              <div class="card-title flex-col items-start">
                <label htmlFor="name">
                  Username <span class="text-sm">(case sensitive)</span>
                </label>
                <input
                  class="input input-bordered input-accent w-full"
                  type="text"
                  name="name"
                  id="name"
                  required
                />
                <label for="name">Email</label>
                <input
                  class="input input-bordered input-accent w-full"
                  type="email"
                  name="email"
                  id="email"
                  required
                />
                <label htmlFor="pwd">Password</label>
                <input
                  class="input input-bordered input-accent w-full"
                  type="password"
                  name="pwd"
                  id="pwd"
                  required
                />
                <label htmlFor="bio">Bio</label>
                <textarea
                  class="textarea textarea-bordered textarea-accent w-full"
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="4"></textarea>
                <label htmlFor="level">Level</label>
                <select
                  class="select select-accent w-full"
                  name="level"
                  id="level">
                  <option value="foundation">Foundational</option>
                  <option value="diploma">Diploma</option>
                  <option value="degree">Degree</option>
                </select>
                <Show when={courses()} fallback={<></>}>
                  <label htmlFor="courses">Select courses</label>
                  <select
                    onChange={(el) => {
                      setonclick(el);
                    }}
                    class="select select-accent w-full"
                    id="courses"
                    name="test">
                    <option disabled selected hidden>
                      Choose a subject
                    </option>
                    <For each={courses()}>
                      {(course) => {
                        return (
                          <option name={course.name} value={course.id}>
                            {course.name}
                          </option>
                        );
                      }}
                    </For>
                  </select>
                </Show>
                <div class="flex gap-2 flex-wrap w-full">
                  <For each={selectedCourses}>
                    {(course, i) => {
                      return (
                        <div class="flex justify-between gap-2 border border-accent">
                          <p class="p-2 px-4">{course[1]}</p>
                          <button
                            onClick={() => {
                              const index = selectedCourses.indexOf(course);
                              if (index > -1) {
                                selectedCourses.splice(index, 1);
                              }
                            }}
                            class="text-lg w-8 border-l-2 border-accent h-full flex justify-center items-center">
                            X
                          </button>
                        </div>
                      );
                    }}
                  </For>
                </div>
              </div>
              <div class="card-actions justify-center">
                <button
                  type="submit"
                  ref={signUpBtn}
                  class="btn btn-accent w-full"
                  onClick={async () => {
                    if (
                      document.getElementById("name").value == "" ||
                      document.getElementById("pwd").value == "" ||
                      document.getElementById("email").value == "" ||
                      document.getElementById("bio").value == ""
                    ) {
                      setError("Please fill all the fields");
                      return;
                    }
                    if (selectedCourses.length == 0) {
                      setError("Please select atleast one course");
                      return;
                    }

                    signUpBtn.innerHTML =
                      "<div class='loading loading-spinner loading-sm'></div> Signing Up...";
                    let courseArr = [];
                    for (let i = 0; i < selectedCourses.length; i++) {
                      courseArr[i] = selectedCourses[i][0];
                    }
                    try {
                      const response = await fetch(baseURL + "register/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          username: document.getElementById("name").value,
                          password: document.getElementById("pwd").value,
                          email: document.getElementById("email").value,
                          course_list: courseArr,
                          bio: document.getElementById("bio").value,
                        }),
                      });
                      console.log(response);
                      const data = await response.json();
                      if (!response.ok) {
                        signUpBtn.innerHTML = "Sign Up";
                        console.log(data.message[0]);
                        setError(data.message);
                      } else {
                        console.log(data);
                        if (data) {
                          console.log("working");
                          navigate("/login", { replace: true });
                        }
                        setError(data.message);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}>
                  Sign Up
                </button>
                <div class="p-4">
                  Don't have an account?{" "}
                  <A href="/login" class="link">
                    Login
                  </A>
                </div>
              </div>
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
                    <p class="text-xl text-red-500 font-semibold"> {err} </p>
                  );
                }}
              </For>
            )}
          </div>
        </div>
      </Motion>
    </>
  );
};

export default Signup;
