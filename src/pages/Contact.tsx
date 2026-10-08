import axios from "axios";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white py-24 px-6"
      dir="ltr"
    >
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-4 px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            Contact Us ✨
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-5">
            Get In Touch
          </h2>

          <p className="max-w-xl mx-auto text-gray-500 text-lg leading-relaxed">
            Have a question or need an appointment?
            <br />
            Send us a message and our team will get back to you.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-2xl shadow-blue-100/60 p-6 md:p-10"
        >

          {/* Left Side */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white flex flex-col justify-between">

            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <MessageCircle size={28} />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Let's Talk 🦷
              </h3>

              <p className="text-blue-100 leading-relaxed">
                We are always happy to hear from you.
                Whether you have a question about our services
                or want to book an appointment, we're here to help.
              </p>
            </div>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs text-blue-200">
                    Email
                  </p>
                  <p className="text-sm font-medium">
                    contact@smilecare.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  📞
                </div>

                <div>
                  <p className="text-xs text-blue-200">
                    Phone
                  </p>
                  <p className="text-sm font-medium">
                    +123 456 789
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <form
  onSubmit={async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(
        "http://localhost:3000/api/contact",
        {
          email,
          message,
        }
      );

      setSuccess("Message sent successfully! 💙");

      setEmail("");
      setMessage("");

    } catch (error) {
      console.error(error);

      setError(
        "Failed to send message. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }}
  className="p-2 md:p-4 space-y-7"
>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-blue-800 mb-3"
              >
                Email Address
              </label>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
  id="email"
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  className="
    w-full
    bg-blue-50/50
    border border-blue-100
    rounded-xl
    px-5 py-4
    text-gray-700
    placeholder:text-gray-400
    outline-none
    transition-all duration-300
    focus:bg-white
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/15
    focus:shadow-lg
    focus:shadow-blue-200/40
    focus:-translate-y-1
    focus:scale-[1.02]
  "
/>
              </motion.div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-blue-800 mb-3"
              >
                Your Message
              </label>

            <textarea
  id="message"
  rows={6}
  required
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Write your message here..."
  className="
    w-full
    bg-blue-50/50
    border border-blue-100
    rounded-xl
    px-5 py-4
    text-gray-700
    placeholder:text-gray-400
    outline-none
    resize-none
    transition-all duration-300
    focus:bg-white
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/15
    focus:shadow-lg
    focus:shadow-blue-200/40
    focus:-translate-y-1
    focus:scale-[1.02]
  "
/>
            </div>

            {/* Button */}
           <motion.button
  type="submit"
  disabled={loading}
  whileHover={{ scale: loading ? 1 : 1.02 }}
  whileTap={{ scale: loading ? 1 : 0.97 }}
  className="
    w-full
    flex items-center justify-center gap-3
    bg-blue-700
    hover:bg-blue-800
    disabled:bg-blue-400
    text-white
    py-4
    rounded-xl
    font-bold
    shadow-lg
    shadow-blue-200
    transition-all duration-300
    cursor-pointer
  "
>
  <Send size={19} />

  {loading ? "Sending..." : "Send Message"}
</motion.button>

{success && (
  <p className="text-center text-green-600 font-semibold">
    {success}
  </p>
)}

{error && (
  <p className="text-center text-red-500 font-semibold">
    {error}
  </p>
)}
          </form>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <div className="relative z-10 max-w-6xl mx-auto mt-20">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-600/70 to-transparent" />
      </div>
    </section>
  );
};

export default Contact;