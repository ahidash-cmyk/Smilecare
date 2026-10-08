import { useState } from "react";
import { UserRound } from "lucide-react";

type DoctorImageProps = {
  name: string;
  specialization?: string | null;
  className?: string;
};

// The four doctors currently in the database have these specialization values.
// Each value intentionally gets its own image so the four current doctors do
// not all fall back to the same default image.
const doctorImages = {
  admin:
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=85",
  adgsdg:
    "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&q=85",
  adgggrw:
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=85",
  ktul:
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
  default:
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85",
} as const;

const normalize = (value?: string | null) =>
  (value ?? "").trim().toLowerCase();

const getDoctorImage = (specialization?: string | null) => {
  const value = normalize(specialization);

  // Exact values currently stored in the database.
  if (value === "admin") return doctorImages.admin;
  if (value === "adgsdg") return doctorImages.adgsdg;
  if (value === "adgggrw") return doctorImages.adgggrw;
  if (value === "ktul") return doctorImages.ktul;

  // Also support real specialization names if the admin changes them later.
  if (value.includes("orthodont") || value.includes("تقويم")) {
    return doctorImages.adgggrw;
  }

  if (
    value.includes("surgeon") ||
    value.includes("surgery") ||
    value.includes("oral") ||
    value.includes("maxillofacial") ||
    value.includes("جراحة") ||
    value.includes("جراح")
  ) {
    return doctorImages.admin;
  }

  if (
    value.includes("pediatric") ||
    value.includes("paediatric") ||
    value.includes("children") ||
    value.includes("child") ||
    value.includes("kids") ||
    value.includes("أطفال") ||
    value.includes("اطفال") ||
    value.includes("طفل")
  ) {
    return doctorImages.ktul;
  }

  if (
    value.includes("dentist") ||
    value.includes("dental") ||
    value.includes("general") ||
    value.includes("أسنان") ||
    value.includes("اسنان")
  ) {
    return doctorImages.adgsdg;
  }

  return doctorImages.default;
};

export const DoctorImage = ({
  name,
  specialization,
  className = "",
}: DoctorImageProps) => {
  const [imageUrl, setImageUrl] = useState(() =>
    getDoctorImage(specialization),
  );
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (imageUrl !== doctorImages.default) {
      setImageUrl(doctorImages.default);
      return;
    }
    setFailed(true);
  };

  return (
    <div className={`relative overflow-hidden bg-blue-50 ${className}`}>
      {!failed ? (
        <img
          src={imageUrl}
          alt={`Dr. ${name}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          onError={handleError}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <UserRound size={80} strokeWidth={1.5} className="text-blue-200" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
