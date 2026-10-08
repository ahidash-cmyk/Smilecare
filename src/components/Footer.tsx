import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowUp,
  Heart,
} from "lucide-react";
import { FaFacebook , FaInstagram } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      dir="rtl"
      className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white overflow-hidden"
    >
      {/* Decorative Background */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

    

      {/* ========================= */}
      {/* MAIN FOOTER */}
      {/* ========================= */}

      <div className="relative max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


          {/* ========================= */}
          {/* ABOUT */}
          {/* ========================= */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-2xl">
                🦷
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  SmileCare
                </h2>

                <p className="text-xs text-blue-300">
                  Your Smile. Our Passion.
                </p>

              </div>

            </div>


            <p className="text-blue-100/80 leading-7 text-sm">
              نقدم لك تجربة متكاملة في طب الأسنان
              باستخدام أحدث التقنيات وبإشراف نخبة من
              الأطباء المختصين. لأن ابتسامتك تستحق
              أفضل رعاية ممكنة. 💙
            </p>


            {/* Social */}

            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-600 transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-600 transition"
              >
                <MessageCircle size={18} />
              </a>

            </div>

          </div>


          {/* ========================= */}
          {/* QUICK LINKS */}
          {/* ========================= */}

          <div>

            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              🔗 روابط سريعة
            </h3>

            <ul className="space-y-4 text-blue-100/80">

              <li>
                <a
                  href="/"
                  className="hover:text-white hover:mr-2 transition-all"
                >
                  الرئيسية
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="hover:text-white hover:mr-2 transition-all"
                >
                  من نحن
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="hover:text-white hover:mr-2 transition-all"
                >
                  خدماتنا
                </a>
              </li>

              <li>
                <a
                  href="/doctors"
                  className="hover:text-white hover:mr-2 transition-all"
                >
                  أطباؤنا
                </a>
              </li>

              <li>
                <a
                  href="/appointment"
                  className="hover:text-white hover:mr-2 transition-all"
                >
                  حجز موعد 📅
                </a>
              </li>

            </ul>

          </div>


          {/* ========================= */}
          {/* SERVICES */}
          {/* ========================= */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              🦷 خدماتنا
            </h3>

            <ul className="space-y-4 text-blue-100/80">

              <li className="hover:text-white transition">
                ✨ تبييض الأسنان
              </li>

              <li className="hover:text-white transition">
                🦷 تنظيف الأسنان
              </li>

              <li className="hover:text-white transition">
                🪥 تقويم الأسنان
              </li>

              <li className="hover:text-white transition">
                💎 زراعة الأسنان
              </li>

            </ul>

          </div>


          {/* ========================= */}
          {/* CONTACT */}
          {/* ========================= */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              📞 تواصل معنا
            </h3>


            <div className="space-y-5">


              {/* Phone */}

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">

                  <Phone size={18} />

                </div>

                <div>

                  <p className="text-xs text-blue-300 mb-1">
                    الهاتف
                  </p>

                  <p className="text-sm">
                    123-456-789
                  </p>

                </div>

              </div>


              {/* Email */}

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">

                  <Mail size={18} />

                </div>

                <div>

                  <p className="text-xs text-blue-300 mb-1">
                    البريد الإلكتروني
                  </p>

                  <p className="text-sm break-all">
                    info@smilecare.com
                  </p>

                </div>

              </div>


              {/* Location */}

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">

                  <MapPin size={18} />

                </div>

                <div>

                  <p className="text-xs text-blue-300 mb-1">
                    العنوان
                  </p>

                  <p className="text-sm">
                    دمشق - سوريا 🇸🇾
                  </p>

                </div>

              </div>


              {/* Working Hours */}

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">

                  <Clock size={18} />

                </div>

                <div>

                  <p className="text-xs text-blue-300 mb-1">
                    أوقات العمل
                  </p>

                  <p className="text-sm">
                    السبت - الخميس
                  </p>

                  <p className="text-sm text-blue-200">
                    09:00 - 17:00
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* BOTTOM */}
      {/* ========================= */}

      <div className="relative border-t border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-blue-200/70 text-center">

            © 2026 SmileCare.
            جميع الحقوق محفوظة ❤️

          </p>


          <p className="text-sm text-blue-200/70 flex items-center gap-1">

            صُمم بـ
            <Heart
              size={15}
              className="fill-current"
            />
            من أجل ابتسامتك

          </p>


          {/* Back To Top */}

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
            title="العودة للأعلى"
          >

            <ArrowUp size={18} />

          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;