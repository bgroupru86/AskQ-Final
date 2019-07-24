var lessonStudent;


$(document).ready(function () {
    p = JSON.parse(localStorage.person);
    document.getElementById('imgUser').src = "../" + p.Img;
    document.getElementById('imgUser2').src = "../" + p.Img;
    document.getElementById('imgUser4').src = "../" + p.Img;
    document.getElementById('imgUser3').src = "../" + p.Img;
    document.getElementById('profileName').innerHTML = p.FirstName + " " + p.LastName;
    document.getElementById('profileName2').innerHTML = p.FirstName + " " + p.LastName;
    GetCourse();
});
function GetCourse() {
    ajaxCall("GET", "../api/studentInLesson/?id=" + p.Id, "", successGet, errorGet);
}
function errorGet() {
    alert("error to get your courses");
}
function successGet(data) {
    lessonStudent = data;
    ajaxCall("put", "../api/Course", JSON.stringify(lessonStudent), successGetC, errorGetC);
}
function successGetC(data) {
    document.getElementById('myCourses').innerHTML = "";
    console.log(data);
    courses = data;
    var id;
    newcourse = '<div id="' + courses[0].CourseId + '" style="text-align: right;" ><button  value = "' + courses[0].CourseName + '" id = "' + courses[0].CourseId + '" onclick = "getLesson(' + courses[0].CourseId + ')" type = "button" class="btn btn-outline-secondary waves-effect c' + courses[0].CourseId + '" > ' + courses[0].CourseName + '</button ></div > ';
    document.getElementById('myCourses').innerHTML += newcourse;
    for (var i = 1; i < courses.length; i++) {
        var check = true;
        var Name = courses[i].CourseName;
        id = courses[i].CourseId;
        for (var j = i; j > 0; j--) {
            id2 = courses[j - 1].CourseId;
            if (id === id2) {
                check = false;
            }
        }
        if (check==true) {
        newcourse = '<div id="' + id + '" style="text-align: right;" ><button  value = "' + Name + '" id = "' + id + '" onclick = "getLesson(' + id + ')" type = "button" class="btn btn-outline-secondary waves-effect c' + id + '" > ' + Name + '</button ></div > ';
        document.getElementById('myCourses').innerHTML += newcourse;
        }
    }

}

