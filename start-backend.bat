@echo off
echo Starting Snake AI Arena Backend...
cd backend
py -3.10 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
