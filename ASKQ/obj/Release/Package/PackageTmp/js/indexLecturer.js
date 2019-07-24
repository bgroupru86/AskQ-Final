//import { setTimeout } from "core-js/library/web/timers";
var LId;
var CId;
var lId;
var cId;
var isItQuiz = false;
var oneAnswerClick = false;
var selectedId;
var editQuestion;
var editYNQuestion;
var quesID;
var YNQid;
var test = "";
var lessons;
var courses;
var Person;
var correctId;

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
$('#topicModal').on('show.bs.modal', function (e) {
    $trigger = $(e.relatedTarget);
    newTopicId = e.relatedTarget.value;
});
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBp55jCWT6yobw7s2T6sKnB5YhF-Qb0fzQ",
    authDomain: "askq-1234.firebaseapp.com",
    databaseURL: "https://askq-1234.firebaseio.com",
    projectId: "askq-1234",
    storageBucket: "askq-1234.appspot.com",
    messagingSenderId: "713703772173"
};
firebase.initializeApp(config);
DataRef = firebase.database().ref("/lessonAndCourse");
questionRef = firebase.database().ref("/isQuestionLocked");
forMultiQuestion = firebase.database().ref("/forMultiQuestion");
quizNumber = firebase.database().ref("/quizNumber");
questionRef.update(({ 'state2': "false" }));
function AddNewCourse() {
    var d = new Date();
    var n = d.getFullYear();
    newCourse = {
        Id:p.Id,
        CourseName: $("#CourseName").val(),
        Info: $("#CourseInfo").val(),
        CourseYear: n
    };
    ajaxCall("POST", "../api/Course", JSON.stringify(newCourse), successNewCourse, errorNewCourse);
}
function successNewCourse() {
    $("#CourseName").val("");
    $("#CourseInfo").val("");
    GetCourse();
}
function errorNewCourse() {
    swal("Oops", "Sorry, Some Problem with DB", "error");
}
function GetCourse() {
    ajaxCall("GET", "../api/Course/?id=" + p.Id, "", successGetC, errorGetC);
}
function successGetC(data) {
    document.getElementById('myCourses').innerHTML = "";
    console.log(data);
    courses = data;
    var id;
    for (var i = 0; i < courses.length; i++) {
        var Name = courses[i].CourseName;
        id = courses[i].CourseId;
        newcourse = '<div id="' + id + '" style="text-align: right;" ><button  value = "' + Name + '" id = "' + id + '" onclick = "getLesson(' + id + ')" type = "button" class="btn btn-outline-secondary waves-effect c' + id + '" > ' + Name+'</button ></div > ';
        document.getElementById('myCourses').innerHTML += newcourse;
    }
}
function errorGetC() {
    swal("Oops", "Sorry, Some Problem with DB", "error");
}
function getLesson(idCourse) {
    forMultiQuestion.update(({ 'course': idCourse }));
    $('#sidenav-collapse-main').removeClass("show");
    courseId2 = idCourse;
    document.getElementById('courseName').innerHTML = $(".c"+idCourse).val();
    var btn = '<div id="btnC" class="btn-group btn-group-justified"><button data-toggle="modal" value="' + idCourse +'" data-target="#topicModal" type="button" class="btn btn-success">Add new topic</button><button type="button" class="btn btn-success" onclick="updateOrDeleteTopic()">Update/Delete Topic</button></div>';
    document.getElementById('showBtn').innerHTML = btn;
    ajaxCall("GET", "../api/Lesson/?id=" + p.Id + "&courseId=" + idCourse, "", successGetL, errorGetL);
}
function successGetL(data) {
    document.getElementById('myLesson').innerHTML = "";
    console.log(data);
    lessons = data;
    for (var i = 0; i < lessons.length; i++) {
        var Name = lessons[i].LessonName;
        var id = lessons[i].LessonId;
        var btnLesson = '<div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" style="width: 130px" value="' + id + '" data-toggle="dropdown"> Files <span class="caret"></span></button><ul id="F' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#newFileModal">Add New File</a></li></ul></div><div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">Multiple Choise Question <span class="caret"></span></button><ul id="' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#multipleModal">Add New Question</a></li></ul></div><div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">Yes / No Question <span class="caret"></span></button><ul id="y' + id + '" class="dropdown-menu" role="menu"><li><a href="#" class="options" data-toggle="modal" data-target="#yesNoModal">Add New Question</a></li></ul></div><button onclick="Lets_Start(' + id + ')" type="button" class="btn btn-success" style="margin-left: 15px; float:right">Lets Start!</button>';
        newlesson = '<div class="container lessons" data-toggle="collapse" onclick="saveIdLesson(' + id + ')" href="#collapse' + id + '"><div class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h4 id="l' + i + '" class="panel-title topic" >' + Name + '</a ></h4 ></div ><div id = "collapse' + id + '" class="panel - collapse collapse" >' + btnLesson + '</div ></div ></div ></div > ';
        document.getElementById('myLesson').innerHTML += newlesson;
    }
}
function saveIdLesson(idL) {
    forMultiQuestion.update(({ 'lesson': idL }));
    lessonId = idL;
    var idcourse = courseId2;
    GetFiles(idcourse, idL);
    ajaxCall("POST", "../api/AddFile/?lessonId=" + lessonId + "&courseId=" + idcourse, "", "", "");
    GetQuestions(lessonId, idcourse);
    GetYesNoQuestions(lessonId, idcourse);
}
function errorGetL() {
    swal("Oops", "Sorry, Some Problem with get Your lessons", "error");
}
function AddNewTopic() {
    newTopic = {
        LessonName: $("#TopicName").val(),
        Info: $("#TopicInfo").val(),
        IsActive: false,
        timeStampLesson: $("#TopicTime").val(),
        courseId: courseId2,
        Id: p.Id
    };
    ajaxCall("POST", "../api/Lesson", JSON.stringify(newTopic), successNewTopic, errorNewTopic);

}
function successNewTopic() {
    $("#TopicName").val("");
    $("#TopicInfo").val("");  
    $("#TopicTime").val("");  
    getLesson(courseId2);
}
function errorNewTopic() {
    swal("Oops", "Sorry, Some Problem with Add New lesson", "error");
}
function AddNewYesNo() {
    if ($("#yesNoQueTitle").val() != "" && $("#yesNoQue").val() != "" && ($("input[name='choice']:checked").val() == "1" || $("input[name='choice']:checked").val() == "0")) {
        var d = new Date();
        d.toString();
        YesNoQ = {
            Content: $("#yesNoQue").val(),
            QuestionTitle: $("#yesNoQueTitle").val(),
            correctAnswer: $("input[name='choice']:checked").val(),
            UploadDate: d,
            LessonId: lessonId,
            CourseId: courseId2
        }
        ajaxCall("POST", "../api/YesNoQuestion/put", JSON.stringify(YesNoQ), updateSuccess, error);
    }
    else {
        if ($("#yesNoQueTitle").val() == "") {
            $("#yesNoQueTitle").css("border-color", "Red");
        }
        if ($("#yesNoQue").val() == "") {
            $("#yesNoQue").css("border-color", "Red");
        }
        if ($("input[name='choice']:checked").val() != "1" && $("input[name='choice']:checked").val() != "0") {
            swal("Oops", "You didn't select correct answer!!", "error");
        }
    }
}
function updateSuccess() {
    $("#yesNoModal").modal("hide");
    LId = lessonId;
    CId = courseId2;
    GetYesNoQuestions(LId, CId);
}
function error(err) {
    console.log(JSON.stringify(err))
    swal("Oops", "Sorry, Some Problem with DB", "error");
}
function AddNewFile() {
    var fname = courseId2 + "/" + lessonId + "/";
    var file = $("#fileupload").get(0).files[0];
        var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
        sizee = $("#fileupload")[0].files[0].size; //file size in bytes
        sizee = sizee / 1024; //file size in Kb
    newFile = {
        LessonId: lessonId,
        CourseId: courseId2,
        FileName: $("#fileName").val() ,
        FileDescription: $("#fileDescription").val(),
        Path: fname + file.name,
        TypeFile: ext,
        Size: sizee
    };
    jQuery(".courses").prepend('<div id ="loader"></div>');
    addfile_ajax(newFile, lessonId, courseId2, fname,file);
}
function AddFileSuccsess(newFile) {
    ajaxCall("POST", "../api/AddFile", JSON.stringify(newFile), successNewFile, errorNewFile);
}
function successNewFile() {
    document.getElementById('fileName').value = "";
    document.getElementById('fileDescription').value = "";
    swal({
        title: "Success!",
        text: "Your File Upluaded Successfully",
        imageUrl: 'thumbs-up.jpg'
    });
    GetFiles(courseId2, lessonId);
}
function errorNewFile() {
    swal("Oops", "Some Problem With Your File", "error");
}
function GetFiles(idc,idl) {
    ajaxCall("GET", "../api/AddFile/?lessonId=" + idl + "&courseId=" + idc, "", successGetF, errorGetF);
}
function successGetF(data) {
    files = data; 
    var idc = files[0].CourseId;
    var idl = files[0].LessonId;
    $("#F" + idl).html("");
    document.getElementById("F" + idl).innerHTML += '<li><a href="#" class="options" data-toggle="modal" data-target="#newFileModal">Add New File</a></li>';
    for (var i = 0; i < files.length; i++) {
        var idF = files[i].Idfile;
        var fileName = files[i].FileName;
        var fPath = files[i].Path;
        var li = '<li id="' + idF + '" class="list - group - item"><a href="../uploadedFiles/' + fPath + '" download style="color: black;">' + fileName + '</a></li>';
        document.getElementById("F"+idl).innerHTML += li;
    }
}
function errorGetF() {
    swal("Oops", "Sorry, Some Problem with Getting files", "error");
}
function Lets_Start(lId) {
    questionRef.update(({ 'state2': "true" }));
    var lesc = courseId2 + "" + lId;
    toChat = {
        LessonId: lId,
        CourseId: courseId2,
        LessonCode: lesc
    }
    ajaxCall("PUT", "../api/Lesson", JSON.stringify(toChat), successStart, errorStart);
    DataRef.update(({ 'lesson': lId }));
    DataRef.update(({ 'course': courseId2 }));
    localStorage.setItem('toChat', JSON.stringify(toChat));

}
function successStart() {
    swal("Lesson is Active!", "Let's Start Learn!", "success")
    setTimeout(function () {
        window.location.href = "ChatNew.html";
    }, 3000);
}
function errorStart() {
    swal("lesson is not active", "please try again", "error");
}
function addNewQuestion() {
    isItQuiz = true;
    quizNumber.once("value", function (snapshot) {
        counter = snapshot.val().quizNumber;
    })
    var correctAnswerContent = localStorage.getItem('answerContent');
    if ($("#MultipleQue").val() != "" && $("#QuestionTitle").val() != "" && $("#Answer1").val() && $("#Answer2").val() && (document.getElementById("answerChecked1").checked == true || document.getElementById("answerChecked2").checked == true || document.getElementById("answerChecked3").checked == true || document.getElementById("answerChecked4").checked == true)) {
        setTimeout(function () {
            var u = new Date();
            u.toString();
            multipleQuiz = {
                UploadDate: u,
                QuestionContent: $("#MultipleQue").val(),
                LessonId: lessonId,
                CourseId: courseId2,
                Answer1Content: $("#Answer1").val(),
                Answer2Content: $("#Answer2").val(),
                Answer3Content: $("#Answer3").val(),
                Answer4Content: $("#Answer4").val(),
                Timer: $("#limit").val(),
                CorrectAnswer: correctAnswerContent,
                QuestionTitle: $("#QuestionTitle").val(),
                QuizNum: counter
            }
            ajaxCall("Post", "../api/MultipleChoiceQuestion/post", JSON.stringify(multipleQuiz), successAdd, error);
        }, 1000);
    }
    else {
        if ($("#MultipleQue").val() == "") {
            $("#MultipleQue").css("border-color", "Red");
        }
        if ($("#QuestionTitle").val() == "") {
            $("#QuestionTitle").css("border-color", "Red");
        }
        if ($("#Answer1").val() == "") {
            $("#Answer1").css("border-color", "Red");
        }
        if ($("#Answer2").val() == "") {
            $("#Answer2").css("border-color", "Red");
        }
        if (document.getElementById("answerChecked1").checked == false && document.getElementById("answerChecked2").checked == false && document.getElementById("answerChecked3").checked == false && document.getElementById("answerChecked4").checked == false) {
            swal("Oops", "You didn't select correct answer!!", "error");
        }
        $("multipleModal").modal("show");
    }
}
function AddMultiple() {
    quizNumber.once("value", function (snapshot) {
        counter = snapshot.val().quizNumber;
    })
    var correctAnswerContent = localStorage.getItem('answerContent');
    if ($("#MultipleQue").val() != "" && $("#QuestionTitle").val() != "" && $("#Answer1").val() && $("#Answer2").val() && (document.getElementById("answerChecked1").checked == true || document.getElementById("answerChecked2").checked == true || document.getElementById("answerChecked3").checked == true || document.getElementById("answerChecked4").checked == true)) {
        if (isItQuiz == true) {
            isItQuiz = false;
            var u = new Date();
            u.toString();
            multipleQuiz = {
                UploadDate: u,
                QuestionContent: $("#MultipleQue").val(),
                LessonId: lessonId,
                CourseId: courseId2,
                Answer1Content: $("#Answer1").val(),
                Answer2Content: $("#Answer2").val(),
                Answer3Content: $("#Answer3").val(),
                Answer4Content: $("#Answer4").val(),
                Timer: $("#limit").val(),
                correctAnswer: correctAnswerContent,
                QuestionTitle: $("#QuestionTitle").val(),
                QuizNum: counter
            }
            ajaxCall("Post", "../api/MultipleChoiceQuestion/post", JSON.stringify(multipleQuiz), successInsertQuiz, error);
        }
        else {
            setTimeout(function () {
                var u = new Date();
                u.toString();
                multipleQuiz = {
                    UploadDate: u,
                    QuestionContent: $("#MultipleQue").val(),
                    LessonId: lessonId,
                    CourseId: courseId2,
                    Answer1Content: $("#Answer1").val(),
                    Answer2Content: $("#Answer2").val(),
                    Answer3Content: $("#Answer3").val(),
                    Answer4Content: $("#Answer4").val(),
                    Timer: $("#limit").val(),
                    correctAnswer: correctAnswerContent,
                    QuestionTitle: $("#QuestionTitle").val(),
                    QuizNum: counter
                }
                ajaxCall("Post", "../api/MultipleChoiceQuestion/post", JSON.stringify(multipleQuiz), successInsert, error);
            }, 1000);
        }
        $("#multipleModal").modal("hide");
    }
    else {
        if ($("#MultipleQue").val() == "") {
            $("#MultipleQue").css("border-color", "Red");
        }
        if ($("#QuestionTitle").val() == "") {
            $("#QuestionTitle").css("border-color", "Red");
        }
        if ($("#Answer1").val() == "") {
            $("#Answer1").css("border-color", "Red");
        }
        if ($("#Answer2").val() == "") {
            $("#Answer2").css("border-color", "Red");
        }
        if (document.getElementById("answerChecked1").checked == false && document.getElementById("answerChecked2").checked == false && document.getElementById("answerChecked3").checked == false && document.getElementById("answerChecked4").checked == false) {
            swal("Oops", "You didn't select correct answer!!", "error");
        }
    }
}
function successInsert() {
    counter = counter + 1;
    quizNumber.update(({ 'quizNumber': counter }));
    LId = lessonId;
    CId = courseId2;
    GetQuestions(LId, CId);
    closeAll();
}
function successInsertQuiz() {
    counter = counter + 1;
    quizNumber.update(({ 'quizNumber': counter }));
    $("#QuizTitleModal").modal("show");
}
function successAdd() {
    closeAll();
}
function AddQuiz() {
    var qTitle = $("#QuizTitle").val();
    quizNumber.once("value", function (snapshot) {
        counter = snapshot.val().quizNumber;
    });
    var count = counter - 1;
    let str = "../api/MultipleChoiceQuestion/put/?count=" + count + "&quizTitle=" + qTitle;
    ajaxCall("Put", str, "", updateSuccess2, error);
}
function saveCorrectAnswer(event) {
    answerId = event.id;
    answerNum = event.classList[1];    //get the id like 4
    if (oneAnswerClick == false) {
        oneAnswerClick = true;
        selectedId = answerId;
        document.getElementById("answerChecked1").disabled = true;    //lock all the answers
        document.getElementById("answerChecked2").disabled = true;
        document.getElementById("answerChecked3").disabled = true;
        document.getElementById("answerChecked4").disabled = true;
        document.getElementById(answerId).disabled = false;    //unlock the correct answer
        answerContent = document.getElementById("Answer" + answerNum).value;
        localStorage.setItem('answerContent', answerContent);
    }
    else if (answerId == selectedId) {
        document.getElementById("answerChecked1").disabled = false;    //unlock all the answers
        document.getElementById("answerChecked2").disabled = false;
        document.getElementById("answerChecked3").disabled = false;
        document.getElementById("answerChecked4").disabled = false;
        oneAnswerClick = false;
    }
    else return;
}
function saveCorrectAnswerEdit(event) {
    answerId = event.id;
    answerNum = event.classList[1];    //get the id like 4
    if (oneAnswerClick == false) {
        oneAnswerClick = true;
        selectedId = answerId;
        document.getElementById("answerChecked11").disabled = true;    //lock all the answers
        document.getElementById("answerChecked22").disabled = true;
        document.getElementById("answerChecked33").disabled = true;
        document.getElementById("answerChecked44").disabled = true;
        document.getElementById(answerId).disabled = false;    //unlock the correct answer
        answerContent = $(".Answer" + answerNum).val();
        localStorage.setItem('answerContent', answerContent);
    }
    else if (answerId == selectedId) {
        document.getElementById("answerChecked11").disabled = false;    //unlock all the answers
        document.getElementById("answerChecked22").disabled = false;
        document.getElementById("answerChecked33").disabled = false;
        document.getElementById("answerChecked44").disabled = false;
        oneAnswerClick = false;
    }
    else return;
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
function GetQuestions(lessonId, idcourse) {
    ajaxCall("GET", "../api/MultipleChoiceQuestion/get/?lessonId=" + lessonId + "&courseId=" + idcourse, "", successgetQuestions, errorGetC);
}
function GetYesNoQuestions(lessonId, idcourse) {
    ajaxCall("GET", "../api/YesNoQuestion/get/?lessonId=" + lessonId + "&courseId=" + idcourse, "", successgetYesNoQuestions, errorGetC);
}
function successgetQuestions(data) {
    var idc = data[0].CourseId;
    var idl = data[0].LessonId;
    editQuestion = data;
    clearAlll2();
    $("#" + idl).html("");
    document.getElementById(idl).innerHTML += '<li><a href="#" class="options" data-toggle="modal" data-target="#multipleModal">Add New Question</a></li>';
    for (var i = 0; i < data.length; i++) {
        var temp = i + 1;
        if (temp == data.length) {
            if (data[i].QuizTitle != "") {
                var idq = data[i].ID;
                var idt = data[i].QuizTitle;
                var qn = data[i].QuizNum;
                var li = '<li class="dropdown-submenu"><a onclick="TestClick(this)" class="test" tabindex="-1" href="#" style="font-weight: bold; color: black;">' + idt + '<span class="caret"></span></a><ul id="' + data[i].QuizNum + '" class="dropdown-menu"></ul>'
                document.getElementById(idl).innerHTML += li;
                deleteQ = '<input type="image" onclick="deleteQue(' + idq + ')" src="../images/cross-outline.png" style="width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px;"></li>'
                document.getElementById(idl).innerHTML += deleteQ;

                for (var n = 0; n < data.length; n++) {
                    if (data[n].QuizNum == qn) {
                        var l = '<li><a href = "#" value="edit" id="' + n + '"class="options multipleQ ' + data[n].ID + '" data-toggle="modal" data-target="#multipleModalEdit">' + data[n].QuestionTitle + '</a>< input type = "image" onclick = "deleteQue(' + data[n].ID + ')" src = "../images/cross-outline.png" style = "width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px;position: absolute; right: 0; margin-right: 5px;" ></li>'
                        document.getElementById(qn).innerHTML += l;
                    }
                }
            }
            else if (data[i].QuizTitle == "") {
                var idq = data[i].ID;
                var idt = data[i].QuestionTitle;
                var li = '<li id="' + idq + '" class="list - group - item"><a href = "#" value="edit" id="' + i + '"class="options multipleQ ' + idq + '" data-toggle="modal" data-target="#multipleModalEdit">' + idt + '</a><input type="image" onclick="deleteQue(' + idq + ')" src="../images/cross-outline.png" style="width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px; position: absolute; right: 0; margin-right: 5px;"></li>';
                document.getElementById(idl).innerHTML += li;
            }
        }
        else if (data[i].QuizTitle == "") {
            var idq = data[i].ID;
            var idt = data[i].QuestionTitle;
            var li = '<li id="' + idq + '" class="list - group - item"><a href = "#" value="edit" id="' + i + '"class="options multipleQ ' + idq + '" data-toggle="modal" data-target="#multipleModalEdit">' + idt + '</a><input type="image" onclick="deleteQue(' + idq + ')" src="../images/cross-outline.png" style="width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px;position: absolute; right: 0; margin-right: 5px;"></li>';
            document.getElementById(idl).innerHTML += li;
        }
        else if (data[i].QuizNum != data[temp].QuizNum) {
            var idq = data[i].ID;
            var idt = data[i].QuizTitle;
            var qn = data[i].QuizNum;
            var li = '<li class="dropdown-submenu"><a onclick="TestClick(this)" class="test" tabindex="-1" href="#" style="font-weight: bold; color: black;">' + idt + '<span class="caret"></span></a><ul id="' + data[i].QuizNum + '" class="dropdown-menu"></ul></li>'
            document.getElementById(idl).innerHTML += li;
            for (var n = 0; n < data.length; n++) {
                if (data[n].QuizNum == qn) {
                    var l = '<li><a href = "#" value="edit" id="' + n + '"class="options multipleQ ' + data[n].ID + '" data-toggle="modal" data-target="#multipleModalEdit">' + data[n].QuestionTitle + '</a><input type="image" onclick="deleteQue(' + data[n].ID + ')" src="../images/cross-outline.png" style="width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px; position: absolute; right: 0; margin-right: 5px;"></li>'
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
function openQue(quizNum) {
    var idl = localStorage.getItem("fotGetElementById");
    var li = '<ul class="dropdown-menu" aria-labelledby="q' + quizNum + '">';
    for (var i = 0; i < editQuestion.length; i++) {
        if (editQuestion[i].QuizNum == quizNum) {
            li += '<li><a class="dropdown-item" >' + editQuestion[i].QuestionTitle + '</a><input type="image" onclick="deleteQue(' + editQuestion[i].QuizNum + ')" src="../images/cross-outline.png" style="width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px;"></li>';
        }
    }
    li += '</ul>'
    document.getElementById(quizNum).innerHTML += li;
    e.stopPropagation();
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
    document.getElementById(correctId).disabled = false;    //unlock the correct answer
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
function successgetYesNoQuestions(data) {
    var idc = data[0].CourseId;
    var idl = data[0].LessonId;
    editYNQuestion = data;
    clearAll();
    $("#y" + idl).html("");
    document.getElementById("y" + idl).innerHTML += '<li><a href="#" class="options" data-toggle="modal" data-target="#yesNoModal">Add New Question</a></li>';
    for (var i = 0; i < data.length; i++) {
        if (data[i].QuestionTitle != "") {
            var idq = data[i].ID;
            var idt = data[i].QuestionTitle;
            var li = '<li id="y' + idq + '" class="list - group - item"><a href = "#" id="' + i + '"title="' + idq + '" class="options yesNoQ" data-toggle="modal" data-target="#EditYesNoModal">' + idt + '</a><input type = "image" onclick = "deleteYNQue(' + idq + ')" src = "../images/cross-outline.png" style = "width: 10px; border-bottom: 0px; float: right; padding: 8px 0px; padding-right: 0; margin-left: 5px; position: absolute; right: 0; margin-right: 5px;"></li>';
            document.getElementById("y" + idl).innerHTML += li;
        }
    }
    localStorage.setItem("idYesNoq", idq);
}
function EditYesNoQuestion() {
    var d = new Date();
    d.toString();
    Content = $("#yesNoQue1").val();
    QuestionTitle = $("#yesNoQueTitle1").val();
    if ($("input[name='choice']:checked").val() == 1) {
        CorrectAnswer = true
    }
    else CorrectAnswer = false;
    UploadDate = d;
    var idq = YNQid;
    let str = "../api/YesNoQuestion?Qid=" + idq + "&content=" + Content + "&questionTitle=" + QuestionTitle + "&correctAnswer=" + CorrectAnswer + "&uploadDate=" + UploadDate;
    ajaxCall("POST", str, "", updateSuccess, error);
}
function EditMultipleQuestion() {
    var correctAnswerContent = localStorage.getItem('answerContent');
    var d = new Date();
    //d.toString();
    Content = $("#MultipleQue1").val();
    QuestionTitle = $("#QuestionTitle1").val();
    Answer1Content = $(".Answer1").val();
    Answer2Content = $(".Answer2").val();
    Answer3Content = $(".Answer3").val();
    Answer4Content = $(".Answer4").val();
    Timer = $('.limit').val();
    UploadDate = d;
    updateMultiQ = {
        ID: quesID,
        QuestionContent: Content,
        QuestionTitle: QuestionTitle,
        Timer: Timer,
        UploadDate: UploadDate,
        Answer1Content: Answer1Content,
        Answer2Content: Answer2Content,
        Answer3Content: Answer3Content,
        Answer4Content: Answer4Content,
        correctAnswer: correctAnswerContent
    }
    ajaxCall("PUT", "../api/MultipleChoiceQuestion", JSON.stringify(updateMultiQ), updateSuccess2, error);
}
function updateSuccess2() {
    LId = lessonId;
    CId = courseId2;
    GetQuestions(LId, CId);
}
function updateOrDeleteTopic() {
    getLesson(courseId2);
    done = '<button type="button" class="btn btn-success" onclick="getLesson(' + courseId2 + ')" style="float: right; border-color: #d8d8da; background-color: #f8f9fe;">Done</button>'
    document.getElementById("showBtn").innerHTML += done;
    for (var i = 0; i < lessons.length; i++) {
        var pic1 = "";
        pic1 = '<input type="image" onclick="deleteTopic(' + lessons[i].LessonId + ')" src="../images/cross-outline.png" style="width: 20px; border-bottom: 0px; float: right; padding: 10px 0px; padding-right: 0; margin-left: 5px;"><input type="image" id=' + i + ' class="editTopic" data-toggle="modal" data-target="#updateLessonTopic" src="../images/edit.png" style="width: 20px; border-bottom: 0px; float: right; padding: 10px 0px; padding-right: 0;">'
        document.getElementById("l"+i).innerHTML += pic1;
    }
}
function deleteTopic(lessId) {
    ajaxCall("POST", "../api/Lesson/?lessonId=" + lessId + "&courseId=" + courseId2, "", "", "");

    getLesson(courseId2);
    updateOrDeleteTopic();
}
function UpdateLesson() {
    Topic = $("#EditTopicName").val();
    Info = $("#EditTopicInfo").val();
    Time = $("#EditTopicTime").val();
    ajaxCall("PUT", "../api/Lesson/?lessonId=" + lessonId + "&courseId=" + courseId2 + "&lessonName=" + Topic + "&lessonInfo=" + Info + "&lessonTime=" + Time, "", "", "");

    getLesson(courseId2);
    updateOrDeleteTopic();
}
$(document).on('click', '.editTopic', function (e) {
    $('#EditTopicName').attr('value', lessons[e.target.id].LessonName);
    $('#EditTopicInfo').attr('value', lessons[e.target.id].Info);
    $('#EditTopicTime').attr('value', lessons[e.target.id].TimeStampLesson);
});
function updateOrDeleteCourse() {
    GetCourse();
    done = '<button type="button" class="btn btn-success" onclick="GetCourse()" style="border-color: #d8d8da; background-color: #f8f9fe;">Done</button>'
    document.getElementById('myCourses').innerHTML += done;

    for (var j = 0; j < courses.length; j++) {
        pic = '<input type="image" id=' + j + ' class="editCourse ' + courses[j].CourseId + '" data-toggle="modal" data-target="#updateCourseInfo" src="../images/edit.png" style="width: 20px; border-bottom: 0px; float: left; padding: 10px 0px; padding-right: 0;"><input type="image" onclick="deleteCourse(' + courses[j].CourseId + ')" src="../images/cross-outline.png" style="width: 20px; border-bottom: 0px; float: left; padding: 10px 0px; padding-right: 0; margin-left: 5px;">'
        document.getElementById(courses[j].CourseId).innerHTML += pic;
    }
}
function deleteCourse(CourseId) {
    ajaxCall("POST", "../api/Course/?courseId=" + CourseId, "", "", "");

    GetCourse();
    updateOrDeleteCourse();
}
function UpdateCourse() {
    Topic = $("#EditCourseName").val();
    Info = $("#EditCourseInfo").val();
    ajaxCall("PUT", "../api/Course/?courseId=" + CId + "&courseName=" + Topic + "&courseInfo=" + Info, "", "", "");

    GetCourse();
    updateOrDeleteCourse();
}
$(document).on('click', '.editCourse', function (e) {
    $('#EditCourseName').attr('value', courses[e.target.id].CourseName);
    $('#EditCourseInfo').attr('value', courses[e.target.id].Info);
    CId = e.target.classList[1];
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
            Type: "Lecturer",
            Userpassword: Pass,
            Img: p.Img
        }
        ajaxCall("PUT", "../api/Person", JSON.stringify(Person), updateSuccess3, error);
    }
    else {
        swal("Oops", "Your password dosen't match!", "error");
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

//changed
function deleteQue(idQuestion) {
    ajaxCall("PUT", "../api/MultipleChoiceQuestion/?questionId=" + idQuestion, "", "", "");
    updateSuccess2();
}

function deleteYNQue(idQuestion) {
    ajaxCall("PUT", "../api/YesNoQuestion/?questionId=" + idQuestion, "", "", "");
    updateSuccess2();
}