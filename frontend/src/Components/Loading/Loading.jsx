import { useLoading } from "../../Hooks/useLoading";

export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className="fixed w-full h-full bg-WhiteLoading-rgba z-50 top-0 left-0">
      <div className="flex flex-col justify-center items-center w-full h-[80%]">
        <img src="/loading.svg" alt="Loading!" />
        <h1 className="text-orange-500 text-[1.5rem]">
          Loading...
        </h1>
      </div>
    </div>
  );
}
