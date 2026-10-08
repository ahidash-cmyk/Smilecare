import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type DoctorData = { name: string; specialization: string };
export const useAddDoctor = () => { const queryClient=useQueryClient(); return useMutation({ mutationFn: async (doctor:DoctorData)=>{ const token=localStorage.getItem("token"); const {data}=await axios.post("http://localhost:3000/api/doctors",doctor,{headers:token?{Authorization:`Bearer ${token}`} : undefined}); return data; }, onSuccess:()=>queryClient.invalidateQueries({queryKey:["doctors"]}) }); };
