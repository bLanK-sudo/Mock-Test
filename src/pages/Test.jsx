import { useNavigate } from "@solidjs/router";
import { fetchAns, fetchTest } from "../api/fetchGet";
import NavBar from "../components/NavBar";
import { Show, createSignal } from "solid-js";
import { isAuthenticated, setError } from "../../public/js/store";

const qnType = (e) => {
  if (e == "SCQ") return "radio";
  else if (e == "MCQ") return "checkbox";
  else if (e == "Short" || e == "Text") return "text";
  else if (e == "Numeric") return "number";
  else return "textarea";
};

const Test = (id) => {
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    setError("You are not logged in!!");
    return navigate("/login", { replace: true });
  }
  const [test, setTest] = createSignal(null);
  const [qnId, setqnId] = createSignal([]);
  const [result, setResult] = createSignal(null);
  const [submit, setSubmit] = createSignal(false);
  const [start, showStart] = createSignal(false);
  const [all, setAll] = createSignal(false);
  const [completed, setCompleted] = createSignal(0);
  const [notCompleted, setNotCompleted] = createSignal(0);
  const [totalTime, setTotalTime] = createSignal(0);
  const [startTimer, setStartTimer] = createSignal(0);
  const [currentQn, setCurrentQn] = createSignal(0);
  const selected = {};
  const timer = {};
  let qn = [];
  let mainQnDiv;
  let ansDiv;
  fetchTest(setqnId, setTest, test, qn);
  let count = 0;
  let startingTime = Date.now();
  let fullTime = Date.now();
  setInterval(() => {
    setTotalTime(Date.now() - startingTime);
  },1000)
  const msToTime = (duration) => {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 1 ? false : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours
      ? hours > 1
        ? hours +
          " hrs " +
          minutes +
          (minutes > 1 ? " mins " : " min ") +
          seconds +
          (seconds > 0 ? " secs" : " sec ")
        : hours +
          " hr " +
          minutes +
          (minutes > 1 ? " mins " : " min ") +
          seconds +
          (seconds > 0 ? " secs" : " sec ")
      : minutes +
          (minutes > 1 ? " mins " : " min ") +
          seconds +
          (seconds > 0 ? " secs" : " sec ");
  };
  return (
    <>
      <NavBar />
      {start() && (
        <div class="fixed inset-0 w-screen m-auto h-screen bg-accent z-10 text-xl">
          <div class="flex flex-col justify-center items-center h-full">
            <p class="p-4">This is just a page before ur test.</p>
            <p class="p-4"> Where you wait until ur test data loads</p>
            <div class="">
              <Show when={test()} fallback={<p>Loading.....</p>}>
                <div class="">
                  <button
                    class="btn"
                    onClick={(el) => {
                      setCurrentQn(qnId()[0]);
                      setStartTimer(Date.now());
                      showStart(false);
                      document
                        .getElementsByName(qnId()[0])[0]
                        .classList.add("bg-error", "text-error-content");
                    }}>
                    START THE TEST
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </div>
      )}
      <div class="card bg-accent text-accent-content p-4 m-2">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-sm md:text-xl font-archivo">
            Machine Learning Foundations
          </h3>
          <button class="text-sm md:btn">{msToTime(totalTime())}</button>
        </div>
      </div>
      <div class="flex flex-col lg:grid lg:grid-cols-3 mb-24">
        <Show when={test()} fallback={<>Loading....</>}>
          <For each={test().questions}>
            {(qn, i) => {
              return (
                <>
                  <div
                    ref={mainQnDiv}
                    class={`qns qns${
                      qn.qn_no
                    } card m-2 bg-base-300 col-span-2 ${
                      i() != 0 ? "hidden" : ""
                    }`}>
                    <div class="flex justify-between p-4">
                      <h2>Question {i() + 1}</h2>
                      <p>Marks : {qn.marks}</p>
                    </div>
                    <hr class="border border-accent" />
                    <div class="card-body">
                      <div class="card-actions flex-col">
                        <div class="card-title flex-col items-start">
                          {qn.images && (
                            <For each={qn.images}>
                              {(img) => {
                                return (
                                  <>
                                    <img src={img} class="cursor-pointer p-2 bg-white rounded-lg" />
                                  </>
                                );
                              }}
                            </For>
                          )}
                          <p class="p-2">
                            {qn.text == null ? "null" : qn.text}
                          </p>
                          <div
                            ref={ansDiv}
                            class="form-control flex flex-col gap-4"
                            id={`form${qn.qn_no}`}>
                            {qn.type == "Numeric" && (
                              <input
                                class="input input-bordered input-accent"
                                type="number"
                                onChange={(el) => {
                                  document
                                    .getElementById("save" + qn.qn_no)
                                    .classList.remove(
                                      "bg-success",
                                      "text-success-content"
                                    );
                                  document.getElementById(
                                    "save" + qn.qn_no
                                  ).innerText = "SAVE";
                                  document
                                    .getElementsByName(qn.qn_no)[0]
                                    .classList.remove(
                                      "bg-success",
                                      "text-success-content"
                                    );
                                  document
                                    .getElementsByName(qn.qn_no)[0]
                                    .classList.add(
                                      "bg-error",
                                      "text-error-content"
                                    );
                                  console.log("ur reverting");
                                }}
                                name={"q" + qn.qn_no}
                                id={qn.id}
                              />
                            )}
                            {qn.type == "Text" && (
                              <input
                                class="input input-bordered input-accent"
                                type="text"
                                onChange={(el) => {
                                  document
                                    .getElementById("save" + qn.qn_no)
                                    .classList.remove(
                                      "bg-success",
                                      "text-success-content"
                                    );
                                  document.getElementById(
                                    "save" + qn.qn_no
                                  ).innerText = "SAVE";
                                  document
                                    .getElementsByName(qn.qn_no)[0]
                                    .classList.remove(
                                      "bg-success",
                                      "text-success-content"
                                    );
                                  document
                                    .getElementsByName(qn.qn_no)[0]
                                    .classList.add(
                                      "bg-error",
                                      "text-error-content"
                                    );
                                  console.log("ur reverting");
                                }}
                                name={"q" + qn.qn_no}
                                id={qn.qn_no}
                              />
                            )}
                            {qn.type == "SCQ" && (
                              <For each={qn.choices}>
                                {(ans, i) => {
                                  return (
                                    <div class="flex gap-2 items-center min-w-[16]">
                                      <input
                                        class="radio radio-accent"
                                        onChange={(el) => {
                                          document
                                            .getElementById("save" + qn.qn_no)
                                            .classList.remove(
                                              "bg-success",
                                              "text-success-content"
                                            );
                                          document.getElementById(
                                            "save" + qn.qn_no
                                          ).innerText = "SAVE";
                                          document
                                            .getElementsByName(qn.qn_no)[0]
                                            .classList.remove(
                                              "bg-success",
                                              "text-success-content"
                                            );
                                          document
                                            .getElementsByName(qn.qn_no)[0]
                                            .classList.add(
                                              "bg-error",
                                              "text-error-content"
                                            );
                                        }}
                                        type="radio"
                                        id={ans.id}
                                        name={"q" + qn.qn_no}
                                        value={ans.id}
                                      />

                                      {ans.image ? (
                                        ans.image instanceof Array ? (
                                          <For each={ans.image}>
                                            {(img) => {
                                              <label
                                                for={ans.id}
                                                class="cursor-pointer">
                                                {" "}
                                                <img
                                                  src={img}
                                                  class="  p-2 bg-white rounded-lg"
                                                />
                                              </label>;
                                            }}
                                          </For>
                                        ) : (
                                          <label
                                            for={ans.id}
                                            class="cursor-pointer">
                                            {" "}
                                            <img
                                              src={ans.image}
                                              class=" p-2 bg-white rounded-lg"
                                            />
                                          </label>
                                        )
                                      ) : (
                                        <label
                                          class="w-16 min-w-max cursor-pointer p-2"
                                          for={ans.id}>
                                          {ans.text == null ? "null" : ans.text}
                                        </label>
                                      )}
                                    </div>
                                  );
                                }}
                              </For>
                            )}
                            {qn.type == "MCQ" && (
                              <For each={qn.choices}>
                                {(ans, i) => {
                                  return (
                                    <div class="flex gap-2 items-center">
                                      <input
                                        class="checkbox checkbox-accent"
                                        onChange={(el) => {
                                          document
                                            .getElementById("save" + qn.qn_no)
                                            .classList.remove(
                                              "bg-success",
                                              "text-success-content"
                                            );
                                          document.getElementById(
                                            "save" + qn.qn_no
                                          ).innerText = "SAVE";
                                          document
                                            .getElementsByName(qn.qn_no)[0]
                                            .classList.remove(
                                              "bg-success",
                                              "text-success-content"
                                            );
                                          document
                                            .getElementsByName(qn.qn_no)[0]
                                            .classList.add(
                                              "bg-error",
                                              "text-error-content"
                                            );
                                        }}
                                        type="checkbox"
                                        id={"mcq" + ans.id}
                                        name={"q" + qn.qn_no}
                                        value={ans.id}
                                      />
                                      {ans.image ? (
                                        ans.image instanceof Array ? (
                                          <For each={ans.image}>
                                            {(img) => {
                                              <label
                                                for={"mcq" + ans.id}
                                                class="cursor-pointer">
                                                {" "}
                                                <img
                                                  src={img}
                                                  class=" p-2 bg-white rounded-lg"
                                                />
                                              </label>;
                                            }}
                                          </For>
                                        ) : (
                                          <label
                                            for={"mcq" + ans.id}
                                            class="cursor-pointer">
                                            {" "}
                                            <img
                                              src={ans.image}
                                              class=" p-2 bg-white rounded-lg"
                                            />
                                          </label>
                                        )
                                      ) : (
                                        <label
                                          class="w-16 min-w-max cursor-pointer p-2"
                                          for={ans.id}>
                                          {ans.text == null ? "null" : ans.text}
                                        </label>
                                      )}
                                    </div>
                                  );
                                }}
                              </For>
                            )}
                          </div>
                        </div>
                        <button
                          id={"save" + qn.qn_no}
                          onClick={(e) => {
                            let ans = document.getElementById(`form${qn.qn_no}`);
                            console.log(ans);
                            let ansArr;

                            if (qn.type == "Text") {
                              ansArr = "";
                              ansArr = ans.children[0].value;
                            } else if (qn.type == "Numeric") {
                              ansArr = "";
                              ansArr = ans.children[0].value;
                            } else {
                              ansArr = [];
                              Object.values(ans.children).forEach((el) => {
                                if (el.childNodes[0].checked) {
                                  console.log(el.childNodes[0]);
                                  ansArr.push(el.childNodes[0].value);
                                }
                              });
                            }
                            selected[qn.qn_no] = ansArr;
                            let flag = true;
                            qnId().forEach((el) => {
                              if (
                                !selected[el] ||
                                (selected[el] && selected[el].length <= 0)
                              )
                                flag = false;
                            });
                            setAll(flag);
                            if (
                              (qn.type == "MCQ" || qn.type == "SCQ") &&
                              selected[qn.qn_no].length > 0
                            ) {
                              e.target.classList.add(
                                "bg-success",
                                "text-success-content"
                              );
                              e.target.innerText = "SAVED";
                              document
                                .getElementsByName(qn.qn_no)[0]
                                .classList.remove(
                                  "bg-error",
                                  "text-error-content"
                                );
                              document
                                .getElementsByName(qn.qn_no)[0]
                                .classList.add(
                                  "bg-success",
                                  "text-success-content"
                                );
                            } else if (
                              (qn.type == "Text" || qn.type == "Numeric") &&
                              ans[1].children[0].value.length > 0
                            ) {
                              e.target.classList.add("bg-success");
                              e.target.innerText = "SAVED";
                              document
                                .getElementsByName(qn.qn_no)[0]
                                .classList.remove(
                                  "bg-error",
                                  "text-error-content"
                                );
                              document
                                .getElementsByName(qn.qn_no)[0]
                                .classList.add(
                                  "bg-success",
                                  "text-success-content"
                                );
                            } else {
                              e.target.innerText =
                                "COMPLETE ANSWER BEFORE SAVING";
                              e.target.classList.remove(
                                "bg-success",
                                "text-success-content"
                              );
                              document
                                .getElementsByName(qn.qn_no)[0]
                                .classList.add("bg-error");
                              setTimeout(() => {
                                e.target.innerText = "SAVE";
                              }, 2000);
                            }
                          }}
                          class="btn btn-accent text-accent-content m-4 ml-0 w-max">
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </For>
        </Show>
        <div class="card m-2 bg-base-300 col-span-1">
          <h2 class="p-4">Question Numbers</h2>
          <hr class="border border-accent" />
          <div class="card-body justify-between">
            <div class="grid grid-cols-4 gap-4">
              <Show
                when={qnId()}
                fallback={
                  <>
                    <p>Hello World</p>
                  </>
                }>
                <Show when={test()}>
                  <For each={qnId()}>
                    {(id, i) => {
                      return (
                        <>
                          <button
                            class="btn btn-accent border-none"
                            name={id}
                            onClick={(el) => {
                              if (timer[currentQn()]) {
                                timer[currentQn()] += Date.now() - startTimer();
                              } else {
                                timer[currentQn()] = Date.now() - startTimer();
                              }
                              setStartTimer(Date.now());
                              setCurrentQn(id);
                              Object.values(
                                document.getElementsByClassName("qns")
                              ).forEach((el) => {
                                el.classList.add("hidden");
                              });
                              document
                                .querySelector(".qns" + id)
                                .classList.remove("hidden");
                              if (!selected[id]) {
                                el.target.classList.add("bg-error");
                              } else if (selected[id].length == 0) {
                                el.target.classList.add("bg-error");
                              }
                              console.log(selected);
                            }}>
                            {i() + 1}
                          </button>
                        </>
                      );
                    }}
                  </For>
                </Show>
              </Show>
            </div>
            <div class="card-actions justify-end">
              <button
                class={`btn px-16 ${all() ? "bg-success" : "bg-error"}`}
                onClick={() => {
                  fullTime = Date.now() - startingTime;
                  setSubmit(true);
                  if (timer[currentQn()]) {
                    timer[currentQn()] += Date.now() - startTimer();
                  } else {
                    timer[currentQn()] = Date.now() - startTimer();
                  }
                  fetchAns(setResult, test, selected);
                  console.log(selected);
                }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {submit() && (
        <div className="absolute inset-0 z-0 flex justify-center items-center bg-accent">
          {Object.values(selected).forEach((el) => {
            if (el.length > 0) count += 1;
          })}
          <div class="card bg-base-100">
            <h2 class="p-4">Results</h2>
            <hr class="border border-accent" />
            <div class="card-body">
              <div class="card-title flex-col items-start">
                <p>Attempted : {count}</p>
                <p>Not Attempted : {qnId().length - count} </p>
                <p>Total Time : {msToTime(fullTime)}</p>

                <p class="flex gap-2">
                  Score :
                  <Show
                    when={result()}
                    fallback={
                      <div class="flex flex-col justify-center items-center gap-4">
                        <span class="h-8 w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                      </div>
                    }>
                    {" "}
                    {result().score}
                  </Show>
                </p>
              </div>
              <div class="card-actions justify-end m-4">
                <button
                  onClick={() => navigate("/mock")}
                  class="btn btn-primary px-16">
                  DONE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {console.log("selected array: ", selected)}
      {console.log("timer: ", timer)}
    </>
  );
};

export default Test;
