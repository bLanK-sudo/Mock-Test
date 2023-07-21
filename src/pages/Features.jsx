import { A } from "@solidjs/router";
import NavBar from "../components/NavBar";
import { BsSearch } from "solid-icons/bs";
import { createSignal } from "solid-js";


const allData = [
  {
    title: "Mark for review",
    desc: "In our current version of this website, we don't have the mark for review option as we do in the exam hall in TCS. We will be adding this feature in the next version of the website. We will also bring in the 'save and next' feature, where you save an answer and will move on to the next question.",
  },
  {
    title: "User data summary",
    desc: "We plan to have a summary page where you can look at the time you take to attempt each question. Since we are also collecting data on how much time you take for each question, we can compare it with other students and give you an understanding of how well you are performing in the exam.",
  },
  {
    title: "More info in preview",
    desc: "In the preview page (show answer), we will show the time you take for each question.",
  },
  {
    title: "Profile picture",
    desc: "No more boring profile pictures. You can upload a profile picture of your liking.",
  },
  {
    title: "Badges and perks",
    desc: "We will provide users with badges and perks based on their contribution to the website. For Example, upload the previous year question papers to /upload. With regards to perks, we won't be specifying them now. But we can guarantee you that they will be worth it.",
  },
  {
    title: "Calculator",
    desc: "A calculator, like in the TCS exam, will be provided. But this feature will not be available for the coming two semesters unless there is a high demand for it.",
  },
];


const Features = () => {
  document.title = "Upcoming Features";

  const [data, setData] = createSignal([]);
  const [filteredData, setFilteredData] = createSignal([]);
  setData(allData)
  setFilteredData(allData)
  console.log(filteredData());
  let search
  return (
    <>
      <NavBar />
      <h2 class="p-4 text-2xl font-bold text-center">Upcoming Features</h2>
      <h2 class="text-center p-4">Type your query and press <kbd class="kbd">Enter</kbd> </h2>
      <div class="w-full m-auto flex justify-center">
        <div class="join">
          <input
            onKeyPress={(e) => {
              console.log(e);
              if (e.key == "Enter") {
                setFilteredData(
                  data().filter((d) =>
                    d.title.toLowerCase().includes(search.value.toLowerCase())
                  )
                );
              }

              if (e.target.value == "") {
                setFilteredData(data());
              }
            }}
            type="text"
            ref={search}
            class="input input-bordered join-item"
            placeholder="Search"
          />
          <button
            onClick={() => {
              setFilteredData(
                data().filter((d) =>
                  d.title.toLowerCase().includes(search.value.toLowerCase())
                )
              );
            }}
            class="btn join-item">
            <BsSearch />
          </button>
        </div>
      </div>
      <div class="flex flex-col pb-24 m-2">
        <div className="flex items-center flex-col pt-12 gap-4">
          {filteredData().length == 0 && (
            <>
              <div>
                <h1 class="font-bold text-center p-4">No matching data</h1>
              </div>
            </>
          )}
          <For each={filteredData()}>
            {(d) => {
              console.log(d);

              return (
                <div class="collapse collapse-arrow max-w-[900px] border-2 border-base-200">
                  <input type="checkbox" />
                  <div class="collapse-title text-xl font-medium">
                    {d.title}
                  </div>
                  <div class="collapse-content">
                    <p class="p-4">{d.desc}</p>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        {filteredData().length > 0 && (
          <>
            <p class="text-center p-2 pt-4">These aren't the only features we are planning on. We have more but we'll decide on all that only based on the user traffic</p>
            <p class="text-center p-4">
              PS: If u have any suggestions for the features you can mail us
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Features;
