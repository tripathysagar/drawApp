import React, { useEffect, useRef, useState } from 'react';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastX, setLastX] = useState<number>(0);
  const [lastY, setLastY] = useState<number>(0);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
      }
    }
  };

  useEffect (()=>{
    setupCanvas()
  },[])
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();

        setLastX(e.nativeEvent.offsetX);
        setLastY(e.nativeEvent.offsetY);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };


  // to clear canvas after clicking  a buttom
  const canvasCaptureHandler = (_e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      console.log(image); 
      const link = document.createElement('a');
      link.download = 'canvas_image.png'; 
      link.href = image; 
      canvas.appendChild(link);
      link.click(); 
      canvas.removeChild(link);
    }
  }
  

  const clearCanvasHandler = (_e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
  return (
    <div className='p-5'>

      <span className='pt-10'>
        <button 
        onClick={canvasCaptureHandler}
        type="button" 
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Submit
        </button>

        <button 
        onClick={clearCanvasHandler}
        type="button" 
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Clear
        </button>
      </span>

      <span >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          width={800}
          height={600}
          style={{ border: '1px solid black' }}
        />
      </span>

      

    </div>
  );
};

export default DrawingCanvas;
