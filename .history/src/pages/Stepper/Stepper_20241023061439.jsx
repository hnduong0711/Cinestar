// Import cần thiết
import React, { useState }  from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { steps } from "../../constants/BuyFoot";


export default function HorizontalLinearAlternativeLabelStepper() {
  // Nhận dữ liệu từ state của React Router
  const location = useLocation();
  const { totalPrice, selectedCombos, Cinestar } = location.state || {}; // Thêm cinemaLocation

  
// Trạng thái cho form
const [name, setName] = React.useState('');
const [phone, setPhone] = React.useState('');
const [email, setEmail] = React.useState('');
const [errors, setErrors] = React.useState({});
const [isAgreed, setIsAgreed] = useState(false); // Checkbox "đồng ý điều khoản"
const [receivePromo, setReceivePromo] = useState(false); // Checkbox nhận thông tin khuyến mãi

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Hàm kiểm tra số điện thoại hợp lệ
  const validatePhone = (phone) => {
    const regex = /^[0-9]{10,11}$/; // Số điện thoại 10-11 chữ số
    return regex.test(phone);
  };

  // Hàm xác nhận form
  const validateForm = () => {
    const newErrors = {};
  
    // Kiểm tra họ và tên
    if (!name) {
      newErrors.name = "Vui lòng điền họ và tên.";
    }
  
    // Kiểm tra số điện thoại
    if (!phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
    }
  
    // Kiểm tra email
    if (!email) {
      newErrors.email = "Vui lòng điền email.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
  
    // Kiểm tra checkbox "Tôi đồng ý với điều khoản"
    if (!isAgreed) {
      newErrors.isAgreed = "Bạn phải đồng ý với điều khoản và điều kiện.";
    }
  
    setErrors(newErrors);
    
    // Form chỉ hợp lệ nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };
  
  console.log(location.state);
  const handleNext12 = () => {
    // Nếu ở bước 0 thì kiểm tra form
    if (activeStep === 0) {
      // Nếu form hợp lệ, tiếp tục sang bước tiếp theo
      if (validateForm()) {
        setActiveStep((prevStep) => prevStep + 1);
      }
      return; // Kết thúc để không chạy phần else phía dưới
    }
  
    // Nếu ở bước cuối cùng, thực hiện submit form
    if (activeStep === steps.length - 1) {
      handleSubmit();
      return; // Kết thúc để tránh thực hiện setActiveStep thêm lần nữa
    }
  
    // Nếu không ở bước 0 và không phải bước cuối cùng, tiếp tục sang bước tiếp theo
    setActiveStep((prevStep) => prevStep + 1);
  };
  

  const handleSubmit = () => {
    // Kiểm tra xem các trường có lỗi hay không
    if (!validateForm()) {
      console.log("Form có lỗi, vui lòng kiểm tra lại!");
      return;
    }
  
    // Gửi dữ liệu form (gọi API hoặc hành động cần thiết)
    console.log("Form đã được submit thành công!", {
      name,
      phone,
      email,
      selectedCombos,
      totalPrice
    });
  
    // Sau khi submit thành công, có thể reset form hoặc chuyển hướng
    setActiveStep((prevStep) => prevStep + 1);
  };
  

  


  // Quản lý bước hiện tại
  const [activeStep, setActiveStep] = React.useState(0);



  // Hàm chuyển đến bước tiếp theo
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Hàm quay lại bước trước
  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Hàm để reset về bước đầu
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    // text-cinestar-custom-yellow
    <div>
  <h1 className='text-left ml-2 text-white text-[40px] font-bold font-title uppercase tracking-[0.2rem]'>
    TRANG THANH TOÁN
  </h1> 
  
  {/* Thẻ cha chứa 2 div */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    
   {/* Div thứ nhất - Stepper (60%) */}
<div style={{ flex: '3', marginRight: '2rem', maxWidth: '60%' }}>
  <Box sx={{ width: '100%', padding: '2rem' }}>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>
            {/* Chỉ áp dụng màu cho chữ trong StepLabel */}
            <span
              className={`font-content text-[15px] font-bold ${
                index <= activeStep  ? 'text-yellow-500' : 'text-white'
              }`}
            >
              {label}
            </span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>

    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      {activeStep === steps.length ? (
        <div>
          <h2>Hoàn tất!</h2>
          <Button onClick={handleReset}>Bắt đầu lại</Button>
        </div>
      ) : (
        <div>
          <h1 className='text-white font-content'>Bước {activeStep + 1}: {steps[activeStep]}</h1>
          {activeStep === 0 && (
            <div className='text-left ml-1'>
            <form action="">
              <div className="mb-4">
                <label className="block text-sm font-medium text-white text-[14px]">
                  Họ và tên: <span className="text-red-500">*</span>
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Họ và Tên' required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.name && <p className="text-red-500 text-sm text-[10px]">{errors.name}</p>}
              </div>
         
              <div className="mb-4">
                <label className="block text-sm font-medium text-white text-[14px]">
                  Số điện thoại: <span className="text-red-500">*</span>
                </label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Số điện thoại' required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.phone && <p className="text-red-500 text-sm text-[10px]">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white text-[14px]">
                  Email: <span className="text-red-500">*</span>
                </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.email && <p className="text-red-500 text-sm text-[10px]">{errors.email}</p>}
              </div>

              <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-600" 
                      checked={isAgreed} 
                      onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-white">Đảm mua vé đúng tuổi quy định .</span>
                  </label>
                  {errors.isAgreed && <p className="text-red-500 text-sm text-[10px]">Vui lòng chấp thuận quy định</p>}
                </div>

                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-600" 
                      checked={receivePromo} 
                      onChange={(e) => setReceivePromo(e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-white">Đồng ý với điều khoản của Cinestar</span>
                  </label>
                  {errors.isAgreed && <p className="text-red-500 text-sm text-[10px]">Vui lòng chấp thuận quy định</p>}
                </div>
              {/* <div className="mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Gửi</button>
              </div> */}
            </form>
          </div>
          )}
          {activeStep === 1 && (
            <ul>
              {selectedCombos && selectedCombos.length > 0 ? (
                selectedCombos.map((combo, index) => (
                  <li key={index}>
                    {combo.title} - {combo.content} - {combo.price} VND
                  </li>
                ))
              ) : (
                <p>Chưa có combo nào được chọn.</p>
              )}
            </ul>
          )}
          {activeStep === 2 && (
            <p>Tổng giá: {totalPrice ? `${totalPrice} VND` : 'Chưa có giá'}</p>
          )}

          <Box sx={{ marginTop: '1rem' }}>
            <Button
              variant="contained"
              onClick={handleNext12}
              sx={{ marginRight: '1rem' }}
              disabled={activeStep === steps.length}
            >
              {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Quay lại
            </Button>
          </Box>
        </div>
      )}
    </div>
  </Box>
</div>

    
    {/* Div thứ hai - Bảng thanh toán (40%) */}
    <div style={{ flex: '2', maxWidth: '40%' }}>
      <h1 className='text-white'>Bảng thanh toán</h1>
      <div>
      <div>Cinestar : {Cinestar.selectedCinema}</div>
      <div>Địa chỉ:  </div> {/* Hiển thị tên rạp */}
        <div>Địa chỉ</div>
      </div>
      <div>
        <div>Bắp nước</div>
        
      </div>
      
    </div>
    
  </div>
</div>

  

  );
}
