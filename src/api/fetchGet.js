import { useNavigate } from "@solidjs/router";
import { setError, setUser } from "../../public/js/store";


export const fetchUser = async () => {
    try{
        const current_user = await fetch("https://abulaman.pythonanywhere.com/profile/", {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        })
        if(current_user){
        const data = await current_user.json()
        setUser(data)
        }else{
            setError("Unable to fetch user")
            navigate("/login", {replace:true})
        }
    }catch(err){
        setError(err)
    }
  }




export const fetchTest = async (setqnId, setTest, test, qn) => {
    const navigate = useNavigate()
    const response = await fetch("https://abulaman.pythonanywhere.com/test/start_test/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({qp_id: 1})
    });
    const data = await response.json();
    if(!response.ok) {
        navigate("/mock", {replace:true})
    }else{
        if(data) {
            setTest(data)
            console.log(data);
        }
    }
    for (let i = 0; i < test().test_questions.length; i++) {
        qn.push(test().test_questions[i].id)
    }
    setqnId(qn)
  }


export const fetchAns = async (setResult, test, selected) => {
    const response = await fetch("https://abulaman.pythonanywhere.com/test/submit_test/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({id : test().id, test_questions: selected})
    })
    if(!response.ok) return "error"
    const data = await response.json()
    if(data) {
        setResult(data)
        console.log(data);
    }
}
