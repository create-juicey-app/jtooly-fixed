@echo off

rem Set the path to the Next.js project directory
set "projectDir=%cd%"

rem Set the path to the .next/ folder
set "nextDir=%projectDir%\.next"

rem Set the path to the .next.zip file
set "zipPath=%projectDir%\public\.next.zip"

rem Remove existing .next.zip file
if exist "%zipPath%" (
    del "%zipPath%"
)

rem Create a new .next.zip file
powershell -noprofile -command "& {Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('%nextDir%', '%zipPath%');}"

echo .next.zip created successfully.
