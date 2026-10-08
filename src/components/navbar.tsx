import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  // ================================
  // Detect Scroll
  // ================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ================================
  // Scroll To Top
  // ================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // ================================
  // Navigation Click
  // ================================

  const handleNavClick = (path: string) => {
    setIsOpen(false);

    /*
      إذا ضغطنا على نفس الصفحة:
      نذهب مباشرة إلى الأعلى.
    */

    if (location.pathname === path) {
      scrollToTop();
      return;
    }

    /*
      إذا انتقلنا إلى صفحة أخرى،
      React Router سيغير الـ pathname،
      و ScrollToTop component سيعيد الصفحة للأعلى.
    */
  };

  // ================================
  // Navigation Links
  // ================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Doctors",
      path: "/doctors",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <motion.nav
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        px-3
        md:px-6
        pt-3
      "
    >
      {/* =====================================
          NAVBAR CONTAINER
      ====================================== */}

      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.96)"
            : "rgba(255,255,255,0.10)",

          boxShadow: scrolled
            ? "0 12px 35px rgba(30,64,175,0.14)"
            : "0 0 0 rgba(0,0,0,0)",

          borderColor: scrolled
            ? "rgba(59,130,246,0.15)"
            : "rgba(255,255,255,0.25)",
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="
          relative
          max-w-7xl
          mx-auto
          rounded-2xl
          border
          backdrop-blur-xl
          overflow-hidden
        "
      >
        {/* =====================================
            BACKGROUND GRADIENT
        ====================================== */}

        <motion.div
          animate={{
            opacity: scrolled ? 1 : 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            absolute
            inset-0
            pointer-events-none
            bg-gradient-to-r
            from-blue-600/10
            via-blue-100/20
            to-transparent
          "
        />

        {/* =====================================
            NAVBAR CONTENT
        ====================================== */}

        <div className="relative z-10 px-5 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* =====================================
                LOGO
            ====================================== */}

            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className="group"
            >
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="flex items-center gap-2"
              >
                {/* Logo Icon */}

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gradient-to-br
                    from-blue-600
                    to-blue-800
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                    shadow-lg
                    shadow-blue-200
                  "
                >
                  🦷
                </div>

                {/* Logo Text */}

                <div className="flex flex-col leading-none">
                  <span
                    className="
                      text-xl
                      md:text-2xl
                      font-extrabold
                      text-blue-700
                    "
                  >
                    SmileCare
                  </span>

                  <span
                    className="
                      text-[9px]
                      md:text-[10px]
                      text-gray-400
                      tracking-[0.2em]
                      uppercase
                    "
                  >
                    Dental Clinic
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* =====================================
                DESKTOP NAVIGATION
            ====================================== */}

            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path;

                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() =>
                        handleNavClick(link.path)
                      }
                      className={`
                        group
                        relative
                        block
                        px-4
                        py-2.5
                        rounded-xl
                        font-semibold
                        text-sm
                        transition-all
                        duration-300

                        ${
                          scrolled
                            ? isActive
                              ? "text-blue-700 bg-blue-50"
                              : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                            : isActive
                              ? "text-white bg-white/15"
                              : "text-white/90 hover:text-white hover:bg-white/15"
                        }
                      `}
                    >
                      {link.name}

                      {/* Active / Hover Line */}

                      <span
                        className={`
                          absolute
                          bottom-1
                          left-1/2
                          -translate-x-1/2
                          h-[2px]
                          bg-blue-600
                          rounded-full
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "w-5"
                              : "w-0 group-hover:w-5"
                          }
                        `}
                      />
                    </Link>
                  </li>
                );
              })}

              {/* =====================================
                  BOOK APPOINTMENT
              ====================================== */}

              <li className="ml-2">
                <motion.div
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <Link
                    to="/appointment"
                    onClick={() =>
                      handleNavClick("/appointment")
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      bg-gradient-to-r
                      from-blue-600
                      to-blue-700
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      font-semibold
                      text-sm
                      shadow-lg
                      shadow-blue-200
                      hover:shadow-blue-300
                      transition-all
                      duration-300
                    "
                  >
                    Book Appointment

                    <span>→</span>
                  </Link>
                </motion.div>
              </li>
            </ul>

            {/* =====================================
                MOBILE MENU BUTTON
            ====================================== */}

            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="
                md:hidden
                relative
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                overflow-hidden
                border
                border-blue-100
                bg-white/90
                backdrop-blur-xl
                text-blue-700
                shadow-lg
                shadow-blue-100/50
                transition-all
                duration-300
              "
              aria-label="Toggle menu"
            >
              {/* Mobile Button Background */}

              <motion.div
                animate={{
                  scale: isOpen ? 1 : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  absolute
                  inset-0
                  bg-blue-50
                  rounded-2xl
                "
              />

              {/* Icon */}

              <motion.div
                animate={{
                  rotate: isOpen ? 90 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                {isOpen ? (
                  <X
                    size={25}
                    strokeWidth={2.5}
                  />
                ) : (
                  <Menu
                    size={25}
                    strokeWidth={2.5}
                  />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* =====================================
              MOBILE MENU
          ====================================== */}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -15,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  md:hidden
                  mt-3
                  rounded-2xl
                  border
                  border-blue-100
                  bg-white/95
                  backdrop-blur-2xl
                  shadow-2xl
                  shadow-blue-200/30
                  overflow-hidden
                "
              >
                {/* Mobile Header */}

                <div className="px-5 pt-5 pb-3">
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-blue-500
                      font-bold
                    "
                  >
                    Navigation
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Explore SmileCare
                  </p>
                </div>

                {/* Mobile Links */}

                <div className="px-3 pb-3">
                  {navLinks.map(
                    (link, index) => {
                      const isActive =
                        location.pathname ===
                        link.path;

                      return (
                        <motion.div
                          key={link.path}
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.06,
                            duration: 0.3,
                          }}
                        >
                          <Link
                            to={link.path}
                            onClick={() =>
                              handleNavClick(
                                link.path
                              )
                            }
                            className={`
                              group
                              flex
                              items-center
                              justify-between
                              px-4
                              py-3.5
                              rounded-xl
                              font-semibold
                              transition-all
                              duration-300

                              ${
                                isActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              {/* Number */}

                              <span
                                className={`
                                  flex
                                  items-center
                                  justify-center
                                  w-7
                                  h-7
                                  rounded-lg
                                  text-xs
                                  font-bold
                                  transition-all
                                  duration-300

                                  ${
                                    isActive
                                      ? "bg-blue-600 text-white"
                                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                                  }
                                `}
                              >
                                {String(
                                  index + 1
                                ).padStart(2, "0")}
                              </span>

                              <span>
                                {link.name}
                              </span>
                            </div>

                            {/* Arrow */}

                            <span
                              className="
                                text-blue-500
                                opacity-60
                                group-hover:opacity-100
                                transition-all
                              "
                            >
                              →
                            </span>
                          </Link>
                        </motion.div>
                      );
                    }
                  )}

                  {/* Divider */}

                  <div className="h-px bg-blue-100 my-3" />

                  {/* Mobile Appointment */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.35,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      to="/appointment"
                      onClick={() =>
                        handleNavClick(
                          "/appointment"
                        )
                      }
                      className="
                        relative
                        overflow-hidden
                        flex
                        items-center
                        justify-center
                        gap-2
                        w-full
                        bg-gradient-to-r
                        from-blue-600
                        to-blue-700
                        text-white
                        py-3.5
                        rounded-xl
                        font-bold
                        shadow-lg
                        shadow-blue-200
                        hover:shadow-blue-300
                        transition-all
                        duration-300
                      "
                    >
                      {/* Shine */}

                      <motion.div
                        animate={{
                          x: [
                            "-120%",
                            "120%",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        className="
                          absolute
                          inset-y-0
                          w-20
                          bg-white/20
                          skew-x-[-20deg]
                        "
                      />

                      <span className="relative z-10">
                        🗓️ Book Appointment
                      </span>

                      <span className="relative z-10">
                        →
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;