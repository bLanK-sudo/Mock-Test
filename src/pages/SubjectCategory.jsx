import { Motion } from "@motionone/solid";
import NavBar from "../components/NavBar";
import { createSignal } from "solid-js";
import { baseURL } from "../api/fetchGet";
import { FiExternalLink } from "solid-icons/fi";
import { A, useNavigate, useParams } from "@solidjs/router";
import { isAuthenticated, setError } from "../../public/js/store";

const SubjectCategory = (id) => {
  document.title = "Subjects";
  const navigate = useNavigate()
  const param = useParams();
  const [subjects, setSubjects] = createSignal(null);
  const q1 = [];
  const q2 = [];
  const et = [];
  if (!isAuthenticated()) {
    setError("You are not logged in!!");
    return navigate("/login", { replace: true });
  }
  const fetchSubjects = async (id) => {
    try {
      console.log("fetching data");
      const response = await fetch(baseURL + "qp/get_by_course/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (!response.ok) return setError("Unable to fetch subjects");
      console.log(data);
      data.forEach((sub) => {
        if (sub.type == "Quiz1") q1.push(sub);
        else if (sub.type == "Quiz2") q2.push(sub);
        else et.push(sub);
      });
      setSubjects(data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchSubjects(param.id);
  return (
    <>
      <Motion
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.7, easing: "ease-in-out" }}>
        <NavBar />
        <div class="my-8 flex flex-col gap-16 mb-24">
          <div class="collapse collapse-plus border-2 border-accent w-[90vw] m-auto p-4 md:p-8">
            <input type="checkbox" />
            <div class="collapse-title text-xl md:text-2xl font-bold">
              Quiz 1
            </div>

            <div class="collapse-content">
              <Show
                when={subjects()}
                fallback={
                  <>
                    <div class="grid grid-cols-1 md:grid-cols-2 w-full h-full justify-center items-center gap-4">
                      <For each={new Array(2)}>
                        {(arr) => {
                          return (
                            <span class="h-32 w-full inline-block bg-base-300 rounded-xl animate-pulse"></span>
                          );
                        }}
                      </For>
                    </div>
                  </>
                }>
                {q1.length > 0 ? (
                  <div class="p-4 gap-4 grid grid-cols-1 md:grid-cols-2">
                    <For each={subjects()}>
                      {(sub) => {
                        if (sub.type == "Quiz1") {
                          return (
                            <A
                              href={`/test/${sub.id}`}
                              class="card border-2 border-accent shadow-xl">
                              <div class="card-body">
                                <div>
                                  <h2 class="font-bold text-xl">
                                    {sub.course.name}
                                  </h2>
                                  <small>02 Apr 2023</small>
                                </div>
                                <div>
                                  <p>{sub.name}</p>
                                </div>
                                <div class="card-actions justify-end">
                                  <a
                                    href={`/test/${sub.id}`}
                                    class="text-base-content">
                                    <FiExternalLink class="text-base-content" />
                                  </a>
                                </div>
                              </div>
                            </A>
                          );
                        }
                      }}
                    </For>
                  </div>
                ) : (
                  <>
                    <h2>No Papers Yet</h2>
                  </>
                )}
              </Show>
            </div>
          </div>

          <div class="collapse collapse-plus border-2 border-accent w-[90vw] m-auto p-4 md:p-8">
            <input type="checkbox" />
            <div class="collapse-title text-xl md:text-2xl font-bold">
              Quiz 2
            </div>

            <div class="collapse-content">
              <Show
                when={subjects()}
                fallback={
                  <>
                    <div class="grid grid-cols-1 md:grid-cols-2 w-full h-full justify-center items-center gap-4">
                      <For each={new Array(2)}>
                        {(arr) => {
                          return (
                            <span class="h-32 w-full inline-block bg-base-300 rounded-xl animate-pulse"></span>
                          );
                        }}
                      </For>
                    </div>
                  </>
                }>
                {q2.length > 0 ? (
                  <div class="p-4 gap-4 grid grid-cols-1 md:grid-cols-2">
                    <For each={subjects()}>
                      {(sub) => {
                        if (sub.type == "Quiz2") {
                          return (
                            <A
                              href={`/test/${sub.id}`}
                              class="card border-2 border-accent shadow-xl">
                              <div class="card-body">
                                <div>
                                  <h2 class="font-bold text-xl">
                                    {sub.course.name}
                                  </h2>
                                  <small>02 Apr 2023</small>
                                </div>
                                <div>
                                  <p>{sub.name}</p>
                                </div>
                                <div class="card-actions justify-end">
                                  <a
                                    href={`/test/${sub.id}`}
                                    class="text-base-content">
                                    <FiExternalLink class="text-base-content" />
                                  </a>
                                </div>
                              </div>
                            </A>
                          );
                        }
                      }}
                    </For>
                  </div>
                ) : (
                  <>
                    <h2>No Papers Yet</h2>
                  </>
                )}
              </Show>
            </div>
          </div>

          <div class="collapse collapse-plus border-2 border-accent w-[90vw] m-auto p-4 md:p-8">
            <input type="checkbox" />
            <div class="collapse-title text-xl md:text-2xl font-bold">
              End Term
            </div>

            <div class="collapse-content">
              <Show
                when={subjects()}
                fallback={
                  <>
                    <div class="grid grid-cols-1 md:grid-cols-2 w-full h-full justify-center items-center gap-4">
                      <For each={new Array(2)}>
                        {(arr) => {
                          return (
                            <span class="h-32 w-full inline-block bg-base-300 rounded-xl animate-pulse"></span>
                          );
                        }}
                      </For>
                    </div>
                  </>
                }>
                {
                  et.length > 0 ? (
                    <div class="p-4 gap-4 grid grid-cols-1 md:grid-cols-2">
                  <For each={subjects()}>
                    {(sub) => {
                      if (sub.type == "EndTerm") {
                        return (
                          <A
                            href={`/test/${sub.id}`}
                            class="card border-2 border-accent shadow-xl">
                            <div class="card-body">
                              <div>
                                <h2 class="font-bold text-xl">
                                  {sub.course.name}
                                </h2>
                                <small>02 Apr 2023</small>
                              </div>
                              <div>
                                <p>{sub.name}</p>
                              </div>
                              <div class="card-actions justify-end">
                                <a
                                  href={`/test/${sub.id}`}
                                  class="text-base-content">
                                  <FiExternalLink class="text-base-content" />
                                </a>
                              </div>
                            </div>
                          </A>
                        );
                      }
                    }}
                  </For>
                </div>
                  ):
                  <>
                    <h2>No Papers Yet</h2>
                  </>
                }
              </Show>
            </div>
          </div>
        </div>
      </Motion>
    </>
  );
};

export default SubjectCategory;
