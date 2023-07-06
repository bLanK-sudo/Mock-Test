import { BsCheckCircleFill } from "solid-icons/bs";
import NavBar from "../components/NavBar";
import { error, setError } from "../../public/js/store";
import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { baseURL } from "../api/fetchGet";

const Forgot = () => {
  const ValidateEmail = (input) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) return true;
    else return false;
  };
  const navigate = useNavigate();
  let steps;
  let email;
  let verifyOtp;
  let changePWD;
  createEffect(() => {
    error();
    setTimeout(() => setError(null), 5000);
  });
  return (
    <>
      <div class="h-screen w-screen flex flex-col justify-center gap-4 items-center">
        <ul ref={steps} class="steps steps-vertical lg:steps-horizontal">
          <li class="step step-accent">Enter Email</li>
          <li class="step">Verify OTP</li>
          <li class="step">Change Password</li>
        </ul>
        <div ref={email} class="card shadow p-4 md:p-16 ">
          <div class="card-body">
            <div class="card-title flex-col">
              <h2>Enter your email</h2>
              <input
                type="email"
                id="email"
                class="input input-accent"
                required
              />
              <button
                onClick={async (el) => {
                  el.target.innerHTML =
                    "<div class='loading loading-spinner loading-sm'></div> Sending OTP...";
                  if (!ValidateEmail(document.getElementById("email"))) {
                    el.target.innerHTML = "Send OTP";
                    return setError("Please enter a valid email address");
                  }
                  try {
                    const response = await fetch(baseURL + "forgot-password/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: document.getElementById("email").value,
                      }),
                    });
                    console.log("clicking");

                    const data = await response.json();
                    if (!response.ok) {
                      el.target.innerHTML = "Send OTP";
                      setError(data.detail);
                      console.log(response);
                    }
                    if (data) {
                      console.log(data);
                      email.classList.add("hidden");
                      verifyOtp.classList.remove("hidden");
                      steps.children[0].setAttribute("data-content", "✓");
                      steps.children[1].classList.add("step-accent");
                    }
                  } catch (err) {
                    setError(
                      "Something went wrong. Please try again. If it keeps continuing, please contact us."
                    );
                    el.target.innerHTML = "Send OTP";
                  }
                }}
                class="btn btn-success">
                Send OTP
              </button>
            </div>
          </div>
        </div>
        <div ref={verifyOtp} class="card shadow hidden p-4 md:p-16 ">
          <div class="card-body">
            <div class="card-title flex-col">
              <h2>Enter your OTP</h2>
              <p class="text-sm">OTP has been sent to your email</p>
              <input type="text" id="otp" class="input input-accent" />
              <button
                onClick={async (el) => {
                  el.target.innerHTML =
                    "<div class='loading loading-spinner loading-sm'></div> Verifying OTP...";
                  if (document.getElementById("otp").value == "") {
                    el.target.innerHTML = "Verify OTP";
                    return setError("Please enter a valid OTP");
                  }
                  try {
                    const response = await fetch(baseURL + "verify-otp/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: document.getElementById("email").value,
                        otp: document.getElementById("otp").value,
                      }),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                      setError(data.detail);
                      el.target.innerHTML = "Verify OTP";
                      console.log(response);
                      return useNavigate("/login", { replace: true });
                    }
                    if (data && response.ok) {
                      verifyOtp.classList.add("hidden");
                      changePWD.classList.remove("hidden");
                      steps.children[1].setAttribute("data-content", "✓");
                      steps.children[2].classList.add("step-accent");
                      console.log(data);
                    }
                  } catch (err) {
                    el.target.innerHTML = "Verify OTP";
                    setError(
                      "Please Enter a valid OTP. If you have not received the OTP, please try again. If it keeps continuing, please contact us."
                    );
                  }
                }}
                class="btn btn-success">
                Verify OTP
              </button>
            </div>
          </div>
        </div>
        <div ref={changePWD} class="card hidden shadow p-4 md:p-16 ">
          <div class="card-body">
            <div class="card-title flex-col">
              <h2>Change your password</h2>
              <input type="text" id="change_pwd" class="input input-accent" />
              <button
                onClick={async (el) => {
                  try {
                    el.target.innerHTML =
                      "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Changing...";
                    const response = await fetch(
                      baseURL + "/reset-password-with-otp/",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: document.getElementById("email").value,
                          otp: document.getElementById("otp").value,
                          new_password:
                            document.getElementById("change_pwd").value,
                        }),
                      }
                    );
                    const data = await response.json();
                    if (!response.ok) {
                      el.target.innerHTML = "Change Password";
                      setError(data.message);
                      console.log(response);
                    }
                    if (data && response.ok) {
                      console.log(data);
                      steps.children[0].setAttribute("data-content", "✓");
                      steps.children[1].classList.add("step-accent");
                      setError(data.message);
                      navigate("/login", { replace: true });
                    }
                  } catch (err) {
                    setError(
                      "Something went wrong with the server. Please try again later. Or contact us."
                    );
                    navigate("/login", { replace: true });
                  }
                }}
                class="btn btn-success">
                Change Password
              </button>
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
    </>
  );
};

export default Forgot;
