// src/routers/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage"; // Trang chủ
import AboutPage from "../pages/AboutPage/index"; // Trang giới thiệu
import BuyCorn from "../pages/BuyFood";
import Stepper from "../pages/Stepper";
import Header from "../components/Header/Header";
import FooterTest from "../components/FooterTest/FooterTest";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import Login from "../components/Login/Login";
import PromotionPage from "../pages/PromotionPage/Promotion";
import User from "../pages/UserPage/User";
import { useRef } from "react";
import Payment from "../components/Payment/Payment";
import PaymentResult from "../components/Payment/PaymentResult";
import ForgetPass from "../components/ForgetPass/ForgetPass";
import AccessAccount from "../components/AccessAccount/AccessAccount";
import SearchFilm from "../components/SearchFIlm/SearchFilm";
// import NowPage from '@/components/Now/Now'; // Trang "Now" có thể điều chỉnh
// import NotFoundPage from '@/pages/NotFoundPage'; // Trang 404

export default function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/popcorn-drink" element={<BuyCorn />} />
        <Route path="/stepper" element={<Stepper />} />
        <Route path="/user" element={<User />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/payment_result" element={<PaymentResult />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/validaccount" element={<AccessAccount />} />
        <Route path="/searchfilm" element={<SearchFilm />} />
      </Routes>
      <FooterTest />
    </>
  );
}
