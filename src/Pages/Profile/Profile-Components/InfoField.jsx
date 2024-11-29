/* eslint-disable react/prop-types */
export function InfoField({ label, value }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600">{label}</label>
        <p className="mt-1 text-gray-900">{value}</p>
      </div>
    );
  }