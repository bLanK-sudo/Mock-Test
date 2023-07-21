import { A, useNavigate } from "@solidjs/router";
import NavBar from "../components/NavBar";
import { Motion } from "@motionone/solid";
import {
  isAuthenticated,
  setError,
  setUser,
  user,
} from "../../public/js/store";
import { fetchUser } from "../api/fetchGet";

const Mock = () => {
  document.title = "Mock";
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    setError("You are not logged in!!");
    return navigate("/login", { replace: true });
  }
  return (
    <>
      <Motion
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.7, easing: "ease-in-out" }}>
        <NavBar />
        <div class="flex flex-col pb-24">
          <div class="card p-4 flex bg-primary text-primary-content m-2">
            <h2 class="text-3xl p-4">Attempt Mocks here</h2>
            <div class="grid grid-cols-1 justify-center md:grid-cols-2 items-center gap-4">
              <Show
                when={user()}
                fallback={
                  <>
                    <div class="grid grid-cols-1 md:grid-cols-2 w-full h-full justify-center items-center gap-4">
                      <span class="h-32 w-full inline-block bg-base-300 rounded-xl animate-pulse"></span>
                      <span class="h-32 w-full inline-block bg-base-300 rounded-xl animate-pulse"></span>
                    </div>
                  </>
                }>
                <For each={user().courses}>
                  {(course) => {
                    return (
                      <div class="card bg-neutral text-neutral-content shadow w-full">
                        <div class="card-body">
                          <div class="card-title">{course.name}</div>
                          <div class="card-actions justify-end">
                            <a
                              href={`/test/${course.id}`}
                              class="link">
                              Attempt Mock
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </Show>
            </div>
          </div>
          <div class="flex flex-col md:flex-row w-full">
            <div class="card bg-accent text-accent-content md:w-full m-2">
              <h2 class="card-title font-montserrat font-bold text-2xl md:text-3xl p-4">
                Subjects Picked
              </h2>
              <hr class="border border-accent-content" />
              <div class="card-body justify-between">
                <Show
                  when={user()}
                  fallback={
                    <>
                      <div class="flex flex-wrap justify-start  items-start gap-4">
                        <span class="h-8 w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                        <span class="h-8 w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                      </div>
                    </>
                  }>
                  <div class="flex gap-4 flex-wrap">
                    <For each={user().courses}>
                      {(course) => {
                        return (
                          <A
                            href={`/subjects/${course.id}`}
                            class="badge p-4 md:btn w-max px-8">
                            {course.name}
                          </A>
                        );
                      }}
                    </For>
                  </div>
                </Show>
                <div class="card-actions justify-end">
                  <A href="/subjects" class="link">
                    View More
                  </A>
                </div>
              </div>
            </div>
            <div class="card bg-accent text-accent-content md:w-full m-2">
              <h2 class="card-title font-montserrat font-bold text-2xl md:text-3xl p-4">
                Exams
              </h2>
              <hr class="border border-accent-content" />
              <div class="card-body">
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <A href="/exams/q1" class="badge p-4 md:btn w-full">
                    Quiz 1
                  </A>
                  <A href="/exams/q2" class="badge p-4 md:btn w-full">
                    Quiz 2
                  </A>
                  <A href="/exams/endterm" class="badge p-4 md:btn w-full">
                    End Term
                  </A>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </>
  );
};

export default Mock;
