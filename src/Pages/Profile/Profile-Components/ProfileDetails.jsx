/* eslint-disable react/prop-types */
import { InfoField } from './InfoField';

export function ProfileDetails({ user }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="First Name" value={user.firstName} />
          <InfoField label="Last Name" value={user.lastName} />
          <InfoField label="Email" value={user.email} />
          <InfoField label="Phone Number" value={user.phoneNumber} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Country" value={user.country} />
          <InfoField label="City" value={user.city} />
          <InfoField label="District" value={user.district} />
        </div>
      </div>
    </div>
  );
}