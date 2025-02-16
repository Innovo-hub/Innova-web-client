import React from 'react'
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
function ProfileSidebar() {
    const handleLogout = async () => {
        // Show loading indicator using SweetAlert2
        localStorage.removeItem("accessToken");
        Swal.fire({
            title: "Logging out...",
            text: "Please wait while we log you out",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.close();
            },
        });
        navigate('/');
    }
    return (
        <aside className="w-full md:w-64 p-4 mb-4 md:mb-0">
            <nav className="space-y-4">
                <a
                    href="#"
                    className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                    <PermIdentityIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                    Personal Information
                </a>
                <a
                    href="#"
                    className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                    <VerifiedUserOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                    Privacy & Security
                </a>
                <a
                    href="#"
                    className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                    <LocalAtmOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                    Payment Methods
                </a>
                <a
                    href="#"
                    className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                    <TrendingUpIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                    Current Deals
                </a>
                <a
                    href="#"
                    className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                    <LocalMallOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                    Orders
                </a>
                <a
                    href="#"
                    className="flex items-center text-gray-700 font-semibold hover:text-red-500"
                    onClick={handleLogout}
                >
                    <LogoutRoundedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                    Log Out
                </a>
            </nav>
        </aside>
    )
}

export default ProfileSidebar
