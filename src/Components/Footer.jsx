import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <footer className="bg-[#262626] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid hidden lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-wider">INNOVA HUB</h2>
            <p className="text-gray-300 leading-relaxed">
              Handmade Products made with love and hard work. We create unique
              pieces that bring joy to your life.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <NavigateNextIcon className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link
                to="/categories"
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <NavigateNextIcon className="h-4 w-4 mr-2" />
                Categories
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <NavigateNextIcon className="h-4 w-4 mr-2" />
                Contact
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <NavigateNextIcon className="h-4 w-4 mr-2" />
                About
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-gray-300">
                <LocationOnIcon className="h-5 w-5 mr-3" />
                <span>123 Street Name, City, Country</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 mr-3" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EmailIcon className="h-5 w-5 mr-3" />
                <span>info@innovahub.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates and exclusive offers!
            </p>
            <div className="space-y-3">
              <input
                className="w-full rounded-lg px-4 py-2 text-black outline-none focus:ring-2 focus:ring-main-color"
                placeholder="Your email address"
                type="email"
              />
              <button className="w-full bg-main-color hover:bg-opacity-90 transition-colors rounded-lg py-2 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-300 text-sm">
            © {new Date().getFullYear()} Innova Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
