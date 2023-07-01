import { createSignal } from "solid-js";


export const [user, setUser] = createSignal({});
export const [isAuthenticated, setIsAuthenticated] = createSignal(false);
export const [error, setError] = createSignal(null);

document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "retro")
localStorage.getItem("authenticated") && setIsAuthenticated(true)