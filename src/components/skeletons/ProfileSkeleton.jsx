const ProfileSkeleton = () => {
  return (
    <div className="mt-10 bg-white shadow-lg w-[90%] mx-auto rounded-lg animate-pulse">
      <div className="flex items-start p-8 gap-x-6 ">
        <div className="inline-block size-[100px] sm:size-[140px] rounded-full bg-gray-200"></div>
        <div>
          <div>
            <h3 className="h-6 w-[170px] bg-gray-200 rounded-full"></h3>
          </div>
          <div className="mt-4 space-y-2">
            <p className="h-3 w-[190px] bg-gray-200 rounded-full"></p>
            <p className="h-3 w-[190px] bg-gray-200 rounded-full"></p>
            <p className="h-3 w-[190px] bg-gray-200 rounded-full"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
