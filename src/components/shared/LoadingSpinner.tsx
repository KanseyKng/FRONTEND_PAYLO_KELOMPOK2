const UserLoadingSpinner = () => {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center gap-3 border border-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#08F] border-t-transparent" />
        <p className="text-gray-600 font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default UserLoadingSpinner;