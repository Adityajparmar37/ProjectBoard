import { useEffect, useState, useRef } from "react";
import { useLoading } from "../../Hooks/useLoading";
import { getAllProject } from "../../Services/projectServices";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import { debouncedFetch } from "../../utils/debounceFn";

export default function Filters({ setStudentProjects, pageSize }) {
  const { showLoading, hideLoading } = useLoading();
  const [filters, setFilters] = useState({
    keywordSearch: "",
    title: "",
    category: "",
    status: "",
    sort: "",
    Page: 1,
  });

  // Stable reference to the debounced function // it will not create new instance of debounceFn each time on rendering
  const debouncedFetchProjects = useRef(
    debouncedFetch(async (updatedFilters) => {
      try {
        showLoading();
        const filteredProjects = await getAllProject(updatedFilters, pageSize);
        setStudentProjects(filteredProjects);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Error fetching filtered projects:", error);
      }
    }, 500)
  );

  useEffect(() => {
    debouncedFetchProjects.current(filters);
  }, [filters]);

  // Other optoin is to dealy api in useEffect itself no need to create a debounce functino and stuff ...

  //   useEffect(() => {
  //     const timer = setTimeout(async () => {
  //       try {
  //         showLoading();
  //         const filteredProjects = await getAllProject(filters, pageSize);
  //         setStudentProjects(filteredProjects);
  //         hideLoading();
  //       } catch (error) {
  //         hideLoading();
  //         console.error("Error fetching filtered projects:", error);
  //       }
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }, [filters, pageSize]);

  const handleChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePrevPage = () => {
    if (filters.Page > 1) {
      setFilters((prev) => ({ ...prev, Page: prev.Page - 1 }));
    }
  };

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, Page: prev.Page + 1 }));
  };

  return (
    <div className="pt-20 flex flex-col">
      <div className="flex flex-col mt-8 p-5">
        <h1 className="flex justify-center items-center font-bold lg:text-xl">
          Find Your Project
        </h1>
        <div className="w-full bg-gray-600 h-0.5 mt-2"></div>

        <div className="flex flex-col p-5">
          <label className="font-semibold text-md">Search</label>
          <input
            onChange={handleChange}
            type="text"
            name="keywordSearch"
            className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]"
            placeholder="Enter word"
          />
        </div>

        <div className="flex flex-col p-5">
          <label className="font-semibold text-md">Project Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]"
            placeholder="Enter Project Title"
          />
        </div>

        <div className="flex flex-col pb-2">
          <h1 className="font-semibold ml-6 text-md pt-3">Project Status</h1>
          <select
            name="status"
            onChange={handleChange}
            className="rounded-md mt-1 ml-5 border-2 w-10/12 h-8 shadow-inner focus:shadow-none text-gray-500">
            <option value="">Select Status of Project</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col p-5">
          <label className="font-semibold text-md">Project Category</label>
          <input
            onChange={handleChange}
            type="text"
            name="category"
            className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]"
            placeholder="Eg: College or School"
          />
        </div>

        <div className="flex flex-col pb-2">
          <h1 className="font-semibold ml-6 text-md pt-2">Sort By</h1>
          <select
            name="sort"
            onChange={handleChange}
            className="rounded-md mt-1 ml-5 border-2 w-10/12 h-8 shadow-inner focus:shadow-none text-gray-500">
            <option value="">Select</option>
            <option value="new">Newest Project</option>
            <option value="old">Oldest Project</option>
          </select>
        </div>

        <div className="bottom-0 mx-auto mt-16 flex flex-row w-full items-center justify-center bg-white p-4">
          <button
            type="button"
            className="text-black lg:text-4xl"
            onClick={handlePrevPage}>
            <IoCaretBackSharp />
          </button>
          <span className="mx-4">Page: {filters.Page}</span>
          <button
            type="button"
            className="text-black lg:text-4xl"
            onClick={handleNextPage}>
            <IoCaretForwardSharp />
          </button>
        </div>
      </div>
    </div>
  );
}
