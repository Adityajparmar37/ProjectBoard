import React from "react";

export default function FallBack() {
  return (
    <div className="fixed w-full h-full bg-WhiteLoading-rgba z-50 top-0 left-0">
      <div className="flex flex-col justify-center items-center w-full h-[80%]">
        <h1 className="text-green-400 font-semibold text-2xl text-[1.5rem]">
          Thank you for Waiting ... 😃
        </h1>
      </div>
    </div>
  );
}
