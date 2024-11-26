import React from 'react'
import Button from "../Button/Button";
import {
  CinestarLogo
} from "../../assets/index";
import { Link } from "react-router-dom";


const FooterTest = () => {
  return (
    <div className='footer bg-purple-blue-gradient w-full h-full pt-10 relative text-white '>
      <div className='flex'>
        <div className='flex w-[40%]  mt-10 ml-10'>
          <div className='w-[100%]'>
            <div className="w-[30%]"><img src={CinestarLogo} alt="Logo" /></div>
            <h3 className='font-semibold md:text-[22px] mt-5'>BE HAPPY, BE A STAR</h3>

            <div className='w-[100%] mt-10'>
              <Button
                className="button md:button float-left bg-cinestar-gold w-[45%] h-[50px] mr-5 md:text-[20px] text-black font-bold hidden group hover:text-white"
                text="ĐẶT VÉ"
                
                colorChange="bg-purple-blue-gradient"
              />
              <Button
                className="button md:button float-left bg-cinestar-purple w-[45%] h-[50px] mr-5 md:text-[20px] text-yellow-300 font-bold border-2 border-yellow-300 hidden group hover:text-white"
                text="ĐẶT BẮP NƯỚC"
                colorChange="bg-orange-yellow-gradient"
              />
            </div>
              
            <div className='flex w-[100%] mt-20'>
              <ul className='flex mt-5'>
                <a href="">
                
                  <svg className='mr-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12.3033C22 6.7467 17.5229 2.24219 12 2.24219C6.47715 2.24219 2 6.7467 2 12.3033C2 17.325 5.65684 21.4874 10.4375 22.2422V15.2116H7.89844V12.3033H10.4375V10.0867C10.4375 7.56515 11.9305 6.17231 14.2146 6.17231C15.3088 6.17231 16.4531 6.36882 16.4531 6.36882V8.8448H15.1922C13.95 8.8448 13.5625 9.62041 13.5625 10.4161V12.3033H16.3359L15.8926 15.2116H13.5625V22.2422C18.3432 21.4874 22 17.3252 22 12.3033Z" fill="#F8FAFC"/>
                      
                  </svg>
                </a>
                <a href="">
                  <svg className='mr-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5933 7.20301C21.4794 6.78041 21.2568 6.39501 20.9477 6.08518C20.6386 5.77534 20.2537 5.55187 19.8313 5.43701C18.2653 5.00701 12.0003 5.00001 12.0003 5.00001C12.0003 5.00001 5.73633 4.99301 4.16933 5.40401C3.74725 5.52415 3.36315 5.75078 3.0539 6.06214C2.74464 6.3735 2.52062 6.75913 2.40333 7.18201C1.99033 8.74801 1.98633 11.996 1.98633 11.996C1.98633 11.996 1.98233 15.26 2.39233 16.81C2.62233 17.667 3.29733 18.344 4.15533 18.575C5.73733 19.005 11.9853 19.012 11.9853 19.012C11.9853 19.012 18.2503 19.019 19.8163 18.609C20.2388 18.4943 20.6241 18.2714 20.934 17.9622C21.2439 17.653 21.4677 17.2682 21.5833 16.846C21.9973 15.281 22.0003 12.034 22.0003 12.034C22.0003 12.034 22.0203 8.76901 21.5933 7.20301ZM9.99633 15.005L10.0013 9.00501L15.2083 12.01L9.99633 15.005Z" fill="#F8FAFC"/>
                  </svg>
                </a>
                <a href="">
                  <svg className='mr-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M4.32187 1.92188C3.00211 1.92188 1.92188 3.00211 1.92188 4.32187V19.6819C1.92188 21.0016 3.00211 22.0819 4.32187 22.0819H19.6819C21.0016 22.0819 22.0819 21.0016 22.0819 19.6819V4.32187C22.0819 3.00211 21.0016 1.92188 19.6819 1.92188H4.32187ZM4.32187 2.88187H7.48031C5.76619 4.6654 4.80187 6.97055 4.80187 9.36188C4.80187 11.8387 5.81475 14.2098 7.63875 16.005C7.69635 16.1058 7.74424 16.6 7.52344 17.1712C7.38424 17.5312 7.10572 18.0015 6.56813 18.1791C6.36173 18.2463 6.22747 18.4487 6.24187 18.6647C6.25627 18.8807 6.41505 19.063 6.62625 19.1062C8.00385 19.3799 8.89594 18.9667 9.61594 18.6403C10.2639 18.3427 10.6918 18.1409 11.3494 18.4097C12.6934 18.9329 14.1235 19.2019 15.6019 19.2019C17.5668 19.2019 19.457 18.7222 21.1219 17.8162V19.6819C21.1219 20.4827 20.4827 21.1219 19.6819 21.1219H4.32187C3.521 21.1219 2.88187 20.4827 2.88187 19.6819V4.32187C2.88187 3.521 3.521 2.88187 4.32187 2.88187ZM15.8419 7.20187C16.1059 7.20187 16.3219 7.41787 16.3219 7.68187V12.0019C16.3219 12.2659 16.1059 12.4819 15.8419 12.4819C15.5779 12.4819 15.3619 12.2659 15.3619 12.0019V7.68187C15.3619 7.41787 15.5779 7.20187 15.8419 7.20187ZM8.64187 7.68187H11.0419C11.2147 7.68187 11.3783 7.77765 11.4647 7.93125C11.5463 8.08005 11.5409 8.26714 11.4497 8.41594L9.50625 11.5219H11.0419C11.3059 11.5219 11.5219 11.7379 11.5219 12.0019C11.5219 12.2659 11.3059 12.4819 11.0419 12.4819H8.64187C8.46907 12.4819 8.30546 12.3861 8.21906 12.2325C8.13746 12.0837 8.14286 11.8966 8.23406 11.7478L10.1775 8.64187H8.64187C8.37787 8.64187 8.16187 8.42587 8.16187 8.16187C8.16187 7.89787 8.37787 7.68187 8.64187 7.68187ZM13.2019 9.12187C13.4947 9.12187 13.768 9.2031 14.0128 9.3375C14.0992 9.2127 14.2339 9.12187 14.4019 9.12187C14.6659 9.12187 14.8819 9.33787 14.8819 9.60187V12.0019C14.8819 12.2659 14.6659 12.4819 14.4019 12.4819C14.2339 12.4819 14.0992 12.391 14.0128 12.2662C13.768 12.4007 13.4947 12.4819 13.2019 12.4819C12.2755 12.4819 11.5219 11.7283 11.5219 10.8019C11.5219 9.87547 12.2755 9.12187 13.2019 9.12187ZM18.4819 9.12187C19.4083 9.12187 20.1619 9.87547 20.1619 10.8019C20.1619 11.7283 19.4083 12.4819 18.4819 12.4819C17.5555 12.4819 16.8019 11.7283 16.8019 10.8019C16.8019 9.87547 17.5555 9.12187 18.4819 9.12187ZM13.2019 10.0819C13.1521 10.0819 13.1035 10.0873 13.0566 10.0969C12.9627 10.116 12.8753 10.153 12.7987 10.2047C12.7222 10.2564 12.6564 10.3222 12.6047 10.3987C12.553 10.4753 12.516 10.5627 12.4969 10.6566C12.4873 10.7035 12.4819 10.7521 12.4819 10.8019C12.4819 10.8517 12.4873 10.9003 12.4969 10.9472C12.5064 10.9941 12.5199 11.0391 12.5381 11.0822C12.5563 11.1253 12.5788 11.1667 12.6047 11.205C12.6305 11.2433 12.6603 11.2784 12.6928 11.3109C12.7254 11.3435 12.7605 11.3732 12.7987 11.3991C12.8753 11.4508 12.9627 11.4877 13.0566 11.5069C13.1035 11.5164 13.1521 11.5219 13.2019 11.5219C13.2517 11.5219 13.3003 11.5164 13.3472 11.5069C13.6756 11.4399 13.9219 11.1505 13.9219 10.8019C13.9219 10.4035 13.6003 10.0819 13.2019 10.0819ZM18.4819 10.0819C18.4321 10.0819 18.3835 10.0873 18.3366 10.0969C18.2896 10.1064 18.2446 10.1199 18.2016 10.1381C18.1585 10.1563 18.117 10.1788 18.0787 10.2047C18.0405 10.2305 18.0054 10.2603 17.9728 10.2928C17.9077 10.3579 17.8545 10.4354 17.8181 10.5216C17.7999 10.5646 17.7864 10.6096 17.7769 10.6566C17.7673 10.7035 17.7619 10.7521 17.7619 10.8019C17.7619 10.8517 17.7673 10.9003 17.7769 10.9472C17.7864 10.9941 17.7999 11.0391 17.8181 11.0822C17.8363 11.1253 17.8588 11.1667 17.8847 11.205C17.9105 11.2433 17.9403 11.2784 17.9728 11.3109C18.0054 11.3435 18.0405 11.3732 18.0787 11.3991C18.117 11.4249 18.1585 11.4474 18.2016 11.4656C18.2446 11.4838 18.2896 11.4973 18.3366 11.5069C18.3835 11.5164 18.4321 11.5219 18.4819 11.5219C18.5317 11.5219 18.5803 11.5164 18.6272 11.5069C18.9556 11.4399 19.2019 11.1505 19.2019 10.8019C19.2019 10.4035 18.8803 10.0819 18.4819 10.0819Z" fill="white"/>
                  </svg>
                </a>
              </ul>
            </div>

            
          </div>

          <div>
            
          </div>
        </div>

        <div className=' w-[15%] mt-10'>
          <div className='grid gap-14  md:text-[14px] '>
            <div className='grid gap-5'>
              
              <p className=' md:text-[20px] font-bold'>TÀI KHOẢN</p>
              <a href="" >Đăng nhập</a>
              <a href="" >Đăng ký</a>
              <a href="" >Membership</a>
            </div>
            <div className='grid gap-5'>
              <p className=' md:text-[20px] font-bold'>XEM PHIM</p>
              
              <a href="/promotion" >Phim đang chiếu</a>
              <a href="/user" >Phim sắp chiếu</a>
              <a href="" >Xuất chiếu đặc biệt</a>
            </div>
          </div>
        </div>

        <div className=' w-[15%]  mt-10'>
          <div className='grid gap-24  md:text-[14px]'>
            <div className='grid gap-5'>
              <p className=' md:text-[20px] font-bold'>THUÊ SỰ KIỆN</p>
              <a href="" >Thuê rạp</a>
              <a href="" >Các loại hình cho thuê khác</a>
            </div>
            <div className='grid gap-5'>
              <p className=' md:text-[20px] font-bold'>CINESTAR</p>
              <a href="" >Giới thiệu</a>
              <a href="" >Liên hệ</a>
              <a href="" >Tuyển dụng</a>
            </div>
          </div>
        </div>

        <div className=' w-[15%]  mt-10'>
          <div className='grid gap-14  md:text-[14px]'>
            <div className='grid gap-5'>
              <p className='md:text-[20px] font-bold'>DỊCH VỤ KHÁC</p>
              <a href="" >Nhà hàng</a>
              <a href="" >Kidzone</a>
              <a href="" >Bowling</a>
              <a href="" >Billiards</a>
              <a href="" >Gym</a>
              <a href="" >Nhà hát Opera</a>
              <a href="" >Coffee</a>
            </div>
          </div>
        </div>

        <div className=' w-[15%]  mt-10'>
          <div className='grid gap-14  md:text-[14px]'>
            <div className='grid gap-5'>
              <p className='md:text-[20px] font-bold'>HỆ THỐNG RẠP</p>
              <a href="" >Tất cả hệ thống rạp</a>
              <a href="" >Cinestar Quốc Thanh</a>
              <a href="" >Cinestar Hai Bà Trưng <br />(TP.HCM)</a>
              <a href="" >Cinestar Sinh Viên <br />(Bình Dương)</a>
              <a href="" >Cinestar Mỹ Tho</a>
              <a href="" >Cinestar Kiên Giang</a>
              <a href="" >Cinestar Lâm Đồng</a>
              <a href="" >Cinestar Đà Lạt</a>
              <a href="" >Cinestar Huế</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className='flex w-full justify-center my-10'>
        <hr className='w-[95%]'/>
      </div>

      <div className='w-full'>
        <div className='flex float-left  font-semibold md:text-[14px] mx-10'>
          <div>
            <h4>© 2023 Cinestar. All rights reserved.</h4>
          </div>
        </div>
        <div className='flex float-right  font-semibold md:text-[14px] mx-10'>
          <div>
            <h4 className='mr-5'>Chính sách bảo mật</h4>
            <h4 className='mr-5'>Tin điện ảnh</h4>
            <h4>Hỏi và đáp</h4>
          </div>
        </div>
      </div>

      

      <div className=' flex flex-col w-full items-center justify-center my-20 md:text-[12px]'>
        {/* <div className=''>
          sign
        </div> */}
        <p className=''>
          CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM - RẠP CHIẾU PHIM NGÔI SAO
        </p>
        <p>
          ĐỊA CHỈ 155 HAI BÀ TRƯNG, PHƯỜNG BẾN NGHÉ, QUẬN 1, TP.HCM
        </p>
        <p>
          GIẤY CNDKDN SỐ 0312742744, ĐĂNG KÝ LẦN ĐẦU NGÀY 18/04/2014, ĐĂNG KÝ THAY ĐỔI LẦN THỨ 2 NGÀY 15/09/2014,CẤP BỞI SỞ KH&DT TP.HCM
        </p>
        
      </div>

    </div>
  )
}

export default FooterTest
