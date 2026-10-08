import { useState } from "react";
import { Sparkles, Stethoscope } from "lucide-react";

type ServiceImageProps = {
  title: string;
  className?: string;
};

// Exactly four services are used by SmileCare.
const serviceImages = {
  whitening:
    "https://images.unsplash.com/photo-1606265752439-1f18756aa2a3?auto=format&fit=crop&w=1000&q=85",
  cleaning:
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=85",
  orthodontics:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1000&q=85",
  implants:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85",
} as const;

const normalize = (value: string) => value.trim().toLowerCase();

const getServiceImage = (title: string) => {
  const value = normalize(title);

  if (
    value.includes("تبييض") ||
    value.includes("whitening") ||
    value.includes("whiten")
  ) {
    return serviceImages.whitening;
  }

  if (
    value.includes("تنظيف") ||
    value.includes("cleaning") ||
    value.includes("clean") ||
    value.includes("hygiene")
  ) {
    return serviceImages.cleaning;
  }

  if (
    value.includes("تقويم") ||
    value.includes("orthodont") ||
    value.includes("braces")
  ) {
    return serviceImages.orthodontics;
  }

  if (
    value.includes("زراعة") ||
    value.includes("implant") ||
    value.includes("implants")
  ) {
    return serviceImages.implants;
  }

  // No fifth service: unknown titles simply use the first service image.
  return serviceImages.whitening;
};

const ServiceImage = ({ title, className = "" }: ServiceImageProps) => {
  const fallbackImage = getServiceImage(title);
  const [imageUrl, setImageUrl] = useState(fallbackImage);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-blue-50 ${className}`}>
      {!failed ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => {
            if (imageUrl !== serviceImages.whitening) {
              setImageUrl(serviceImages.whitening);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex flex-col items-center gap-2 text-blue-200">
            <Sparkles size={64} strokeWidth={1.5} />
            <Stethoscope size={28} strokeWidth={1.5} />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default ServiceImage;
