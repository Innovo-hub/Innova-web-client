/* eslint-disable react/prop-types */
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactInfo({ email, phone, location }) {
  return (
    <div className="flex flex-wrap gap-4 text-gray-600">
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4" />
        <span>{email}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4" />
        <span>{phone}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
    </div>
  );
}