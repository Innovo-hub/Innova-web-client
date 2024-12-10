/* eslint-disable react/prop-types */
import { ProfileImage } from "./ProfileImage";
import { ContactInfo } from "./ContactInfo";

export function ProfileHeader({ user }) {
  return (
    <div className="relative">
      <div className="h-48 bg-gradient-to-t from-white to-main-color rounded-t-xl" />

      <div className="px-6 pb-6">
        <div className="relative flex items-end -mt-20 mb-4">
          <ProfileImage
            src={
              user.profileImageUrl ||
              "https://c4.wallpaperflare.com/wallpaper/611/838/413/spiderman-hd-4k-superheroes-wallpaper-preview.jpg"
            }
            alt={`${user.firstName} ${user.lastName}`}
          />
          <div className="ml-6 pb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">
              {user.district}, {user.city}
            </p>
          </div>
        </div>

        <ContactInfo
          email={user.email}
          phone={user.phoneNumber}
          location={user.country}
        />
      </div>
    </div>
  );
}
