import React from 'react';

const HeaderSection = () => {
  return (
    <div className="relative pt-14 pb-20 pr-10 pl-10">
      <div className="absolute inset-0 rounded-lg"></div>
      <img
        src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Abouts/ht-qc-br.jpg"
        alt="Image description"
        className="w-full h-[350px] md:h-[450px] object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg top-[43px] bottom-[80px] right-[40px] left-[40px]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center p-6 bg-black bg-opacity-0 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 font-black text-[#f8fafc]">HỆ THỐNG CỤM RẠP TRÊN TOÀN QUỐC</h1>
          <p className="text-base pr-[12rem] pl-[12rem]">
          Cinestar là một trong những hệ thống rạp chiếu phim được yêu thích nhất tại Việt Nam, cung cấp nhiều mô hình giải trí hấp dẫn bao gồm Các Cụm Rạp Chiếu Phim hiện đại, Nhà hát, Khu vui chơi trẻ em Kidzone, Bowling, Billiards, Games, Phòng Gym, Nhà Hàng, và Phố Bia C'Beer. Với mục tiêu trở thành điểm đến giải trí cho mọi gia đình Việt Nam, Cinestar đang được biết đến là cụm rạp ủng hộ phim Việt, góp phần phát triển điện ảnh Việt. Không chỉ chiếu các bộ phim bom tấn quốc tế, Cinestar còn đồng hành cùng các nhà làm phim Việt Nam, đưa những tác phẩm điện ảnh đặc sắc của Việt Nam đến gần hơn với khán giả.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;