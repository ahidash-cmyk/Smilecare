import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],

    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/services"
      );

      return response.data;
    },

    staleTime: 1000 * 60 * 5,
  });
};