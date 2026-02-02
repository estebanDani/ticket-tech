'use client';

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, Paper, Typography, Stack, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

interface BookingQRCodeProps {
  data: string;         
  size?: number;         
  downloadable?: boolean;
  showLabel?: boolean;   
}

export const BookingQRCode: React.FC<BookingQRCodeProps> = ({ 
  data, 
  size = 200, 
  downloadable = true,
  showLabel = true 
}) => {
  const theme = useTheme();
  const qrId = `qr-canvas-${data}`; 

  const handleDownload = () => {
    const canvas = document.getElementById(qrId) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `reserva-${data}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          bgcolor: 'background.paper', 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        <QRCodeCanvas
          id={qrId}
          value={data}
          size={size}
          level={"H"} 
          includeMargin={true}
          bgColor={theme.palette.background.paper}
          fgColor={theme.palette.text.primary}
        />
        
        {showLabel && (
          <Stack direction="row" alignItems="center" spacing={1} color="black">
             <QrCodeScannerIcon fontSize="small" />
             <Typography variant="caption" fontWeight="bold">
                Escanear en entrada
             </Typography>
          </Stack>
        )}
      </Paper>

      {downloadable && (
        <Button 
          startIcon={<DownloadIcon />} 
          variant="outlined" 
          size="small"
          onClick={handleDownload}
          sx={{ textTransform: 'none' }}
        >
          Descargar QR
        </Button>
      )}
    </Stack>
  );
};