import axios from "axios";
import { useEffect, useState } from "react";



const useHttp = (request) =>{
    const [httpResponse,setHttpResponse] = useState(null);
    const[httpError,setHttpError] = useState(null);
    const[httpLoader,setHttpLoader] = useState(true);

    //request is a full object we need to send from where wee want to make this http request
    const ajax = () =>{
        axios(request)
        .then((response)=>{
            setHttpResponse(response.data)
        })
        .catch((error)=>{
            setHttpError(error)
        })
        .finally(()=>{
            setHttpLoader(false)
        })
        
    };

    useEffect(()=>{
        if(request){
            ajax();
        }
    },[request])

    return [httpResponse,httpError,httpLoader]
}

export default useHttp;