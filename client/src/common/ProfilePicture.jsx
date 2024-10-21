import React from 'react';

const ProfilePicture = ({ imgUrl, altText, size = 'w-25 h-25', rounded = 'rounded-full' }) => {
  return (
    <div className={`flex justify-center items-center`}>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={altText}
          className={`${size} ${rounded} object-cover`}
        />
      ) : (
        <div className={`${size} ${rounded} bg-gray-200 flex justify-center items-center`}>
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;