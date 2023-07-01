import { A, useNavigate } from "@solidjs/router";
import { Motion } from "@motionone/solid";
import NavBar from "../components/NavBar";
import { isAuthenticated, setError } from "../../public/js/store";

const About = () => {
  const navigate = useNavigate();

  //? Check if user is authenticated. If not redirect to login page
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
        <div class="h-[60vh] w-screen flex justify-center items-center z-[1] flex-col gap-4">
          <p class="text-center text-xl font-light max-w-[600px]">
            just 2 random guys who got no life
          </p>
          <p class="text-center text-xl font-light max-w-[600px]">
            decided to make a website
          </p>
          <A href="/home" class="text-xs underline">
            GO TO HOMEPAGE
          </A>
        </div>
        <div className="fixed bottom-24 left-0 right-0 mx-auto z-[24] w-full text-center">
          <p>
            KeyWords: <br /> 2 random guys {` -> `}{" "}
            <span class="cursor-pointer">Manish</span>,{" "}
            <span class="cursor-pointer">Abulaman</span>
          </p>
          <p>got no life {`->`} yes </p>
          <p>decided {`->`} ????</p>
        </div>
      </Motion>
    </>
  );
};

export default About;
