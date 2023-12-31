import { BsArrowDownCircleFill, BsMoonFill, BsSunFill} from 'solid-icons/bs'
import {animate} from "motion"
import { A } from '@solidjs/router';
import {createSignal } from 'solid-js';
import { setIsAuthenticated, setUser } from '../../public/js/store';


const NavBar = () => {
  const [selected, setSelected] = createSignal(localStorage.getItem("theme") || "black")
  console.log("he",selected());
  let centerNav;
    return (
      <>
        <nav class="m-2 relative">
          <div class="navbar justify-between bg-base-300 rounded-box relative">
            <div class="px-2 lg:flex-none">
              <A
                style="font-family:'League Spartan'"
                href="/home"
                class="text-2xl font-bold normal-case px-4 flex w-max justify-center items-center">
                blank.
              </A>
            </div>
            <div class="hidden md:flex justify-center items-center gap-4">
              <A href="/mock" class="btn btn-ghost">
                mock
              </A>
              <A href="/profile" class="btn btn-ghost">
                profile
              </A>
              <A href="/donate" class="btn btn-ghost">
                donate
              </A>
              <A
                href="/login"
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem("authenticated");
                  localStorage.removeItem("token");
                  setUser(null);
                }}
                class="btn btn-ghost">
                signout
              </A>
            </div>
            <div class="hidden md:flex justify-end px-2 relative">
              <div class="flex items-stretch">
                <div class="dropdown dropdown-end">
                  <label tabindex="0" class="btn btn-ghost rounded-btn">
                    Themes
                    <BsArrowDownCircleFill />
                  </label>
                  <ul
                    tabindex="0"
                    class="menu dropdown-content z-[1] p-4 shadow bg-base-100 rounded-box w-52 mt-4 gap-2">
                    <button
                      data-set-theme=""
                      data-act-class="ACTIVECLASS"></button>
                    <button
                      class={`btn ${
                        selected() == "cupcake"
                          ? "border-2 border-accent"
                          : ""
                      }`}
                      onClick={() => {
                        setSelected("cupcake");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "cupcake"
                        );
                        localStorage.setItem("theme", "cupcake");
                      }}>
                      Light <BsSunFill />
                    </button>
                    <button
                      class={`btn ${
                        selected() == "black" ? "border-2 border-accent" : ""
                      }`}
                      onClick={() => {
                        setSelected("black");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "black"
                        );
                        localStorage.setItem("theme", "black");
                      }}>
                      Dark <BsMoonFill />
                    </button>
                    <button
                      class={`btn ${
                        selected() == "forest" ? "border-2 border-accent" : ""
                      }`}
                      onClick={() => {
                        setSelected("forest");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "forest"
                        );
                        localStorage.setItem("theme", "forest");
                      }}>
                      Forest <BsMoonFill />
                    </button>
                    <button
                      class={`btn ${
                        selected() == "luxury" ? "border-2 border-accent" : ""
                      }`}
                      onClick={() => {
                        setSelected("luxury");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "luxury"
                        );
                        localStorage.setItem("theme", "luxury");
                      }}>
                      Luxury <BsMoonFill />
                    </button>
                    <button
                      class={`btn ${
                        selected() == "retro" ? "border-2 border-accent" : ""
                      }`}
                      onClick={() => {
                        setSelected("retro");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "retro"
                        );
                        localStorage.setItem("theme", "retro");
                      }}>
                      Retro <BsSunFill />
                    </button>
                    <button
                      class={`btn ${
                        selected() == "synthwave"
                          ? "border-2 border-accent"
                          : ""
                      }`}
                      onClick={() => {
                        setSelected("synthwave");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "synthwave"
                        );
                        localStorage.setItem("theme", "synthwave");
                      }}>
                      Synthwave <BsMoonFill />
                    </button>
                    <button
                      class={`btn ${
                        selected() == "business" ? "border-2 border-accent" : ""
                      }`}
                      onClick={() => {
                        setSelected("business");
                        document.documentElement.removeAttribute("data-theme");
                        document.documentElement.setAttribute(
                          "data-theme",
                          "business"
                        );
                        localStorage.setItem("theme", "business");
                      }}>
                      Business <BsMoonFill />
                    </button>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex md:hidden px-2 relative">
              <button
                onClick={(el) => {
                  if (el.target.innerText == "MENU") {
                    animate(centerNav, { opacity: [0, 1] }, { duration: 0.65 });
                    animate(centerNav, { display: "flex" }, { duration: 0.1 });
                    el.target.innerText = "Close";
                  } else {
                    animate(centerNav, { opacity: [1, 0] }, { duration: 0.65 });
                    animate(centerNav, { display: "none" }, { duration: 1 });
                    el.target.innerText = "MENU";
                  }
                }}
                class="btn btn-ghost">
                Menu
              </button>
            </div>
          </div>
          <div
            ref={centerNav}
            class="center-nav card absolute z-10 hidden flex-col justify-center items-center top-[4.5rem] w-full shadow bg-base-300 h-max border-2 border-accent">
            <A href="/mock" class="btn btn-ghost">
              Mock
            </A>
            <A href="/profile" class="btn btn-ghost">
              Profile
            </A>
            <A href="/donate" class="btn btn-ghost">
              Donate
            </A>
            <A
              href="/login"
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem("authenticated");
                localStorage.removeItem("token");
                setUser(null);
              }}
              class="btn btn-ghost">
              Signout
            </A>
          </div>
        </nav>
      </>
    );
}

export default NavBar;