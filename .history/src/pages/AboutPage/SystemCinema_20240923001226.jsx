import React from 'react';
import {imformation } from '../../constants/aboutpage';
const SystemOfCinema = () =>{

    return(
        <div className='pb-[15rem] pt-[8rem]'>

           <div className='text-center'>
            <div className='text-cinestar-custom-white text-[40px] font-medium pb-[20px] font-title'>HỆ THỐNG CÁC CỤM RẠP </div>
            <div><p className='text-[#f8fafc] text-[16px] max-w-[42rem] mx-auto leading-[2] mb-[4rem] font-content'>Các phòng chiếu được trang bị các thiết bị tiên tiến như hệ thống âm thanh vòm, màn hình rộng và độ phân giải cao, tạo nên hình ảnh sắc nét và âm thanh sống động.</p></div>
           </div>

           <div className="flex justify-between">
                <div className="w-1/2 p-4">
                    <img src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Abouts/Tru_o_ng_Sa_1.png" alt="" />
                </div>
                <div className="w-1/2 p-4">
                    <div className='grid grid-cols-1 md:grid-cols-1 gap-8'>
                          {/* Lặp qua mảng imformation và hiển thị dữ liệu */}
                          {imformation.map((info) => (
                            <div key={info.id} className="text-left p-4 bg-custom-gradient space-y-4">
                                <h2 className="text-[24px] font-medium mb-2 text-white font-title uppercase">{info.title}</h2>
                                <a href={info.map} target="_blank">
                                <p className="text-white font-content">Địa chỉ: {info.address}</p>
                                </a>
                                <p className="text-white font-content">
                                Email: <a href={info.email} className="text-blue-300">marketing.cinestar@gmail.com</a>
                                </p>
                                <p className="text-white font-content">
                                Điện thoại: <a href={info.phone} className="text-blue-300">{info.phone}</a>
                                </p>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default SystemOfCinema;