import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { useAddService } from "../../hooks/useAddServices";
import { useUpdateService } from "../../hooks/useUpdateServices";

type Service = { id: number; title: string; description: string };
type Props = { onClose: () => void; service?: Service | null };

const AddServiceModal = ({ onClose, service }: Props) => {
  const { mutate: addService, isPending: isAdding } = useAddService();
  const updateService = useUpdateService();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(service?.title ?? "");
    setDescription(service?.description ?? "");
  }, [service]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { title: title.trim(), description: description.trim() };
    if (!payload.title) return toast.error("Service title is required");
    if (!payload.description) return toast.error("Service description is required");
    const options = {
      onSuccess: () => { toast.success(service ? "Service Updated Successfully" : "Service Added Successfully"); onClose(); },
      onError: (error: any) => { toast.error(error?.response?.data?.message || (service ? "Failed To Update Service" : "Failed To Add Service")); },
    };
    if (service) updateService.mutate({ id: service.id, ...payload }, options);
    else addService(payload, options);
  };

  const saving = isAdding || updateService.isPending;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b">
          <div><h2 className="text-2xl font-bold text-gray-800">{service ? "Edit Service" : "Add New Service"}</h2><p className="text-sm text-gray-500 mt-1">{service ? "Update service information" : "Add a new service to SmileCare"}</p></div>
          <button type="button" onClick={onClose} disabled={saving} className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"><X size={22} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-7">
          <div className="mb-5"><label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label><input type="text" placeholder="e.g. Teeth Whitening" value={title} onChange={(e) => setTitle(e.target.value)} disabled={saving} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" required /></div>
          <div className="mb-7"><label className="block text-sm font-semibold text-gray-700 mb-2">Description</label><textarea rows={5} placeholder="Describe the service..." value={description} onChange={(e) => setDescription(e.target.value)} disabled={saving} className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" required /></div>
          <p className="text-sm text-gray-500 mb-6">Service photos are selected automatically according to the service name.</p>
          <div className="flex justify-end gap-3"><button type="button" onClick={onClose} disabled={saving} className="px-5 py-2.5 rounded-xl bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50">Cancel</button><button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50">{saving ? (service ? "Updating..." : "Saving...") : service ? "Update" : "Save"}</button></div>
        </form>
      </div>
    </div>
  );
};
export default AddServiceModal;
