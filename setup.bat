@echo off
echo Setting up Snake AI Arena...

echo.
echo Installing frontend dependencies...
call npm install

echo.
echo Installing backend dependencies...
cd backend
call py -3.10 -m pip install -r requirements.txt
cd ..

echo.
echo Setup complete!
echo.
echo To start the application:
echo 1. Run start-backend.bat in one terminal
echo 2. Run start-frontend.bat in another terminal
echo.
echo The frontend will be available at http://localhost:3000
echo The backend will be available at http://localhost:8000
pause
