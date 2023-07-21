import { BsCheckCircleFill } from "solid-icons/bs";
import NavBar from "../components/NavBar";
import { A, useNavigate } from "@solidjs/router";
import { isAuthenticated, setError } from "../../public/js/store";
import { createSignal } from "solid-js";

const Contact = () => {
  document.title = "Contact Us";
  const navigate = useNavigate();
  let star = 2
  let rating
  //? Check if user is authenticated. If not redirect to login page
  if (!isAuthenticated()) {
    setError("You are not logged in!!");
    return navigate("/login", { replace: true });
  }
  let copied1;
  let copied2;
  const copyToClipBoard = (copyText, num) => {
    // For mobile devices
    navigator.clipboard.writeText(copyText.innerText);

    // Alert the copied text
    copied1.classList.remove("hidden");
    setTimeout(() => {
      copied1.classList.add("hidden");
    }, 3000);
  };

  return (
    <>
      <NavBar />

      <div class="w-full text-center">
        <h1 class="text-5xl p-16 font-archivo">Contact Us</h1>
      </div>

      <div class="text-center">
        <p>MAIL TO</p>
        <div class="w-full text-center">
          <button
            onClick={(el) => copyToClipBoard(el.target, 1)}
            class="link relative">
            21f1000506@ds.study.iitm.ac.in
            <BsCheckCircleFill
              ref={copied1}
              class="absolute top-4 -right-[2.5rem] hidden text-success"
            />
          </button>
        </div>
        <div class="w-full text-center">
          <button
            onClick={(el) => copyToClipBoard(el.target, 2)}
            class="link relative">
            21f3002911@ds.study.iitm.ac.in
          </button>
        </div>
      </div>
      <div class="divider">OR</div>
      <div class="flex flex-col md:flex-row m-4 mb-24">
        <div class="flex flex-col w-full">
          <h2 class="p-4">
            Take a look at other reports{" "}
            <span>
              <A class="link" href="/report">
                here
              </A>
            </span>
          </h2>
          <div class="grid flex-grow card bg-base-300 rounded-box w-full">
            <h2 class="p-4 text-3xl font-bold">Report</h2>
            <hr class="border border-accent w-full" />
            <div class="card-body">
              <div class="card-title text-3xl">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  class="card-title flex-col w-full gap-4 items-start justify-center">
                  <div class="flex flex-col gap-2 w-full">
                    <label for="name">Title</label>
                    <input
                      class="input input-bordered input-accent w-full"
                      type="text"
                      name="text"
                      id="text"
                      required
                    />
                  </div>
                  <div class="flex flex-col gap-2 w-full">
                    <label htmlFor="desc">Description</label>
                    <textarea
                      class="textarea textarea-accent w-full"
                      rows="5"
                      id="desc"
                      required></textarea>
                  </div>
                  <div class="flex flex-col gap-2 w-full">
                    <label htmlFor="file">Image (if any)</label>
                    <input
                      type="file"
                      id="file"
                      class="file-input file-input-bordered file-input-accent w-full "
                      multiple={true}
                      accept="image/*"
                    />
                  </div>
                  <button
                    onClick={() => {
                      console.log(
                        document.getElementById("text").value,
                        document.getElementById("desc").value,
                        document.getElementById("file").files
                      );
                    }}
                    class="btn btn-success w-full"
                    type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="divider md:divider-horizontal font-archivo">OR</div>
        <div class="flex flex-col w-full">
          <h2 class="p-4">
            Take a look at what people have to say about our website{" "}
            <span>
              <A class="link" href="/feedback">
                here
              </A>
            </span>
          </h2>
          <div class="card bg-base-300 rounded-box w-full">
            <div>
              <h2 class="p-4 text-3xl font-bold h-max">FeedBack</h2>
              <hr class="border border-accent w-full" />
            </div>
            <div class="card-body h-full">
              <div class="card-title text-3xl">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  class="card-title flex-col w-full gap-4 items-start justify-center">
                  <div class="flex flex-col gap-2 w-full">
                    <label htmlFor="file">Rating</label>
                    <div
                      onClick={(e) => {
                        star = e.target.id;
                      }}
                      ref={rating}
                      class="rating">
                      <input
                        type="radio"
                        id="star1"
                        name="rating-1"
                        class="mask mask-star"
                      />
                      <input
                        type="radio"
                        id="star2"
                        name="rating-1"
                        class="mask mask-star"
                        checked
                      />
                      <input
                        type="radio"
                        id="star3"
                        name="rating-1"
                        class="mask mask-star"
                      />
                      <input
                        type="radio"
                        id="star4"
                        name="rating-1"
                        class="mask mask-star"
                      />
                      <input
                        type="radio"
                        id="star5"
                        name="rating-1"
                        class="mask mask-star"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col gap-2 w-full">
                    <label htmlFor="desc">Description</label>
                    <textarea
                      class="textarea textarea-accent w-full"
                      rows="5"
                      id="desc"
                      required></textarea>
                  </div>

                  <button
                    onClick={(el) => {
                      console.log(
                        star,
                        document.getElementById("desc").value
                      );
                    }}
                    class="btn btn-success w-full"
                    type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
