import { motion } from "framer-motion";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const teamMembers = [
  {
    name: "Nader Hani",
    role: ["Team Leader", "Front End Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=NH&backgroundColor=126090",
  },
  {
    name: "Mahmoud Saad",
    role: ["Front End Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=MS&backgroundColor=126090",
  },
  {
    name: "Mohamed Samir",
    role: ["Backend Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=MS2&backgroundColor=126090",
  },
  {
    name: "Ali Ahmed",
    role: ["Backend Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=AA&backgroundColor=126090",
  },
  {
    name: "Amal Mohamed",
    role: ["Flutter Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=AM&backgroundColor=126090",
  },
  {
    name: "Ethar Abdelbadea",
    role: ["Flutter Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=EA&backgroundColor=126090",
  },
  {
    name: "Amany Hesham",
    role: ["Front End Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=AH&backgroundColor=126090",
  },
  {
    name: "Habiba Samir",
    role: ["Backend Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=HS&backgroundColor=126090",
  },
  {
    name: "Nosyba Mohamed",
    role: ["AI Developer"],
    image:
      "https://api.dicebear.com/7.x/initials/svg?seed=NM&backgroundColor=126090",
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-main-color">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-main-color/20 to-purple-900/20 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
          </div>

          <div className="relative pt-24 pb-32 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto text-center"
            >
              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
              >
                Innovating the Future
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-xl text-gray-300 leading-relaxed mb-12">
                  Small businesses often struggle to find the right
                  opportunities to grow and expand. We're here to change that
                  with a revolutionary platform that connects businesses with
                  investors and customers.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                    <span>Real-time Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                    <span>Secure Platform</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="relative py-20 bg-gradient-to-b from-gray-900/50 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our Mission
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <p className="text-gray-300">
                    The platform leverages modern technologies, including
                    artificial intelligence, to help businesses gain visibility,
                    attract investments, and provide customers with exclusive
                    products.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <p className="text-gray-300">
                    By integrating tools for market analysis, sales tracking,
                    and profit monitoring, it allows investors to make informed
                    decisions and enjoy a seamless, engaging experience.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-white mb-16"
            >
              The Innovators Behind{" "}
              <span className="text-main-color">Innova</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-main-color to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative bg-gray-800 rounded-2xl p-6 hover:bg-gray-800/80 transition-colors duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-main-color to-purple-600 rounded-full animate-pulse opacity-50" />
                        <img
                          src={member.image}
                          alt={member.name}
                          className="relative w-16 h-16 rounded-full border-2 border-white/10"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {member.name}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {member.role.map((role, roleIndex) => (
                            <span
                              key={roleIndex}
                              className="px-2 py-1 text-xs font-medium text-white bg-white/10 rounded-full backdrop-blur-sm"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
