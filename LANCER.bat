@echo off
title Mr Phone 67 - Application
echo.
echo  ===================================
echo    Mr Phone 67 - Lancement App
echo  ===================================
echo.
echo  L'application va s'ouvrir dans votre navigateur...
echo  NE FERMEZ PAS cette fenetre pendant l'utilisation.
echo.
echo  Pour installer sur tablette:
echo  1. Connectez la tablette au meme WiFi que ce PC
echo  2. Ouvrez Chrome sur la tablette  
echo  3. Tapez l'adresse affichee ci-dessous
echo  4. Menu Chrome (3 points) ^> "Installer l'application"
echo.
echo  Demarrage du serveur...
echo.
start http://localhost:8080
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
