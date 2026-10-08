import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddDoctor } from "../../hooks/useAddDoctor";
import { useUpdateDoctor } from "../../hooks/useUpdateDoctor";

type Props = { onClose: () => void; doctor?: any };

const AddDoctorModal = ({ onClose, doctor }: Props) => {
  const { mutate: addDoctor, isPending: isAdding } = useAddDoctor();
  const { mutate: updateDoctor, isPending: isUpdating } = useUpdateDoctor();
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    setName(doctor?.name ?? "");
    setSpecialization(doctor?.specialization ?? "");
  }, [doctor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { name: name.trim(), specialization: specialization.trim() };
    if (!payload.name || !payload.specialization) {
      toast.error("Name and specialization are required");
      return;
    }
    const options = {
      onSuccess: () => { toast.success(doctor ? "Doctor Updated Successfully" : "Doctor Added Successfully"); onClose(); },
      onError: (error: any) => { toast.error(error?.response?.data?.message || (doctor ? "Failed To Update Doctor" : "Failed To Add Doctor")); },
    };
    if (doctor) updateDoctor({ id: doctor.id, ...payload }, options);
    else addDoctor(payload, options);
  };

  const saving = isAdding || isUpdating;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-[450px]">
        <h2 className="text-2xl font-bold mb-6">{doctor ? "Edit Doctor" : "Add Doctor"}</h2>
        <input type="text" placeholder="Doctor Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-3 mb-4" required disabled={saving} />
        <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="w-full border rounded-lg p-3 mb-4" required disabled={saving} />
        <p className="text-sm text-gray-500 mb-6">Doctor photos are selected automatically according to the specialization.</p>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={saving} className="px-5 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">{saving ? (doctor ? "Updating..." : "Saving...") : doctor ? "Update" : "Save"}</button>
        </div>
      </form>
    </div>
  );
};
export default AddDoctorModal;
