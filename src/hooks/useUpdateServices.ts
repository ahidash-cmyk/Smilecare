import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type UpdateServiceData={id:number;title:string;description:string};
export const useUpdateService=()=>{const queryClient=useQueryClient();return useMutation({mutationFn:async({id,title,description}:UpdateServiceData)=>{const token=localStorage.getItem("token");const{data}=await axios.put(`http://localhost:3000/api/services/${id}`,{title,description},{headers:token?{Authorization:`Bearer ${token}`} : undefined});return data;},onSuccess:()=>queryClient.invalidateQueries({queryKey:["services"]})});};
