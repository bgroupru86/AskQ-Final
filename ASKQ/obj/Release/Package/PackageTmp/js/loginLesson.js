$(document).ready(function () {
    person = JSON.parse(localStorage.person);
    document.getElementById('imgUser22').src = "../" + person.Img;
    document.getElementById('profileName22').innerHTML = person.FirstName + " " + person.LastName;
    $('#loginLess').submit(StartLess);
});

function StartLess() {
    var lessId = $("#LessonId").val();
    IsActive(lessId);
    return false;
}
//בדיקה לשיעור פעיל והבאת הפרטים
function IsActive(idLes) {
    ajaxCall("GET", "../api/Lesson/?lessonCode=" + idLes, "", succsessActive, errorActive);
}
function succsessActive(data) {
    //צריך להכניס נתונים לטבלת סטודנט בשיעור
    les = data;
    if (les.IsActive === true) {
        StudentInLesson();
    }
    else {
        swal("Oops", "Sorry, The lesson not start yet", "error");
    }
}
function errorActive() {
    alert("Sorry, problem with checked actived lesson");
}
function StudentInLesson() {
    studentin = {
        LessonId: les.LessonId,
        CourseId: les.CourseId,
        StudentId: person.Id,
        LecturerId: les.Id,
        LessonCode: $("#LessonId").val()
    };
    ajaxCall("POST", "../api/StudentInLesson", JSON.stringify(studentin), succsessStudent, errorStudent);
}
function succsessStudent() {
    swal("Welcome!", "Let's start learning!", "success");
    setTimeout(function () {
        localStorage.setItem('lessonCode', $("#LessonId").val());
        window.location.href = "ChatStudent.html";
    }, 3000);
}
function errorStudent() {
    swal("Oops", "The System can't save you in this Lesson, try again later", "error")
}