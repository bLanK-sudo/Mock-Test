import { BsCheckCircleFill } from "solid-icons/bs";
import NavBar from "../components/NavBar";

const Contact = () => {
    let copied1 
    let copied2
  const copyToClipBoard = (copyText, num) => {
    // For mobile devices
    console.log(copyText.innerText);
    navigator.clipboard.writeText(copyText.innerText);

    // Alert the copied text
    copied1.classList.remove("hidden");
    setTimeout(() => {
        copied1.classList.add("hidden");
    }, 3000)
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
            class="link link-accent relative">
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
            class="link link-accent relative">
            21f3002911@ds.study.iitm.ac.in
          </button>
        </div>
      </div>
      <div class="divider">OR</div>
      <div class="flex flex-col md:flex-row m-4 mb-24">
        <div class="grid flex-grow card bg-base-300 rounded-box w-full">
          <h2 class="p-4 text-3xl font-bold">Report</h2>
          <hr class="border border-accent w-full" />
          <div class="card-body">
            <div class="card-title text-3xl">
              <form
                onSubmit={(e) => e.preventDefault()}
                class="card-title flex-col w-full gap-4 items-start justify-center">
                <div class="flex flex-col gap-2 w-full">
                  <label for="name">Email</label>
                  <input
                    class="input input-bordered input-accent w-full"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    class="textarea textarea-accent w-full"
                    placeholder="Description"
                    rows="5"
                    required></textarea>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <label htmlFor="file">Image (if any)</label>
                  <input
                    type="file"
                    class="file-input file-input-bordered file-input-accent w-full "
                    accept="image/*"
                    required
                  />
                </div>
                <button class="btn btn-success w-full" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="divider md:divider-horizontal font-archivo">OR</div>
        <div class="grid flex-grow card bg-base-300 rounded-box w-full">
          <h2 class="p-4 text-3xl font-bold h-max">FeedBack</h2>
          <hr class="border border-accent w-full" />
          <div class="card-body h-full">
            <div class="card-title text-3xl">
              <form
                onSubmit={(e) => e.preventDefault()}
                class="card-title flex-col w-full gap-4 items-start justify-center">
                <div class="flex flex-col gap-2 w-full">
                  <label for="name">Email</label>
                  <input
                    class="input input-bordered input-accent w-full"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    class="textarea textarea-accent w-full"
                    placeholder="Description"
                    rows="5"
                    required></textarea>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <label htmlFor="file">Image (if any)</label>
                  <input
                    type="file"
                    class="file-input file-input-bordered file-input-accent w-full "
                    accept="image/*"
                    required
                  />
                </div>
                <button class="btn btn-success w-full" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
