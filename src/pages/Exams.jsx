import { A, useParams } from "@solidjs/router";
import ComingSoon from "../components/ComingSoon";
import NavBar from "../components/NavBar";
import { baseURL } from "../api/fetchGet";
import { createSignal } from "solid-js";
import { FiExternalLink } from "solid-icons/fi";

const ExamCategory = (id) => {
  const param = useParams();
  const [subjects, setSubjects] = createSignal(null);
  const sub = (id) => {
    if (id == "q1") return "Quiz1";
    else if (id == "q2") return "Quiz2";
    else return "EndTerm";
  };
  document.title = "Exams";
  const fetchExam = async (exam) => {
    console.log("fetching data");
    const response = await fetch(baseURL + "qp/get_by_type/" + exam, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (!response.ok) return setError("Unable to fetch subjects");
    console.log(data);
    setSubjects(data);
  };
  console.log(sub(param.id));
  fetchExam(sub(param.id));
  return (
    <>
      <NavBar />

      <Show
        when={subjects()}
        fallback={
          <>
            <div class="grid grid-cols-1 md:grid-cols-2 m-4 h-full justify-center items-center gap-4">
              <For each={new Array(12)}>
                {(arr) => {
                  return (
                    <span class="h-32 w-full inline-block bg-base-300 rounded-xl animate-pulse"></span>
                  );
                }}
              </For>
            </div>
          </>
        }>
        {subjects().length > 0 ? (
          <div class="grid grid-cols-1 md:grid-cols-2 m-4 gap-8 pb-24">
            <For each={subjects()}>
              {(sub) => {
                return (
                  <A
                    href={`/subjects/${sub.id}`}
                    class="card border-2 border-accent shadow-xl">
                    <div class="card-body justify-between">
                      <div>
                        <h2 class="font-bold text-xl">{sub.course.name}</h2>
                        <small>02 Apr 2023</small>
                      </div>
                      <div>
                        <p>{sub.course.description}</p>
                      </div>
                      <div class="card-actions justify-end">
                        <a
                          href={`/subjects/${sub.id}`}
                          class="text-base-content">
                          <FiExternalLink class="text-base-content" />
                        </a>
                      </div>
                    </div>
                  </A>
                );
              }}
            </For>
          </div>
        ) : (
          <>
            <div class="min-h-[60vh] min-w-screen flex justify-center items-center">
              <p class="font-archivo">No Paper Yet</p>
            </div>
          </>
        )}
      </Show>
    </>
  );
};

export default ExamCategory;
