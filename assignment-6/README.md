# Assignment 6 - Gradebook

You task is to write a flask application in python that shows students, courses and grades.

The application stores data in a database.

### Database

The file `setup_db.py` includes scripts to initialize a sqlite database, create tables, read, and write data.
* Run the script to initialize the database.
* You can also use the provided functions, e.g. for adding rows in the database in your flask application.
* Adding additional functions, e.g. for selecting specific content may help.



### Flask application

You should complete the `app.py` flask application. Generate templates that create the pages shown in the `sample` folder.
You should use templates, such that **the pages show the courses, students and grades from your database/files**.
You need to create the following templates/routes:

  - `/` or `index.html`
    * This file contains an overview and links to all files. Specifically, there should be two tables:
        - List of all courses, with columns "course code" and "name", sorted by course code. Add a link on the course code to the course's page.
        - List of all students, with columns "student no" and "name", sorted by student number. Add a link on the student number to the student's profile page.
        - A link to a form that allows to add new students.
        - See e.g. [index.html](sample/index.html)  
  - `/student/{student_no}`
    * This page displays for a student with a given student number:
        - The name of the student.
        - A list (table) of all courses (with course code and name) together with the grade.
        - A form with button that redirects to `/add_grade` route.
        - See e.g. [111111.html](sample/student/111111.html)
  - `/course/{course_code}`
    * This page displays for course with course_code
        - The course code.
        - A list (table) of all students that have a grade from this course, and their grades.
        - *This list should be sorted by grades, i.e. starting with all As then Bs, ...*
        - A summary of the grades, i.e. a table with the count of each grade.
        Only including grades with count 1 or higher.
        - A form with button that redirects to `/add_grade` route.
        - See e.g. [DAT100.html](sample/course/DAT100.html)
  - `/add_student`  
    * This page displays a form, that allows to add a student.
        - The form has one field for the students name.
        - When submitted, check that the name in not empty. Otherwise, display an error [student_form_error](sample/student_form_error.html).
        - Otherwise, add the student to the database with a new student_no.
          * Student numbers should be between 100000 and 999999
        - Then redirect the user to the index page.
        - See e.g. [student_form.html](sample/student_form.html).
  - `/add_grade`
    * This page allows to add a grade for a given course and student.
        - It contains a dropdown with all students.
        - It contains a dropdown with all courses.
        - It contains a dropdown with grades A to F.
        - It contains a submit button.
        - All dropdowns contain default elements, i.e. *Select*.
        - If the form is submitted and course, student or grade is missing,
        display the form again, together with an error message ([add_grade_error.html](sample/add_grade_error.html))
        - If a grade is successfully added to `grades.tsv` display a success message ([add_grade_success.html](sample/add_grade_success.html))
        - Display a link back to the main page.
        - See e.g. [add_grade.html](sample/add_grade.html).


  All templates should inherit from one base template `base.html`, that contains header and footer of the HTML page.
The CSS file `/static/style.css` is already given (but you are free to make changes to it, if you wish). 



  #### Extra challenge
  - `/add_grade` from course and student:
    * When the form is reached from a given course, then this course should be already selected.
    * When the form is reached from a given student, then the student should be already selected.


Under the `sample` folder, you can find an example of how the page should look.


# Øving 6 - Karakterbok

Du skal skrive en flask applikasjon i python som viser studenter, kurs og karakterer.

Applikasjonen lagrer data i en SQLite database.

### Database

Filen `setup_db.py` inneholder funkjsoner for å initialisere en sqlite database, lage tabeller, og skrive data.
* Kjør skriptet for å lage en database.
* Du kan bruke funksjonene (spesielt *add*) i din flask applikasjon.
* Det kan være nyttig å legge til funksjoner her, e.g. for å lese utvalgt data.

### Output

Fullfør applikasjonen i `app.py`. Lag templates som viser siden som vist i `sample`mappen.
Bruk templates slik at **sidene viser kurs, studenter og karakterer fra databasen/filene**.
Du skal lage følgende templates/routes:

  - `/` route med template `index.html`
    * Denne filen inneholder en oversikt og linker til alle filer. Det skal være tre tabeller:
        - Liste over alle emner, med kollonene "course code" og "name", sortert etter "course code". Legg til en link på emnekoden til emnets side.
        - Liste over alle studenter, med kollonene "student no" og "name", sortert etter "student no". Legg til en link på studentnummeret til studentens profilside
        - En lenke til et skjema som gjør det mulig å legge til nye studenter.
        - Se [index.html](sample/index.html)  
  - `/student/{student_no}`
    * Denne siden viser for hver student med en gitt student nummer:
        - Studentens navn.
        - En liste (tabell) over alle emner (med emnekode), sammen med karakter
        - Et form med en knapp, der man kommer til et annet form, og kan legge til flere karakterer for denne studenten.
        - Se e.g. [111111.html](sample/student/111111.html)
  - `/course/{course_code}`
    * Denne siden viser for et emne med gitt course_code
        - Koden course_code.
        - En liste (tabell) over alle studenter med en karakter fra dette emne og deres karakter.
          * Denne listen skal være sortert etter karakter, i.e. først A, så B, ... 
        - En karakter sammenfatning, i.e. en tabell med antall av hver karakter gitt.
        Bare inkluder karakterer med antall større en 0.
        - En lenke for å legge til flere karakterer for dette kurset.
        - Se e.g. [DAT100.html](sample/course/DAT100.html)
  - `/add_student`  
    * Denne siden viser et skjema som tillater å legge til studenter.
        - Skjemaet har et felt (input) for studentens navn.
        - Ved innsending, sjekk at navnet ikke er tomt. Ellers vis en error [student_form_error](sample/student_form_error.html).
        - Legg til studenten i `students.tsv` med et nytt student_no.
          * Et studentnummer skal være mellom 100000 og 999999 
        - Etterpå send brukeren tilbake til `/` (redirect).
        - Se e.g. [student_form.html](sample/student_form.html).
  - `/add_grade`
    * Denne siden tillater å legge til en karakter for et emne og en student.
        - Siden inneholder en select med alle studenter.
        - Siden inneholder en select med alle emner.
        - Siden inneholder en select med karakterer A til F.
        - Siden inneholder en submit knapp.
        - Alle selecter inneholder default elementer, i.e. *Select*.
        - Om skjemaet sendes inn med et default element valgt, vis formen igjen, sammen med en feil ([add_grade_error.html](sample/add_grade_error.html))
        - Om karakteren blir lagt til i `grades.tsv`, vis en success melding ([add_grade_success.html](sample/add_grade_success.html))
        - Vis en lenke for å komme tilbake til hovedsiden.
        - Se e.g. [add_grade.html](sample/add_grade.html).

Alle templates skal arve fra et base template `base.html`, som inneholder header og footer til en HTML side.
CSS filen `static/style.css` er allerede gitt (men du må gjerne gjøre forandringer, om du vil).

I `sample` mappen finner du et eksempel av hvordan siden skal se ut.


#### Ekstra utfordring
  - `/add_grade` fra emne eller student:
    * Hvis brukeren kommet til dette skjema gjennom å trykke på knappen på siden til et emne, skal dette emnet være allerede valgt.
    * Hvis brukeren kommet til dette skjema gjennom å trykke på knappen på siden til en student, skal student allerede være valgt.