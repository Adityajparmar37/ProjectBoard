function ErrorFallback({
  error,
  resetErrorBoundary,
}) {
  return (
    <div
      role="alert"
      className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-2xl text-center text-red-400 font-semibold">
        😥 Something went wrong: {" "}
        <span className="text-black font-bold">{error.message}</span>
      </p>
      <button onClick={resetErrorBoundary} className="bg-gray-100 p-2 font-semibold text-lg mt-5 rounded-md shadow-md hover:shadow-inner text-black hover:text-green-600">
       Please Try Again !
      </button>
    </div>
  );
}

export default ErrorFallback;
