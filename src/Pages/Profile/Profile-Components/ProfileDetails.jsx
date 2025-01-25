/* eslint-disable react/prop-types */
import { InfoField } from './InfoField';

export function ProfileDetails({ user }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="First Name" value={user.FirstName} />
          <InfoField label="Last Name" value={user.LastName} />
          <InfoField label="Email" value={user.Email} />
          <InfoField label="Phone Number" value={user.PhoneNumber} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Country" value={user.Country} />
          <InfoField label="City" value={user.City} />
          <InfoField label="District" value={user.District} />
        </div>
      </div>
    </div>
  );
}