/* eslint-disable react/prop-types */
export function ProfileImage({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt}
        className="w-32 h-32 rounded-full border-4 border-white bg-white object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop';
        }}
      />
    );
  }