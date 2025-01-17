@echo off

REM Prompt the user to enter the commit message
set /p commitMessage="Please enter the commit message: "

REM Add files to the staging area
git add .

REM Commit changes to the local repository
git commit -m "%commitMessage%"

REM Push changes to the remote repository
git push https://github.com/liuchenyang0703/ToLiucyLinux.git master:blog_source

REM Display completion message
echo Commit completed!

REM Pause to wait for user input before closing the command prompt
pause