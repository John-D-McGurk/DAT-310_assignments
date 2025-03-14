"""
Flask: Using templates
"""

from random import randint
from flask import Flask, render_template, request, redirect, url_for, g
import setup_db
app = Flask(__name__)



@app.route("/")
def index():
    db = setup_db.create_connection('database.db')
    curr = db.cursor()
    curr.execute('SELECT * FROM students')
    students = []
    for student in curr:
        students.append(
            {'student_no': student[0],
             'name': student[1]})
        
    curr.execute('SELECT * FROM courses')
    courses = []
    for course in curr:
        courses.append(
            {'course_id': course[0],
             'name': course[1]})
        
    return render_template("index.html", 
                    # get the list of students
                    students=students, courses=courses)


@app.route('/student/<student_no>')
def student(student_no):
    db = setup_db.create_connection('database.db')
    curr = db.cursor()
    curr.execute('SELECT * FROM students WHERE student_no = ?', (student_no,))
    student = {'student_no': student_no,
               'name': curr.fetchone()[1]
               }
    
    curr.execute('SELECT * FROM grades WHERE student_no = ?', (student_no,))
    grades = []
    for grade in curr:
        grades.append(
            {'course_id': grade[2],
             'grade': grade[3]})
    return render_template("student.html", student=student, grades=grades)

@app.route('/course/<course_id>')
def course(course_id):
    db = setup_db.create_connection('database.db')
    curr = db.cursor()
    curr.execute('SELECT * FROM courses WHERE id = ?', (course_id,))
    course = {'course_id': course_id,
              'name': curr.fetchone()[1]}
    curr.execute('SELECT students.student_no, name, grade FROM students INNER JOIN grades ON students.student_no = grades.student_no WHERE grades.course_id = ?', (course_id,))

    students = []
    for student in curr:
        students.append(
            {'student_no': student[0],
             'grade': student[2],
             'name': student[1]})
        
    grades = []
    curr.execute('SELECT grade, COUNT(grade) FROM grades WHERE course_id = ? GROUP BY grade', (course_id,))
    for grade in curr:
        grades.append(
            {'grade': grade[0],
             'count': grade[1]})
        
    return render_template("course.html", course=course, students=students, grades=grades)

@app.route('/add_student', methods=['GET', 'POST'])
def add_student():
    if request.method == 'GET':
        return render_template("add_student.html")
    else:
        name = request.form.get('name')
        db = setup_db.create_connection('database.db') 
        curr = db.cursor()     

        student_no = randint(100000, 999999)  
        used_student_nos = curr.execute('SELECT student_no FROM students WHERE student_no = ?', (student_no,))
        while used_student_nos.fetchone() is not None:
            student_no = randint(100000, 999999)
            used_student_nos = curr.execute('SELECT student_no FROM students WHERE student_no = ?', (student_no,))

        setup_db.add_student(db, student_no, name)
        return redirect(url_for('index'))

@app.route('/add_grade', methods=['GET', 'POST'])
def add_grade():
    if request.method == 'GET':
        selected_course_id = None
        selected_student_no = None

        if request.args.get('student_no') is not None:
            selected_student_no = request.args.get('student_no')
        if request.args.get('course_id') is not None:
            selected_course_id = request.args.get('course_id')
        if request.args.get('success') is not None:
            success = {'display': True, 'student_no': request.args.get('success_student_no'), 'course_id': request.args.get('success_course_id'), 'grade': request.args.get('success_grade')}
        else:
            success = {'display': False}
        if request.args.get('error') is not None:
            error = {'display': True }
        else:
            error = {'display': False}
        db = setup_db.create_connection('database.db')
        curr = db.cursor()
        curr.execute('SELECT * FROM students')
        students = []
        for student in curr:
            students.append(
                {'student_no': student[0],
                 'name': student[1]})
            
        curr.execute('SELECT * FROM courses')
        courses = []
        for course in curr:
            courses.append(
                {'course_id': course[0],
                 'name': course[1]})
            
        return render_template("add_grade.html", students=students, courses=courses, sel_student=selected_student_no, sel_course=selected_course_id, success=success, error=error)
    else:
        course_id = request.form.get('course')
        student_no = request.form.get('student')
        grade = request.form.get('grade')

        missing_params = []
        print(course_id)

        if course_id == 'Select':
            missing_params.append('course id')
        if student_no == 'Select':
            missing_params.append('student no')
        if grade is "":
            missing_params.append('grade')

        if len(missing_params) == 0:
            db = setup_db.create_connection('database.db')
            setup_db.add_grade(db, course_id, student_no, grade)
            print('success')
            return redirect(url_for('add_grade', success=True, success_student_no=student_no, success_course_id=course_id, success_grade=grade))
        else: 
            print('error')
            return redirect(url_for('add_grade', error=True, reasons= missing_params))
        
if __name__ == "__main__":
    app.run(debug=True)