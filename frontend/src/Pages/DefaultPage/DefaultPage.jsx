import { Link } from "react-router-dom";

export default function DefaultPage() {
  return (
    <div className="pt-20 bg-gradient-to-b from-sky-300 h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center md:text-left md:ml-10">
        <h1 className="text-black text-4xl font-bold md:text-xl md:mt-25 lg:text-5xl">
          We bring all your projects, tasks, and teammates together...
        </h1>
        <hr className="border-t-2 border-white my-10 md:w-[30rem] lg:w-[40rem]" />
        <Link to="/signup">
          <button
            type="button"
            className="w-28 h-14 text-white bg-blue-700 hover:bg-blue-800 hover:rounded-[5rem] focus:ring-2 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white"
          >
            Sign Up
          </button>
        </Link>
      </div>
      <img src="../../../public/DeaultScreenImg_1.webp" className="md:w-[50rem] lg:w-[50rem]" alt="Image Representation" />
    </div>
  );
}
