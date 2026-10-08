import { useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Stethoscope,
  BriefcaseMedical,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useDoctors } from "../../hooks/useDoctors";
import { useServices } from "../../hooks/useServices";
import { useAvailableTimes } from "../../hooks/useAvailableTimes";
import { useAddAppointment } from "../../hooks/useAddAppointment";

// ============================================
// FRAMER MOTION VARIANTS
// ============================================

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const timeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

const AppointmentForm = () => {
  // ==============================
  // GET DOCTORS
  // ==============================

  const {
    data: doctors,
    isLoading: doctorsLoading,
  } = useDoctors();

  // ==============================
  // GET SERVICES
  // ==============================

  const {
    data: services,
    isLoading: servicesLoading,
  } = useServices();

  // ==============================
  // ADD APPOINTMENT
  // ==============================

  const addAppointment = useAddAppointment();

  // ==============================
  // FORM STATES
  // ==============================

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [doctorId, setDoctorId] =
    useState<number | null>(null);

  const [serviceId, setServiceId] =
    useState<number | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ==============================
  // AVAILABLE TIMES
  // ==============================

  const {
    data: availableTimes,
    isLoading: timesLoading,
  } = useAvailableTimes(doctorId, date);

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !patientName ||
      !phone ||
      !email ||
      !doctorId ||
      !serviceId ||
      !date ||
      !time
    ) {
      toast.error(
        "Please complete all appointment fields"
      );

      return;
    }

    addAppointment.mutate(
      {
        patient_name: patientName,
        phone,
        email,
        doctor_id: doctorId,
        service_id: serviceId,
        appointment_date: date,
        appointment_time: time,
      },

      {
        onSuccess: () => {
          toast.success(
            "Appointment booked successfully! 🎉"
          );

          setPatientName("");
          setPhone("");
          setEmail("");
          setDoctorId(null);
          setServiceId(null);
          setDate("");
          setTime("");
        },

        onError: (error: any) => {
          if (
            error?.response?.status === 409
          ) {
            toast.error(
              "This appointment is already booked"
            );
          } else {
            toast.error(
              "Failed to book appointment"
            );
          }
        },
      }
    );
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // ==============================
  // RETURN
  // ==============================

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-blue-200/30
            blur-3xl
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-32
            -left-32
            h-80
            w-80
            rounded-full
            bg-cyan-200/30
            blur-3xl
          "
        />

        <div className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_35%)]
        " />

      </div>

      {/* MAIN */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          z-10
          mx-auto
          max-w-4xl
        "
      >

        <div className="
          overflow-hidden
          rounded-[2rem]
          border
          border-blue-100
          bg-white/90
          shadow-2xl
          shadow-blue-200/30
          backdrop-blur-xl
        ">

          {/* HEADER */}

          <motion.div
            variants={itemVariants}
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-blue-600
              via-blue-700
              to-indigo-800
              px-6
              py-10
              sm:px-10
            "
          >

            <motion.div
              animate={{
                x: ["-120%", "120%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
              className="
                absolute
                inset-y-0
                left-0
                w-32
                bg-white/10
                skew-x-[-20deg]
              "
            />

            <div className="relative z-10">

              <div className="mb-5 flex items-center gap-3">

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.05,
                  }}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/15
                    text-white
                    shadow-lg
                    backdrop-blur-md
                  "
                >
                  <CalendarDays size={25} />
                </motion.div>

                <div>
                  <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-blue-100
                  ">
                    <Sparkles size={15} />
                    SmileCare
                  </div>

                  <p className="text-xs text-blue-200">
                    Your smile, our priority
                  </p>
                </div>

              </div>

              <h1 className="
                text-3xl
                font-black
                tracking-tight
                text-white
                sm:text-4xl
              ">
                Book Your Appointment
              </h1>

              <p className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-blue-100
                sm:text-base
              ">
                Choose your doctor, service, preferred
                date and available time.
              </p>

            </div>
          </motion.div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10"
          >

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-7"
            >

              {/* PATIENT INFORMATION */}

              <motion.div
                variants={itemVariants}
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/70
                  p-5
                  sm:p-6
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                  ">
                    <User size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      Patient Information
                    </h2>

                    <p className="text-xs text-slate-400">
                      Tell us how we can contact you
                    </p>
                  </div>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <AnimatedInput
                    label="Patient Name"
                    icon={<User size={18} />}
                    type="text"
                    placeholder="Enter patient name"
                    value={patientName}
                    onChange={setPatientName}
                  />

                  <AnimatedInput
                    label="Phone Number"
                    icon={<Phone size={18} />}
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                  />

                  <div className="md:col-span-2">

                    <AnimatedInput
                      label="Email Address"
                      icon={<Mail size={18} />}
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={setEmail}
                    />

                  </div>

                </div>

              </motion.div>

              {/* APPOINTMENT DETAILS */}

              <motion.div
                variants={itemVariants}
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-white
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                  ">
                    <Stethoscope size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      Appointment Details
                    </h2>

                    <p className="text-xs text-slate-400">
                      Select your preferred treatment
                    </p>
                  </div>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <AnimatedSelect
                    label="Doctor"
                    icon={<Stethoscope size={18} />}
                    value={doctorId ?? ""}
                    onChange={(value) => {
                      setDoctorId(
                        value
                          ? Number(value)
                          : null
                      );

                      setTime("");
                    }}
                    loading={doctorsLoading}
                    loadingText="Loading doctors..."
                    placeholder="Select Doctor"
                  >
                    {doctors?.map(
                      (doctor: any) => (
                        <option
                          key={doctor.id}
                          value={doctor.id}
                        >
                          {doctor.name} -{" "}
                          {doctor.specialization}
                        </option>
                      )
                    )}
                  </AnimatedSelect>

                  <AnimatedSelect
                    label="Dental Service"
                    icon={<BriefcaseMedical size={18} />}
                    value={serviceId ?? ""}
                    onChange={(value) =>
                      setServiceId(
                        value
                          ? Number(value)
                          : null
                      )
                    }
                    loading={servicesLoading}
                    loadingText="Loading services..."
                    placeholder="Select Service"
                  >
                    {services?.map(
                      (service: any) => (
                        <option
                          key={service.id}
                          value={service.id}
                        >
                          {service.title}
                        </option>
                      )
                    )}
                  </AnimatedSelect>

                  <div className="md:col-span-2">

                    <label className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-bold
                      text-slate-700
                    ">
                      <CalendarDays
                        size={17}
                        className="text-blue-600"
                      />

                      Appointment Date
                    </label>

                    <motion.div whileFocus={{ scale: 1.01 }}>
                      <input
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setTime("");
                        }}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          py-3.5
                          text-sm
                          font-medium
                          text-slate-700
                          outline-none
                          transition-all
                          duration-300
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                          hover:border-blue-200
                        "
                        required
                      />
                    </motion.div>

                  </div>

                </div>

              </motion.div>

              {/* AVAILABLE TIMES */}

              <AnimatePresence mode="wait">

                {doctorId && date && (
                  <motion.div
                    key={`${doctorId}-${date}`}
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-blue-100
                      bg-blue-50/50
                      p-5
                      sm:p-6
                    "
                  >

                    <div className="
                      mb-5
                      flex
                      items-center
                      justify-between
                    ">

                      <div className="flex items-center gap-3">

                        <div className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-100
                          text-blue-600
                        ">
                          <Clock3 size={20} />
                        </div>

                        <div>
                          <h2 className="font-bold text-slate-800">
                            Available Time
                          </h2>

                          <p className="text-xs text-slate-400">
                            Select your preferred time
                          </p>
                        </div>

                      </div>

                      {time && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className="
                            hidden
                            items-center
                            gap-1.5
                            rounded-full
                            bg-blue-600
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-white
                            sm:flex
                          "
                        >
                          <CheckCircle2 size={14} />
                          Selected
                        </motion.div>
                      )}

                    </div>

                    {timesLoading ? (

                      <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        bg-white
                        p-6
                        text-sm
                        font-medium
                        text-slate-500
                      ">
                        <Loader2
                          size={20}
                          className="animate-spin text-blue-600"
                        />

                        Loading available times...
                      </div>

                    ) : availableTimes &&
                      availableTimes.length > 0 ? (

                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="
                          grid
                          grid-cols-2
                          gap-3
                          sm:grid-cols-4
                        "
                      >

                        {availableTimes.map(
                          (availableTime: string) => (
                            <motion.button
                              key={availableTime}
                              type="button"
                              variants={timeVariants}
                              whileHover={{
                                y: -3,
                                scale: 1.03,
                              }}
                              whileTap={{
                                scale: 0.96,
                              }}
                              onClick={() =>
                                setTime(availableTime)
                              }
                              className={`
                                relative
                                overflow-hidden
                                rounded-xl
                                border
                                px-3
                                py-3.5
                                text-sm
                                font-bold
                                transition-all
                                duration-300
                                ${
                                  time === availableTime
                                    ? `
                                      border-blue-600
                                      bg-blue-600
                                      text-white
                                      shadow-lg
                                      shadow-blue-200
                                    `
                                    : `
                                      border-slate-200
                                      bg-white
                                      text-slate-700
                                      hover:border-blue-300
                                      hover:bg-blue-50
                                      hover:text-blue-700
                                    `
                                }
                              `}
                            >

                              {time === availableTime && (
                                <motion.div
                                  layoutId="selectedTime"
                                  className="
                                    absolute
                                    inset-0
                                    bg-blue-600
                                  "
                                />
                              )}

                              <span className="
                                relative
                                z-10
                                flex
                                items-center
                                justify-center
                                gap-2
                              ">
                                <Clock3 size={15} />
                                {availableTime}
                              </span>

                            </motion.button>
                          )
                        )}

                      </motion.div>

                    ) : (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          rounded-xl
                          border
                          border-red-100
                          bg-red-50
                          p-5
                          text-center
                          text-sm
                          font-semibold
                          text-red-500
                        "
                      >
                        No available times for this date.
                      </motion.div>

                    )}

                  </motion.div>
                )}

              </AnimatePresence>

              {/* SELECTED TIME */}

              <AnimatePresence>

                {time && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.97,
                    }}
                    className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-blue-200
                      bg-gradient-to-r
                      from-blue-50
                      to-cyan-50
                      p-5
                    "
                  >

                    <motion.div
                      animate={{
                        x: ["-120%", "120%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        inset-y-0
                        w-24
                        bg-white/40
                        skew-x-[-20deg]
                      "
                    />

                    <div className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-between
                    ">

                      <div className="flex items-center gap-3">

                        <div className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-600
                          text-white
                          shadow-lg
                          shadow-blue-200
                        ">
                          <CheckCircle2 size={22} />
                        </div>

                        <div>
                          <p className="
                            text-xs
                            font-semibold
                            text-blue-500
                          ">
                            Selected Time
                          </p>

                          <p className="
                            mt-0.5
                            text-lg
                            font-black
                            text-blue-900
                          ">
                            {time}
                          </p>
                        </div>

                      </div>

                      <span className="
                        hidden
                        rounded-full
                        bg-white
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-blue-600
                        shadow-sm
                        sm:block
                      ">
                        Ready ✓
                      </span>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

              {/* SUBMIT */}

              <motion.div
                variants={itemVariants}
                className="pt-2"
              >

                <motion.button
                  type="submit"
                  disabled={addAppointment.isPending}
                  whileHover={{
                    scale: addAppointment.isPending
                      ? 1
                      : 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    via-blue-700
                    to-indigo-700
                    px-6
                    py-4
                    font-bold
                    text-white
                    shadow-xl
                    shadow-blue-200
                    transition-all
                    duration-300
                    hover:shadow-2xl
                    hover:shadow-blue-300
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {!addAppointment.isPending && (
                    <motion.div
                      animate={{
                        x: ["-120%", "120%"],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        inset-y-0
                        left-0
                        w-24
                        bg-white/20
                        skew-x-[-20deg]
                      "
                    />
                  )}

                  <span className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-2
                  ">

                    {addAppointment.isPending ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Booking...
                      </>
                    ) : (
                      <>
                        <CalendarDays size={20} />

                        Book Appointment

                        <motion.span
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight size={19} />
                        </motion.span>
                      </>
                    )}

                  </span>

                </motion.button>

                <p className="
                  mt-4
                  text-center
                  text-xs
                  text-slate-400
                ">
                  🔒 Your information is safe and will
                  only be used to manage your appointment.
                </p>

              </motion.div>

            </motion.div>

          </form>

        </div>

      </motion.div>

    </section>
  );
};

// ============================================
// ANIMATED INPUT
// ============================================

type AnimatedInputProps = {
  label: string;
  icon: ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const AnimatedInput = ({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
}: AnimatedInputProps) => {
  return (
    <div>

      <label className="
        mb-2
        flex
        items-center
        gap-2
        text-sm
        font-bold
        text-slate-700
      ">
        <span className="text-blue-600">
          {icon}
        </span>

        {label}
      </label>

      <motion.div whileFocus={{ scale: 1.01 }}>
        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3.5
            text-sm
            font-medium
            text-slate-700
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-400
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/10
            hover:border-blue-200
          "
        />
      </motion.div>

    </div>
  );
};

// ============================================
// ANIMATED SELECT
// ============================================

type AnimatedSelectProps = {
  label: string;
  icon: ReactNode;
  value: string | number;
  onChange: (value: string) => void;
  loading: boolean;
  loadingText: string;
  placeholder: string;
  children: ReactNode;
};

const AnimatedSelect = ({
  label,
  icon,
  value,
  onChange,
  loading,
  loadingText,
  placeholder,
  children,
}: AnimatedSelectProps) => {
  return (
    <div>

      <label className="
        mb-2
        flex
        items-center
        gap-2
        text-sm
        font-bold
        text-slate-700
      ">
        <span className="text-blue-600">
          {icon}
        </span>

        {label}
      </label>

      <motion.div whileFocus={{ scale: 1.01 }}>
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          required
          className="
            w-full
            cursor-pointer
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3.5
            text-sm
            font-medium
            text-slate-700
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/10
            hover:border-blue-200
          "
        >

          <option value="">
            {loading
              ? loadingText
              : placeholder}
          </option>

          {children}

        </select>
      </motion.div>

    </div>
  );
};

export default AppointmentForm;