import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type DoctorData = { id: number; name: string; specialization: string };
export const useUpdateDoctor = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: async ({id,name,specialization}:DoctorData) => { const token=localStorage.getItem("token"); const {data}=await axios.put(`http://localhost:3000/api/doctors/${id}`,{name,specialization},{headers:token?{Authorization:`Bearer ${token}`} : undefined}); return data; }, onSuccess:()=>queryClient.invalidateQueries({queryKey:["doctors"]}) }); };
