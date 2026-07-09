@echo off
::Este script es para actualizar el repositorio de git con los cambios realizados en los archivos del proyecto.
::No forma parte del proyecto, solo es un script para automatizar el proceso de actualización del repositorio.
git add .
git commit -m "update"
git push
pause