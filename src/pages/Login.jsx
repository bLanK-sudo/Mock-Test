import { useNavigate } from "@solidjs/router";
import { Motion } from "@motionone/solid";
import { error, setError, setIsAuthenticated } from "../../public/js/store.js";
import { A } from "@solidjs/router";
import { createEffect } from "solid-js";

const Login = () => {
  let loginBtn;
  const navigate = useNavigate();
  createEffect(() => {
    error();
    setTimeout(() => {
      setError(null);
    }, 3000);
  });

  return (
    <>
      <Motion
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.7, easing: "ease-in-out" }}>
        <div class="flex flex-col items-center justify-center min-h-screen">
          <div class="card bg-base-300 m-4">
            <h2 class="p-4 text-xl">Login</h2>
            <hr class="border border-accent" />
            <div class="card-body flex flex-col gap-4">
              <div class="card-title flex-col items-start">
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
              </div>
              <div class="card-actions justify-end">
                <A class="link" href="/forgot_pwd">
                  Forgot Password?
                </A>
              </div>
              <div class="card-actions justify-center">
                <button
                  type="submit"
                  ref={loginBtn}
                  class="btn btn-accent w-full"
                  onClick={async () => {
                    console.log(
                      document.getElementById("email").value,
                      document.getElementById("pwd").value
                    );
                    try {
                      loginBtn.innerHTML =
                        "<div class='loading loading-spinner loading-sm'></div> Logging In...";
                      const response = await fetch(baseURL + "api/token/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: document.getElementById("email").value,
                          password: document.getElementById("pwd").value,
                        }),
                      });
                      const data = await response.json();
                      if (!response.ok) {
                        loginBtn.innerHTML = "Log In";
                        setError(data.email || data.password || data.detail);
                      } else {
                        if (data) setIsAuthenticated(true);
                        localStorage.setItem("token", data.access);
                        localStorage.setItem("authenticated", "true");
                        navigate("/home", { replace: true });
                        console.log(data);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}>
                  Log In
                </button>
                <div class="p-4">
                  Don't have an account?{" "}
                  <A href="/signup" class="link">
                    Sign Up
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

export default Login;
