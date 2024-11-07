// src/routers/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage"; // Trang chủ
import AboutPage from "../pages/AboutPage/index"; // Trang giới thiệu
import BuyCorn from "../pages/BuyFood";
import Stepper from "../pages/Stepper"
import Header from "../components/Header/Header";
import FooterTest from "../components/FooterTest/FooterTest";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import Login from "../components/Login/Login";
// import NowPage from '@/components/Now/Now'; // Trang "Now" có thể điều chỉnh
// import NotFoundPage from '@/pages/NotFoundPage'; // Trang 404

export default function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login/>} />
        {/* Update thêm MovieDetail nhưng đang lỗi */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/popcorn-drink" element={<BuyCorn/>}/>

        {/* <Route path="/popcorn-drink/stepper" element={<Stepper />} /> */}

        {/* <Route path="/stepper" element={<Stepper />} /> */}
        {/* <Route path="/user" element={<UserPage />} /> */}
        {/* <Route path="/promotion" element={<PromotionPage />} /> */}

      </Routes>
      <FooterTest />
    </>
  );
}