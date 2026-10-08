import { motion } from "framer-motion";
import { Search, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDoctors } from "../hooks/useDoctors";
import { DoctorImage } from "../components/DoctorImage";

const Doctors = () => {
  const { data: doctors, isLoading, isError } = useDoctors();
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];

    return doctors.filter((doctor: any) => {
      const searchValue = search.toLowerCase();

      return (
        doctor.name?.toLowerCase().includes(searchValue) ||
        doctor.specialization?.toLowerCase().includes(searchValue)
      );
    });
  }, [doctors, search]);

  
  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            <Stethoscope size={18} />
            Our Medical Team
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Meet Our <span className="text-blue-600">Doctors</span>
          </h1>

          <p className="text-gray-500 text-lg mt-4 leading-8">
            Our experienced doctors are dedicated to providing high-quality
            dental care with modern techniques and personalized treatment.
          </p>
        </motion.div>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-14"
        >
          <div className="relative">
            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search doctor or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full bg-white border border-gray-200 rounded-2xl
                pl-12 pr-5 py-4 text-gray-700 shadow-sm outline-none
                transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100
              "
            />
          </div>
        </motion.div>

        {/* LOADING */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-72 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
              <Stethoscope className="text-red-500" size={30} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Unable to load doctors
            </h2>

            <p className="text-gray-500 mt-2">
              Something went wrong while loading our doctors.
            </p>
          </div>
        )}

        {/* DOCTORS */}
        {!isLoading && !isError && (
          <>
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {filteredDoctors.map((doctor: any, index: number) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                  >
                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="
                        group block bg-white rounded-3xl overflow-hidden
                        shadow-sm border border-gray-100 hover:shadow-2xl
                        transition-all duration-300
                      "
                    >
                      {/* IMAGE */}
                      <div className="relative h-80 overflow-hidden bg-blue-50">
                        <DoctorImage
                          name={doctor.name}
                          specialization={doctor.specialization}
                          className="h-full w-full"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                        {/* Badge */}
                        <div
                          className="
                          absolute top-4 left-4
                          bg-white/95 backdrop-blur-sm
                          text-blue-600 px-3 py-1.5 rounded-full
                          text-xs font-semibold shadow-sm
                        "
                        >
                          SmileCare
                        </div>

                        {/* Bottom overlay */}
                        <div className="absolute bottom-4 left-5 right-5">
                          <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                            Dental Specialist
                          </p>
                        </div>
                      </div>

                      {/* INFO */}
                      <div className="p-6">
                        <h2
                          className="
                          text-xl font-bold text-gray-800
                          group-hover:text-blue-600 transition
                        "
                        >
                          Dr. {doctor.name}
                        </h2>

                        <div className="flex items-center gap-2 mt-3">
                          <div
                            className="
                            w-9 h-9 rounded-xl bg-blue-100
                            flex items-center justify-center
                          "
                          >
                            <Stethoscope size={18} className="text-blue-600" />
                          </div>

                          <span className="text-gray-500 text-sm">
                            {doctor.specialization || "Dental Specialist"}
                          </span>
                        </div>

                        <div
                          className="
                          mt-6 pt-5 border-t border-gray-100
                          flex items-center justify-between
                        "
                        >
                          <span className="text-sm text-gray-400">
                            Specialist
                          </span>

                          <span className="text-sm font-semibold text-blue-600">
                            Available
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
                <Search size={45} className="mx-auto text-gray-300 mb-4" />

                <h2 className="text-2xl font-bold text-gray-700">
                  No doctors found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try searching with another name or specialization.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Doctors;
