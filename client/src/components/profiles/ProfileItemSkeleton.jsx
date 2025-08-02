import React from "react";

function ProfileItemSkeleton() {
  return (

    
      <div className="relative px-5 pt-5 pb-5 mt-0 mb-5 overflow-hidden bg-white border shadow-sm y-5 md:pt-8 md:pb-10 md:px-10 border-gray-300/50 rounded-xl">
        <div
          className={`absolute top-0 right-0 w-full md:h-30 h-20 bg-gray-100`}
        ></div>
          <div
            className="absolute z-20 w-20 h-20 mx-auto transform translate-x-1/2 bg-gray-100 border-white rounded-full border-3 md:top-15 top-10 right-1/2 md:h-25 md:w-25"
            alt="avatar"
          ></div>
          <div className="md:mt-35 mt-30">
            <h2 className="h-5 text-lg text-center truncate bg-gray-100 w-30"></h2>
            <p className="w-40 h-5 mt-2 mb-5 text-base font-light text-center truncate bg-gray-100 md:mb-8">
              
            </p>
            <div className="  flex justify-center w-full py-1 md:py-1.5 rounded-full  bg-gray-100 text-gray-100 active:bg-gray-100">
              .
            </div>
            <button className="mt-2.5  flex items-center justify-center w-full py-1 md:py-1.5  border  bg-gray-100 rounded-full gap-x-2 text-gray-100">
               .
            </button>
          </div>
        </div>
   
      
  );
}

export default ProfileItemSkeleton;
