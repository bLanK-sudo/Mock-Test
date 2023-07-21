import { useNavigate } from "@solidjs/router";
import { isAuthenticated, setError } from "../../public/js/store";
import ComingSoon from "../components/ComingSoon"


const Donate = () => {
    document.title = "Donate"
    const navigate = useNavigate()
    if (!isAuthenticated()) {
      setError("You are not logged in!!");
      return navigate("/login", { replace: true });
    }
    return(
    <ComingSoon />
    )
}

export default Donate