# codeChomperTres

## Senior Project Spring 2023 University of Florida
Hope Pegah

Zachary Schirm

Kathleen Tiley

## Abstract
In recent years, web applications have replaced offline resources and static web pages as society
increasingly relies on online platforms for services such as education, e-commerce, and banking.
Unfortunately, these applications are complex and have many security vulnerabilities that
malicious actors can exploit to obtain credential information and breach an organization’s
network security. Depending on the industry, such attacks can have devastating effects when
successful, even endangering lives. Research into university curriculums and the continued
prevalence of high-severity vulnerabilities in most web applications suggest that newly
graduated software engineers do not have the secure programming skills the industry requires.
The codeChomper project supports university professors’ efforts to integrate software security
principles into their curricula by providing a quick and efficient web platform for teachers to
analyze student code for security vulnerabilities. Unlike existing static analysis tools,
codeChomper allows users to upload large sets of code files as .zip files, automatically detects
the languages used, and provides statistics and analysis tailored to computer science professors.
With this tool, professors can quickly identify and address common problems immediately in
their courses, thereby increasing students’ exposure to secure programming principles and
techniques.

## Technical Documentation 
### For Local Development
Prequel: Ensure you have python installed on your local dev machine.  Install bandit by navigating to: `~/codeChomper/bandit/   Then run: pip install bandit
1. `~$ git clone [repository URL] && git switch [name]-dev`
2. Supply values to `codeChomper/.env.template` and save as `codeChomper/.env`
3. `~/codeChomper$ npm install` (first time running only - ensure dependencies present)
4. `~/codeChomper$ npm start
5. On successful server start, console will output `Example app listening at http://localhost:8080
6. `~/codeChomper/client$ npm install (first time setup only - ensure dependencies present)
7. `~/codeChomper/client$ npm run build` (production, static) or `~/codeChomper/client$ npm start dev` (development, dynamic)
8. On successful client start, react app will open in web browser automatically. 



-----WE CAN PROBABLY DELETE THIS SECTION (WILL KEEP FOR NOW TO ENSURE IT ISN'T NEEDED LATER)
### Updating/Recompiling Bandit
1. Download and install [Python](https://www.python.org/downloads/)
2. Using pip, download and install PyInstaller and Bandit (`pip install pyinstaller` and `pip install bandit`)
3. `~/codeChomper/bandit/update$ pyinstaller -F --additional-hooks-dir=hooks bandit.py`
4. Overwrite `codeChomper/bandit/bandit.exe` with `codeChomper/bandit/update/dist/bandit.exe`
5. Any newly generated directories or files within `codeChomper/bandit/update`, such as the `dist`, `build`, and `hooks/__pycache__` directories as well as any `.spec` files, should be deleted
6. If desired, PyInstaller and Bandit may be uninstalled (`pip uninstall pyinstaller` and `pip uninstall bandit`)
7. If desired, Python may also be uninstalled
