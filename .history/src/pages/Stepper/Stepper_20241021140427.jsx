// Import cần thiết
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

// Các bước cho Stepper
const steps = [
  'Chọn rạp và phim',
  'Chọn combo ăn uống',
  'Thanh toán',
];

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
    <Box sx={{ width: '100%', padding: '2rem' }}>
      {/* Stepper từ Material UI */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Nội dung cho từng bước */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        {activeStep === steps.length ? (
          <div>
            <h2>Hoàn tất!</h2>
            <Button onClick={handleReset}>Bắt đầu lại</Button>
          </div>
        ) : (
          <div>
            <h1>Bước {activeStep + 1}: {steps[activeStep]}</h1>
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
  );
}
