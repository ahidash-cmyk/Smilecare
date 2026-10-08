import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type ServiceData={title:string;description:string};
export const useAddService=()=>{const queryClient=useQueryClient();return useMutation({mutationFn:async(service:ServiceData)=>{const token=localStorage.getItem("token");const{data}=await axios.post("http://localhost:3000/api/services",service,{headers:token?{Authorization:`Bearer ${token}`} : undefined});return data;},onSuccess:()=>queryClient.invalidateQueries({queryKey:["services"]})});};
