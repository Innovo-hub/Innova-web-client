import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../redux/Slices/User-Slice/UserProfile";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
export default function Navbar({ currentTab }) {
  const { isAuthenticated } = useSelector((state) => state.login);
  const { token } = useSelector((state) => state.login);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile({ token }));
  }, [dispatch, token]);
  console.log(profile);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  return (
    <Disclosure as="nav" className="bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* Mobile View - Logo Only */}
        <div className="relative flex h-16 items-center justify-between sm:hidden">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold">Innova</h2>
          </div>

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-main-button-bg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
        </div>

        {/* Centered Navigation Links (for desktop) */}
        <div className="hidden sm:block">
          <div className="relative flex h-16 items-center justify-between">
            {/* Centered Navigation Links */}
            <h2 className="text-2xl font-bold">Innova</h2>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={currentTab === item.name ? "page" : undefined}
                    className={classNames(
                      currentTab === item.name
                        ? "text-[#Db4444]"
                        : "text-black-500 hover:text-[#Db4444]",
                      "px-3 py-2 text-m font-semibold"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Buttons */}
            <div
              className={
                isAuthenticated ? "hidden" : "flex items-center space-x-4"
              }
            >
              <Link to={"/auth/login"}>
                <button
                  className={classNames(
                    currentTab === "Auth"
                      ? "hidden"
                      : "px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-gray-700"
                  )}
                >
                  Sign In
                </button>
              </Link>
              <Link to={"/auth/register"}>
                <button
                  className={classNames(
                    currentTab === "Auth"
                      ? "hidden"
                      : "px-4 py-2 bg-[#Db4444] text-white text-sm font-medium rounded-md"
                  )}
                >
                  Get Started for Free
                </button>
              </Link>
            </div>
            {/* if Authinticated this will appear */}
            <div className="flex">
              <Link to={"/user-profile"}>
                {" "}
                <Avatar src={profile?.profileImageUrl}></Avatar>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (for mobile) */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={currentTab === item.name ? "page" : undefined}
              className={classNames(
                currentTab === item.name
                  ? "text-[#BF3F00]"
                  : "text-black-500 hover:text-[#BF3F00]",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>

        {/* Right Side Buttons for Mobile */}
        <div className="space-y-2 px-2 pb-3">
          <Link to={"/auth/login"}>
            <button className="w-full mb-2 px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-gray-700">
              Sign In
            </button>
          </Link>
          <Link to={"/auth/register"}>
            <button className="w-full px-4 py-2 bg-[#Db4444] text-white text-sm font-medium rounded-md">
              Get Started for Free
            </button>
          </Link>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
