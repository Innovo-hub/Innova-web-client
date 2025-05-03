import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Avatar, Badge } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser } from "../redux/Slices/Auth-Slice/LoginReducer";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
export default function Navbar({ currentTab }) {
  const { isAuthenticated } = useSelector((state) => state.login);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const role = localStorage.getItem("role");
  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "Deals",
      href: `${role === "Investor" ? "investor/deals" : "/owner/Deals"}`,
    },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];
  const handleLogout = async () => {
    // Show loading indicator using SweetAlert2
    Swal.fire({
      title: "Logging out...",
      text: "Please wait while we log you out",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await dispatch(logoutUser()).unwrap(); // Ensure the action completes
      Swal.close(); // Close the loading modal
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "An error occurred during logout.",
      });
    } finally {
      handleClose(); // Close the dropdown menu
    }
  };
  const wishlistCount = localStorage.getItem("wishlistCount");
  const cartCount = localStorage.getItem("cartCount");
  return (
    <Disclosure as="nav" className="bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* Mobile View - Logo Only */}
        <div className="relative flex h-16 items-center justify-between sm:hidden">
          {/* Logo */}
          <Link to={"/"} className="flex-shrink-0">
            <h2 className="text-2xl font-bold">
              <span className="text-main-color">I</span>nnova
            </h2>
          </Link>

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-main-color focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
        </div>

        {/* Centered Navigation Links (for desktop) */}
        <div className="hidden sm:block">
          <Link
            to={"/"}
            className="relative flex h-16 items-center justify-between"
          >
            {/* Centered Navigation Links */}
            <h2 className="text-2xl font-bold">
              <span className="text-main-color">I</span>nnova
            </h2>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={currentTab === item.name ? "page" : undefined}
                    className={classNames(
                      currentTab === item.name
                        ? "text-main-color"
                        : "text-black-500 hover:text-main-color",
                      "px-3 py-2 text-m font-semibold"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Buttons */}

            {/* if Authinticated this will appear */}
            {isAuthenticated ? (
              <div className="flex items-center justify-center space-x-4">
                <Link to={`/wishlist`}>
                  <Badge
                    badgeContent={wishlistCount > 0 ? wishlistCount : null}
                    color="error"
                    overlap="circular"
                  >
                    <FavoriteBorderSharpIcon
                      fontSize="medium"
                      className="font-light text-gray-700"
                    />
                  </Badge>
                </Link>
                <Link to={`/cart`}>
                 <Badge
                  badgeContent={cartCount > 0 ? cartCount : null}
                  color="error"
                  overlap="circular"
                 >
                 <ShoppingCartOutlinedIcon
                    fontSize="medium"
                    className="font-light text-gray-700"
                  />
                 </Badge>
                </Link>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Avatar src={profile?.profileImageUrl}></Avatar>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <Link to={"/UserProfile"}>View Profile </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
            ) : (
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
                        : "px-4 py-2 bg-main-color text-white text-sm font-medium rounded-md"
                    )}
                  >
                    Get Started for Free
                  </button>
                </Link>
              </div>
            )}
          </Link>
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
                  ? "text-main-color"
                  : "text-black-500 hover:text-main-color",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>

        {/* Right Side Buttons for Mobile */}
        {isAuthenticated ? (
          <div className="flex justify-center items-center w-full">
            <Link to={"/UserProfile"}>
              <button className="px-4 w-full py-2 bg-main-color text-white my-2 font-medium rounded-md">
                User Profile{" "}
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2 px-2 pb-3">
            <Link to={"/auth/login"}>
              <button className="w-full mb-2 px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-gray-700">
                Sign In
              </button>
            </Link>
            <Link to={"/auth/register"}>
              <button className="w-full px-4 py-2 bg-main-color text-white text-sm font-medium rounded-md">
                Get Started for Free
              </button>
            </Link>
          </div>
        )}
      </Disclosure.Panel>
    </Disclosure>
  );
}
