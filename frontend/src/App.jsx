import AppRoute from "./Components/Routes/AppRoute/AppRoute";
import Header from "./Components/Header/Header";
import { useLoading } from "./Hooks/useLoading";
import { useEffect } from "react";
import setLoadingInterceptor from "./Interceptors/loadingInterceptor";
import Loading from "./Components/Loading/Loading";

export default function App() {

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <>
      <Loading />
      <Header />
      <AppRoute />
    </>
  )
}