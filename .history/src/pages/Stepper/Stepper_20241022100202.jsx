// Import cần thiết
import * as React from 'react';
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
  const { totalPrice, selectedCombos } = location.state || {};

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
          <h1>Bước {activeStep + 1}: {steps[activeStep]}</h1>
          <div className='text-left ml-1'>
              <form action="">
                <div>
                  <label> Họ và tên :</label><br/>
                  <input type="text" required />
                </div>
                <div>
                  <label> Họ và tên :</label><br/>
                  <input type="text" required />
                </div>
                <div>
                  <label> Họ và tên :</label><br/>
                  <input type="text" required />
                </div>
              </form>
          </div>

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
              onClick={handleNext}
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
      <h1>Bảng thanh toán</h1>
      {/* Thêm nội dung của bảng thanh toán tại đây */}
    </div>
    
  </div>
</div>

  

  );
}
