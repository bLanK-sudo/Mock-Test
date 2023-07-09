import { BsSearch, BsSearchHeartFill } from "solid-icons/bs";
import NavBar from "../components/NavBar";

const Report = () => {


    return (
      <>
        <NavBar />
        <h1 class="text-2xl font-bold text-center p-4">Reported Bugs</h1>
        <div class="w-full m-auto flex justify-center">
          <div class="join">
            <input class="input input-bordered join-item" placeholder="Search" />
            <button class="btn join-item"><BsSearch /></button>
          </div>
        </div>
        <div class="flex flex-col gap-4 justify-center items-center flex-wrap p-4 md:p-16 pb-24">
          <div class="card bg-neutral text-neutral-content max-w-[400px]">
            <h2 class="p-4 font-semibold">Report Title</h2>
            <hr class="border-2 border-base-100" />
            <div class="card-body p-4">
              <div id="report" class="card-title flex-col items-end hidden">
                {/* <img
                  src="/public/images/report.jpg"
                  class="rounded-xl"
                  alt="Report"
                /> */}
                <div class="w-full bg-accent text-accent-content flex justify-center items-center rounded-xl h-[200px]">
                  <h2>No Image Provided</h2>
                </div>
                <small class="text-xs pr-2">Reported by Manish S</small>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus amet consequuntur quae ab incidunt? Vero repellat
                  quasi quam quaerat animi.
                </p>
              </div>
              <div class="card-actions justify-end">
                <button
                  onClick={(el) => {
                    document
                      .getElementById("report")
                      .classList.toggle("hidden");
                    if (el.target.innerText == "View More") {
                      el.target.innerText = "View Less";
                    } else {
                      el.target.innerText = "View More";
                    }
                  }}
                  class="link">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Report;