function errorGetC() {
    swal("Oops", "Sorry, Some Problem with DB", "error");
}
function getLesson(idCourse) {
    $('#sidenav-collapse-main').removeClass("show");
    var lessonStudentTemp = new Array();
    for (var i = 0, j = 0; i < lessonStudent.length; i++) {
        if (lessonStudent[i].CourseId === idCourse) {
            lessonStudentTemp[j] = lessonStudent[i];
            j++;
        }
    }
    document.getElementById('myLesson').innerHTML = "";
    $('#sidenav-collapse-main').removeClass("show");
    courseId2 = idCourse;
    document.getElementById('courseName').innerHTML = $(".c" + idCourse).val();
    ajaxCall("PUT", "../api/Lesson/GetLes", JSON.stringify(lessonStudentTemp), successGetL, errorGetL);

}
function successGetL(data) {
    document.getElementById('myLesson').innerHTML = "";
    lessons = data;
    var Name = lessons[0].LessonName;
    var id = lessons[0].LessonId;
    btnLesson = '<div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" style="width: 130px" value="' + id + '" data-toggle="dropdown"> Files <span class="caret"></span></button><ul id="F' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#newFileModal"></a></li></ul></div><div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">Multiple Choise Question <span class="caret"></span></button><ul id="' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#multipleModal"></a></li></ul></div><div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">Yes / No Question <span class="caret"></span></button><ul id="y' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#yesNoModal"></a></li></ul></div>';
    newlesson = '<div class="container lessons" data-toggle="collapse" onclick="saveIdLesson(' + id + ')" href="#collapse' + id + '"><div class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title" >' + Name + '</a ></h4 ></div ><div id = "collapse' + id + '" class="panel - collapse collapse" >' + btnLesson + '</div ></div ></div ></div > ';
    document.getElementById('myLesson').innerHTML += newlesson;
    for (var i = 1; i < lessons.length; i++) {
        var check = true;
        var Name = lessons[i].LessonName;
        var id = lessons[i].LessonId;
        for (var j = i; j > 0; j--) {
            id2 = lessons[j - 1].LessonId;
            if (id === id2) {
                check = false;
            }
        }
        if (check == true) {
            btnLesson = '<div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" style="width: 130px" value="' + id + '" data-toggle="dropdown"> Files <span class="caret"></span></button><ul id="F' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#newFileModal"></a></li></ul></div><div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">Multiple Choise Question <span class="caret"></span></button><ul id="' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#multipleModal"></a></li></ul></div><div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">Yes / No Question <span class="caret"></span></button><ul id="y' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#yesNoModal"></a></li></ul></div>';
            newlesson = '<div class="container lessons" data-toggle="collapse" onclick="saveIdLesson(' + id + ')" href="#collapse' + id + '"><div class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title" >' + Name + '</a ></h4 ></div ><div id = "collapse' + id + '" class="panel - collapse collapse" >' + btnLesson + '</div ></div ></div ></div > ';
            document.getElementById('myLesson').innerHTML += newlesson;
        }
    }
}
function errorGetL() {
    alert("error with get lessons");
}
function saveIdLesson(idL) {
    lessonId = idL;
    var idcourse = courseId2;
    GetFiles(idcourse, idL);
    ajaxCall("POST", "../api/AddFile/?lessonId=" + lessonId + "&courseId=" + idcourse, "", "", "");
    GetQuestions(lessonId, idcourse);
    GetYesNoQuestions(lessonId, idcourse);
}
function GetFiles(idc, idl) {
    ajaxCall("GET", "../api/AddFile/?lessonId=" + idl + "&courseId=" + idc, "", successGetF, errorGetF);
}
function successGetF(data) {
    files = data;
    var idc = files[0].CourseId;
    var idl = files[0].LessonId;
    $("#F" + idl).html("");
    document.getElementById("F" + idl).innerHTML += '<li><a href="#" class="options" data-toggle="modal" data-target="#newFileModal"></a></li>';
    for (var i = 0; i < files.length; i++) {
        var idF = files[i].Idfile;
        var fileName = files[i].FileName;
        var fPath = files[i].Path;
        var li = '<li id="' + idF + '" class="list - group - item"><a class="options" href="../uploadedFiles/' + fPath + '" download>' + fileName + '</a></li>';
        document.getElementById("F" + idl).innerHTML += li;
    }
}
function errorGetF() {
    alert("error with getting files");
}
function GetQuestions(lessonId, idcourse) {
    ajaxCall("GET", "../api/MultipleChoiceQuestion/get/?lessonId=" + lessonId + "&courseId=" + idcourse, "", successgetQuestions, errorGetC);
}
function successgetQuestions(data) {
    var idc = data[0].CourseId;
    var idl = data[0].LessonId;
    editQuestion = data;
    clearAlll2();
    $("#" + idl).html("");
    document.getElementById(idl).innerHTML += '<li><a href="#" class="options" data-toggle="modal" data-target="#multipleModal"></a></li>';
    for (var i = 0; i < data.length; i++) {
        var temp = i + 1;
        if (temp === data.length) {
            if (data[i].QuizNum !== "") {
                var idq = data[i].ID;
                var idt = data[i].QuizTitle;
                var qn = data[i].QuizNum;
                var li = '<li class="dropdown-submenu"><a onclick="TestClick(this)" class="test" tabindex="-1" href="#" style="font-weight: bold;">' + idt + '<span class="caret"></span></a><ul id="' + data[i].QuizNum + '" class="dropdown-menu"></ul></li>'
                document.getElementById(idl).innerHTML += li;
                for (var n = 0; n < data.length; n++) {
                    if (data[n].QuizNum === qn) {
                        var l = '<li><a href = "#" value="edit" id="' + n + '"class="options multipleQ" data-toggle="modal" data-target="#multipleModalEdit">' + data[n].QuestionTitle + '</a></li>'
                        document.getElementById(qn).innerHTML += l;
                    }
                }
            }
        }
        else if (data[i].QuizTitle === "") {
            var idq = data[i].ID;
            var idt = data[i].QuestionTitle;
            var li = '<li id="' + idq + '" class="list - group - item"><a href = "#" value="edit" id="' + i + '"class="options multipleQ" data-toggle="modal" data-target="#multipleModalEdit">' + idt + '</a></li>';
            document.getElementById(idl).innerHTML += li;
        }
        else if (data[i].QuizNum !== data[temp].QuizNum) {
            var idq = data[i].ID;
            var idt = data[i].QuizTitle;
            var qn = data[i].QuizNum;
            var li = '<li class="dropdown-submenu"><a onclick="TestClick(this)" class="test" tabindex="-1" href="#" style="font-weight: bold;">' + idt + '<span class="caret"></span></a><ul id="' + data[i].QuizNum + '" class="dropdown-menu"></ul></li>'
            document.getElementById(idl).innerHTML += li;
            for (var n = 0; n < data.length; n++) {
                if (data[n].QuizNum === qn) {
                    var l = '<li><a href = "#" value="edit" id="' + n + '"class="options multipleQ" data-toggle="modal" data-target="#multipleModalEdit">' + data[n].QuestionTitle + '</a></li>'
                    document.getElementById(qn).innerHTML += l;
                }
            }
        }
    }
    localStorage.setItem("idMultipleq", idq);
    localStorage.setItem("fotGetElementById", idl);
}
function TestClick(e) {
    $(e).next('ul').toggle();
    event.stopPropagation();
    event.preventDefault();
}
function GetYesNoQuestions(lessonId, idcourse) {
    ajaxCall("GET", "../api/YesNoQuestion/get/?lessonId=" + lessonId + "&courseId=" + idcourse, "", successgetYesNoQuestions, errorGetC);
}
function successgetYesNoQuestions(data) {
    var idc = data[0].CourseId;
    var idl = data[0].LessonId;
    editYNQuestion = data;
    clearAll();
    $("#y" + idl).html("");
    document.getElementById("y" + idl).innerHTML += '<li><a href="#" class="options" data-toggle="modal" data-target="#yesNoModal"></a></li>';
    for (var i = 0; i < data.length; i++) {
        var idq = data[i].ID;
        var idt = data[i].QuestionTitle;
        var li = '<li id="y' + idq + '" class="list - group - item"><a href = "#" id="' + i + '"title="' + idq + '" class="options yesNoQ" data-toggle="modal" data-target="#EditYesNoModal">' + idt + '</a></li>';
        document.getElementById("y" + idl).innerHTML += li;
    }
    localStorage.setItem("idYesNoq", idq);
}
$(document).on('click', '.multipleQ', function (e) {
    document.getElementById("answerChecked11").checked = false;    //uncheked all the answers
    document.getElementById("answerChecked22").checked = false;
    document.getElementById("answerChecked33").checked = false;
    document.getElementById("answerChecked44").checked = false;
    quesID = e.target.classList[2];
    $('#QuestionTitle1').attr('value', editQuestion[e.target.id].QuestionTitle);
    $('#MultipleQue1').attr('value', editQuestion[e.target.id].QuestionContent);
    $('.Answer1').attr('value', editQuestion[e.target.id].Answer1Content);
    $('.Answer2').attr('value', editQuestion[e.target.id].Answer2Content);
    $('.Answer3').attr('value', editQuestion[e.target.id].Answer3Content);
    $('.Answer4').attr('value', editQuestion[e.target.id].Answer4Content);
    $('.limit').val(editQuestion[e.target.id].Timer);
    if (editQuestion[e.target.id].CorrectAnswer == editQuestion[e.target.id].Answer1Content) {
        document.getElementById("answerChecked11").checked = true;
        correctId = 'answerChecked11';
    }
    else if (editQuestion[e.target.id].CorrectAnswer == editQuestion[e.target.id].Answer2Content) {
        document.getElementById("answerChecked22").checked = true;
        correctId = 'answerChecked22';
    }
    else if (editQuestion[e.target.id].CorrectAnswer == editQuestion[e.target.id].Answer3Content) {
        document.getElementById("answerChecked33").checked = true;
        correctId = 'answerChecked33';
    }
    else if (editQuestion[e.target.id].CorrectAnswer == editQuestion[e.target.id].Answer4Content) {
        document.getElementById("answerChecked44").checked = true;
        correctId = 'answerChecked44';
    }
    document.getElementById("answerChecked11").disabled = true;    //lock all the answers
    document.getElementById("answerChecked22").disabled = true;
    document.getElementById("answerChecked33").disabled = true;
    document.getElementById("answerChecked44").disabled = true;
    //document.getElementById(correctId).disabled = false;    //unlock the correct answer
    oneAnswerClick = true;
    selectedId = correctId;
});
$(document).on('click', '.yesNoQ', function (e) {
    $('#yesNoQueTitle1').attr('value', editYNQuestion[e.target.id].QuestionTitle);
    $('#yesNoQue1').attr('value', editYNQuestion[e.target.id].Content);
    if (!editYNQuestion[e.target.id].CorecctAnswer) {
        $("#no1").prop("checked", true);
    }
    else {
        $("#yes1").prop("checked", true);
    }
    YNQid = editYNQuestion[e.target.id].ID;
});
$(document).on('click', '.EditProfile', function (e) {
    $('#EditName').attr('value', p.FirstName);
    $('#EditLastName').attr('value', p.LastName);
    $('#EditIdNum').attr('value', p.Id);
    $('#EditIdNum').attr("disabled", true);
    $('#EditEmail').attr('value', p.Email);
    $('#EditPass').attr('value', p.Userpassword);
    $('#EditRe_pass').attr('value', p.Userpassword);
    $('#EditGender').val(p.Gender);
});
function updateProfile() {
    if ($("#EditRe_pass").val() == $("#EditPass").val()) {
        FirstName = $("#EditName").val();
        LastName = $("#EditLastName").val();
        Email = $("#EditEmail").val();
        Pass = $("#EditPass").val();
        Gender = $("#EditGender").val();
        Id = $('#EditIdNum').val();
        Person = {
            Id: Id,
            FirstName: FirstName,
            LastName: LastName,
            Gender: Gender,
            Email: Email,
            Type: "Student",
            Userpassword: Pass,
            Img: p.Img
        }
        ajaxCall("PUT", "../api/Person", JSON.stringify(Person), updateSuccess3, error);
    }
    else {
        alert("your password dosen't match!")
    }
}
function updateSuccess3() {
    localStorage.setItem('person', JSON.stringify(Person));
    swal("update success!");
    p = JSON.parse(localStorage.person);
    document.getElementById('imgUser').src = "../" + p.Img;
    document.getElementById('imgUser2').src = "../" + p.Img;
    document.getElementById('imgUser4').src = "../" + p.Img;
    document.getElementById('imgUser3').src = "../" + p.Img;
    document.getElementById('profileName').innerHTML = p.FirstName + " " + p.LastName;
    document.getElementById('profileName2').innerHTML = p.FirstName + " " + p.LastName;

}
function error(err) {
    console.log(JSON.stringify(err))
    alert("EROR: " + JSON.stringify(err));
}
function closeAll() {
    $("#QuestionTitle").val("");
    $("#MultipleQue").val("");
    $("#Answer1").val("");
    $("#Answer2").val("");
    $("#Answer3").val("");
    $("#Answer4").val("");
    $("#MultipleQue").css("border-color", "#999");
    $("#QuestionTitle").css("border-color", "#999");
    $("#Answer1").css("border-color", "#999");
    $("#Answer2").css("border-color", "#999");
    document.getElementById("answerChecked1").checked = false;    //uncheked all the answers
    document.getElementById("answerChecked2").checked = false;
    document.getElementById("answerChecked3").checked = false;
    document.getElementById("answerChecked4").checked = false;
    document.getElementById("answerChecked1").disabled = false;    //unlock all the answers
    document.getElementById("answerChecked2").disabled = false;
    document.getElementById("answerChecked3").disabled = false;
    document.getElementById("answerChecked4").disabled = false;
    oneAnswerClick = false;
}
function clearAll() {
    $("#yesNoQueTitle").val("");
    $("#yesNoQue").val("");
    $("#yes").prop("checked", false);
    $("#no").prop("checked", false);
}
function clearAlll2() {
    $("#QuestionTitle").val("");
    $("#MultipleQue").val("");
    $("#Answer1").val("");
    $("#Answer2").val("");
    $("#Answer3").val("");
    $("#Answer4").val("");
    document.getElementById("answerChecked1").checked = false;    //uncheked all the answers
    document.getElementById("answerChecked2").checked = false;
    document.getElementById("answerChecked3").checked = false;
    document.getElementById("answerChecked4").checked = false;
}