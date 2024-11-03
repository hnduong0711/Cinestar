import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import {
    Km1,
    Km2,
    Km3
  } from "../../assets";


const PromotionPage = () => {
    return (
        <div class="bg-cinestar-black-opacity min-h-screen text-white">
            <div class="container mx-auto p-8">
                <div class="flex flex-col md:flex-row gap-8 mt-36 mb-8">
                    <div class="flex-1 ">
                        <h2 class=" font-bold mb-4">C'STUDENT - 45K CHO HỌC SINH SINH VIÊN</h2>
                        <p class="mb-4">Đồng giá 45K/2D cho HSSV/GV/U22 cả tuần tại mọi cụm rạp Cinestar</p>
                        
                        <h3 class="font-semibold mb-2">Điều kiện</h3>
                        <ul class="list-disc list-inside mb-4 ">
                            <li>HSSV xuất trình thẻ HSSV hoặc CCCD từ dưới 22 tuổi.</li>
                            <li>Giảng viên/ giáo viên xuất trình thẻ giảng viên.</li>
                        </ul>
                        
                        <h3 class="font-semibold mb-2">Lưu ý</h3>
                        <ul class="list-disc list-inside mb-4 ">
                            <li>Mỗi thẻ mua được một vé.</li>
                            <li>Không áp dụng cho các ngày Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim.</li>
                        </ul>
                        
                        <button class="bg-cinestar-gold text-black font-extrabold py-2 px-20 rounded mt-2">ĐẶT VÉ NGAY</button>
                    </div>
                    
                    <div class="flex">
                        <img src={Km2} alt="promotion_student" width={640} height={360}/>
                    </div>
                </div>

                
                <div class="flex flex-col md:flex-row mt-28 gap-8">
                    <div class="flex">
                        <img src={Km3} alt="promotion-1" width={640} height={360}/>
                    </div>
                    
                    <div class="flex-1">
                        <h2 class="text-lg font-bold mb-4">C'TEN - HAPPY HOUR - 45K/ 2D MỐC 10H</h2>
                        <p class="mb-4">Áp dụng giá 45K/2D và 55K/3D cho khách hàng xem phim trước 10h sáng và sau 10h tối.</p>
                        
                        <h3 class="font-semibold mb-2">Điều kiện</h3>
                        <ul class="list-disc list-inside mb-4 text-gray-300">
                            <li>Khách hàng là thành C'FRIEND hoặc C'VIP của Cinestar.</li>
                            <li>Áp dụng tại App/Web Cinestar hoặc mua trực tiếp tại rạp.</li>
                        </ul>
                        
                        <h3 class="font-semibold mb-2">Lưu ý</h3>
                        <ul class="list-disc list-inside mb-4 text-gray-300">
                            <li>Không áp dụng cho các ngày lễ/tết.</li>
                        </ul>
                        
                        <button class="bg-cinestar-gold text-black font-extrabold py-2 px-20 rounded mt-2">ĐẶT VÉ NGAY</button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-8 mt-28 mb-8">
                    <div class="flex-1">
                        <h2 class=" font-bold mb-4">C'MEMBER - HAPPY MEMBER'S DAY - GIÁ CHỈ 45K/ 2D</h2>
                        <p class="mb-4">Áp dụng giá 45K/ 2D và 55K/ 3D cho khách hàng là thành viên Cinestar vào ngày thứ 4 hàng tuần.</p>
                        
                        <h3 class="font-semibold mb-2">Điều kiện</h3>
                        <ul class="list-disc list-inside mb-4 ">
                            <li>Khách hàng là thành C'FRIEND hoặc C'VIP của Cinestar.</li>
                            <li>Áp dụng khi mua trực tiếp tại rạp.</li>
                        </ul>
                        
                        <h3 class="font-semibold mb-2">Lưu ý</h3>
                        <ul class="list-disc list-inside mb-4 ">
                            <li>Giảm thêm 10% giá trị hóa đơn bắp nước cho chủ thẻ C'FRIEND và 15% cho chủ thẻ C'VIP.</li>
                            <li>Không áp dụng cho các ngày lễ/tết</li>
                        </ul>
                        
                        <button class="bg-cinestar-gold text-black font-extrabold py-2 px-20 rounded mt-2">ĐẶT VÉ NGAY</button>
                    </div>
                    
                    <div class="flex">
                        <img src={Km1} alt="promotion_member" width={640} height={360} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionPage;