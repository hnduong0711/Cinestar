// Import cần thiết
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Các bước cho Stepper
const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  // Nhận dữ liệu từ state của React Router
  const location = useLocation();
  const { totalPrice, selectedCombos } = location.state || {};

  return (
    <Box sx={{ width: '100%', padding: '2rem' }}>
      {/* Hiển thị Stepper từ Material UI */}
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Thêm phần hiển thị thông tin về giá và combo đã chọn */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h1>Stepper</h1>
        <p>Tổng giá: {totalPrice ? `${totalPrice} VND` : 'Chưa có giá'}</p>

        <h2>Combos đã chọn:</h2>
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
      </div>
    </Box>
  );
}
