import { useNavigate } from "@solidjs/router";
import { isAuthenticated, setCourses, setError, setUser } from "../../public/js/store";
import { createEffect, createResource, createSignal } from "solid-js";



  
export const baseURL = "http://34.214.175.71/";
setUser(null)

export const fetchCourses = async () => {
const cr = await fetch(baseURL + "course/", {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
});
const data = await cr.json();
console.log(data);
setCourses(data);
};
fetchCourses()

export const fetchUser = async () => {
    try{
        const current_user = await fetch(baseURL + "profile/", {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        })
        if(current_user){
        const data = await current_user.json()
        console.log(data);
        setUser(data)
        }else{
            setError("Unable to fetch user")
            navigate("/login", {replace:true})
        }
    }catch(err){
        setError(err)
    }
  }

if(isAuthenticated){
    fetchUser()
}
// export const fetchTest = async (setqnId, setTest, test, qn, setComprehension) => {
//     const response = await fetch("http://localhost:5000/SWTesting", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//     }
//     });
//     const data = await response.json();
//     if(!response.ok) {
//         navigate("/mock", {replace:true})
//     }else{
//         if(data) {
//             setTest(data[0])
//             for (let i = 0; i < data[0].questions.length; i++) {
//                 qn.push(data[0].questions[i].qn_no)
//             }
//             let comprehension = {
//                 qnArr: [],
//                 qns: {},
//                 imageArr : []
//             }
//             if(data[0].comprehensions){
//                 data[0].comprehensions.forEach((e, i) => {
//                     let someArr = []
//                     e.qns.forEach(q => {comprehension.qnArr.push(q)})
//                     e.qns.forEach(q => { someArr.push(q) })
//                     comprehension.imageArr.push({qn : someArr, image: e.images, text: e.text})
//                     comprehension.qns[e.qns[0]] = []
//                     e.qns.forEach(q => { comprehension.qns[e.qns[0]].push(q) })
//                 });
//             }
//             console.log(comprehension);
//             setComprehension(comprehension)
//         }
//     }
//     setqnId(qn)
// }



export const fetchTest = async (setqnId, setTest, test, qn, setComprehension, id) => {
    const navigate = useNavigate()
    const response = await fetch(baseURL + "test/start_test/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({qp_id: 118})
    });
    const data = await response.json();
    if(!response.ok) {
        navigate("/mock", {replace:true})
    }else{
        if(data) {
            setTest(data)
            for (let i = 0; i < data[0].questions.length; i++) {
                qn.push(data[0].questions[i].qn_no)
            }
            let comprehension = {
                qnArr: [],
                qns: {},
                imageArr : []
            }
            if(data[0].comprehensions){
                data[0].comprehensions.forEach((e, i) => {
                    let someArr = []
                    e.qns.forEach(q => {comprehension.qnArr.push(q)})
                    e.qns.forEach(q => { someArr.push(q) })
                    comprehension.imageArr.push({qn : someArr, image: e.images, text: e.text})
                    comprehension.qns[e.qns[0]] = []
                    e.qns.forEach(q => { comprehension.qns[e.qns[0]].push(q) })
                });
            }
            console.log(comprehension);
            setComprehension(comprehension)
            console.log(data);
        }
    }
    for (let i = 0; i < test().test_questions.length; i++) {
        qn.push(test().test_questions[i].id)
    }
    setqnId(qn)
  }




export const fetchAns = async (setResult, test, selected) => {
    const response = await fetch(baseURL + "test/submit_test/", {
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
    }
}
