import { Motion } from "@motionone/solid";
import NavBar from "../components/NavBar";
import { createSignal, onMount } from "solid-js";
import { baseURL } from "../api/fetchGet";
import { FiExternalLink } from "solid-icons/fi";
import { A } from "@solidjs/router";
import { courses } from "../../public/js/store";

const Subjects = () => {

  document.title = "Subjects";
  return (
    <>
      <Motion
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.7, easing: "ease-in-out" }}>
        <NavBar />
        <Show
          when={courses()}
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
          <div class="m-4 grid grid-cols-1 md:grid-cols-2 gap-16 pb-24">
            <For each={courses()}>{
              (sub) => {
                return (
                  <A
                    href={`/subjects/${sub.id}`}
                    class="card border-2 border-accent">
                    <div class="card-body justify-between">
                      <div>
                        <h2 class="font-bold text-2xl">{sub.name}</h2>
                        <small>{sub.level.name}</small>
                      </div>
                      <div>
                        <p>{sub.description}</p>
                      </div>
                      <div class="card-actions justify-end">
                        <div
                          class="text-base-content">
                          <FiExternalLink class="text-base-content" />
                        </div>
                      </div>
                    </div>
                  </A>
                );
              }
              }</For>
          </div>
        </Show>
      </Motion>
    </>
  );
};

export default Subjects;
