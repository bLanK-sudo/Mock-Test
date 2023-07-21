import { A, useNavigate } from "@solidjs/router";
import NavBar from "../components/NavBar";
import { Motion } from "@motionone/solid";
import {fetchUser } from "../api/fetchGet";
import {
  isAuthenticated,
  setError,
  user,
} from "../../public/js/store";

const App = () => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const navigate = useNavigate();
  fetchUser();


  //? Check if user is authenticated. If not redirect to login page
  if (!isAuthenticated()) {
    setError("You are not logged in!!");
    return navigate("/login", { replace: true });
  }
  
  return (
    (document.title = "Home"),
    (
      <>
        <Motion
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.7, easing: "ease-in-out" }}>
          <NavBar />
          <div class="flex flex-col pb-24">
            <div class="card bg-primary text-primary-content m-2">
              <div class="card-body">
                <div class="card-title font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">
                  Welcome
                  <Show
                    when={user()}
                    fallback={
                      <>
                        <div class="flex flex-col justify-center items-center gap-4">
                          <span class="h-8 w-32 md:w-48 inline-block bg-base-300 rounded-full animate-pulse"></span>
                        </div>
                      </>
                    }>
                    {" "}
                    {user().username}
                  </Show>
                </div>
                <p class="pl-2">
                  Welcome to Mock Test App, take a mock test and ace your exams.
                </p>

                <div class="card-actions justify-end">
                  <A href="/features" class="badge p-4 md:btn">
                    Upcoming Features
                  </A>
                  <A href="/mock" class="badge p-4 md:btn">
                    Attempt Mock
                  </A>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row w-full">
              <div class="card bg-accent text-accent-content md:w-full m-2">
                <h2 class="card-title font-montserrat font-bold text-2xl md:text-3xl p-4">
                  About
                </h2>
                <hr class="border border-accent-content" />
                <div class="card-body">
                  <p class="">
                    Welcome to Mock Test App, the go-to platform for IIT Madras
                    Online Degree Program students to ace their exams. We
                    understand the importance of practice, and our mission is to
                    provide students with an exte....
                  </p>
                  <div class="card-actions justify-end">
                    <A href="/about" class="link">
                      View More
                    </A>
                  </div>
                </div>
              </div>
              <div class="card bg-accent text-accent-content md:w-full m-2">
                <h2 class="card-title font-montserrat font-bold text-2xl md:text-3xl p-4">
                  FeedBack
                </h2>
                <hr class="border border-accent-content" />
                <div class="card-body">
                  <p class="pl-2">
                    We would love to hear your FeedBack on our website. If you
                    want to report an error, visit the Contact page or click on
                    view more below.
                  </p>
                  <div class="card-actions justify-end">
                    <A href="/contact" class="link">
                      View More
                    </A>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-2 p-4 bg-accent text-accent-content text-sm flex">
              <p>
                Look what others have to say about our website{" "}
                <span>
                  <A class="link" href="/feedback">
                    here
                  </A>
                </span>
              </p>
            </div>
          </div>
        </Motion>
      </>
    )
  );
};

export default App;
