import type { Doctor } from "../types/doctor";
import { DoctorImage } from "./DoctorImage";

interface Props { doctor?: Doctor; }

export default function DoctorCard({ doctor }: Props) {
  if (!doctor) return null;
  return (
    <div className="group rounded-3xl bg-white shadow-lg overflow-hidden">
      <DoctorImage name={doctor.name} specialization={doctor.specialization} className="w-full h-56" />
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold">{doctor.name}</h2>
        <p className="text-center text-blue-600 mt-2">{doctor.specialization}</p>
      </div>
    </div>
  );
}
