import { createSignal } from "solid-js";


export const [user, setUser] = createSignal({});
export const [isAuthenticated, setIsAuthenticated] = createSignal(false);
export const [error, setError] = createSignal(null);
export const [courses, setCourses] = createSignal()

document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "black")
localStorage.getItem("authenticated") && setIsAuthenticated(true)