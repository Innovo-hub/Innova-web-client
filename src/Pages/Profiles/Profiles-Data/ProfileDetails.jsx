/* eslint-disable react/prop-types */
//this Component to show Data EX: City ,Email,Phone and It will recome from infoFiled to make code short
import InfoField from "./InfoField";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
function ProfileDetails({ user }) {
  return (
    <div className="bg-[#F7F7F7]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/*Return all detail data that has label^^ */}
        <InfoField label="Email" value={user.Email} />
        <InfoField label="Phone" value={user.PhoneNumber} />
        {/* Role section with conditional rendering */}
        <div className="flex lg:justify-end">
          {user.RoleName && (
            <InfoField
              label="Role"
              value={user.RoleName}
              isBusinessRole={true}
            />
          )}
        </div>
        <InfoField label="City" value={user.City} />
        <InfoField label="District" value={user.District} />

        {/* <div className="flex justify-end">
          <DriveFileRenameOutlineIcon className="text-[#126090] w-5 h-5 cursor-pointer hover:text-blue-500"/>
        </div> */}
      </div>
    </div>
  );
}
export default ProfileDetails;
