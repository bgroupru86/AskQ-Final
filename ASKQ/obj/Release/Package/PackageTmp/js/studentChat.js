//import { rename } from "fs";

var noCounter = 0;
var yesCounter = 0;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
var idtemp = 0;
answerSelected = null;

$(document).ready(function () {
    lesCode = localStorage.lessonCode;
    p = JSON.parse(localStorage.person);
    studenId = p.Id;
    render();
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

var yesNoQ = firebase.database().ref("/yesNoQ");
lesAndCourse = firebase.database().ref("/lessonAndCourse");
yesNoQ.on('child_changed', function () {
    yesNoQ.once("value", function (snapshot) {
        idQ = snapshot.val().idQ;
        contentQ = snapshot.val().content;

    });
    lesAndCourse.once("value", function (snapshot) {
        lessonId = snapshot.val().lesson;
        courseId = snapshot.val().course;
    });
});

checkYesNo = firebase.database().ref("/YesNo");
checkYesNo.on('child_changed', function (snapshot) {
    checkYesNo.on('value', function (snapshot) {
        state33 = snapshot.val();
    });
    if (state33.state === "false") {
        var str = '<div id="yesNoS"><div><p><h1 dir="rtl">' + contentQ + '</h1></p></div><button style="background:green" class="btn btn-light btn-circle btn-circle-xl m-1" type="button" value="yes" id="yes" onclick="addClick(this)"><i class="fa fa-check"></i></button><button style="background:#da3948" type="button" class="btn btn-light btn-circle btn-circle-xl m-1" value="no" id="no" onclick="addClick(this)"><i class="fa fa-remove"></i></button></div>';
        $('#chat').html("");
        $('#chat').append(str);
    }
    else {
        render();
    }
});
var count = firebase.database().ref("/countReal");
count.on('child_changed', function () {
    count.once("value", function (snapshot) {
        yesCounter = snapshot.val().yesCount;
        noCounter = snapshot.val().noCount;
    });
});
function addClick(event) {

    if (event.id == "no") {
        count.update(({ 'noCount': noCounter+1 }));
        $('#yes').attr("disabled", true);
        $('#no').attr("disabled", true);
        showResults();
    }
    else if (event.id == "yes") {
        count.update(({ 'yesCount': yesCounter+1 }));
        $('#yes').attr("disabled", true);
        $('#no').attr("disabled", true);
        showResults();
    }
}
function showResults() {
    var d = new Date();
    d.toString();
    YesNoQuestion = {
        Content: contentQ,
        UploadDate: d,
        YesCounter: yesCounter,
        NoCounter: noCounter,
        RealTimeQuestionId: idQ,
        courseId: courseId,
        lessonId: lessonId
    }
    ajaxCall("POST", "../api/YesNoQuestion", JSON.stringify(YesNoQuestion), successLog, errorLog);
}
function sendChatMessage() {
    realTimeAns.on("value", function (snapshot) {
        checkRealTimeAns = snapshot.val().state;
    });
    if (checkRealTimeAns === "false") {
        messageField = $("#ques").val();
        ref = firebase.database().ref("/chat");
        ref.push().set({
            message: messageField,
        });
        addQuestion(messageField);
    }
    else {
        var refContent2 = firebase.database().ref("/contentAns");
        refContent2.on('value', function (snapshot) {
            idAns = snapshot.val().id;
        });
        ref22 = firebase.database().ref("/Answers");
        messageField = $("#ques").val();
        ref22.push().set({
            message: messageField,
        });
        addAnswer(messageField, idAns);
    }
}
function addAnswer(messageField, idAns) {
    //swal("You Send Answer", messageField, "success");
    Answer = {
        content: messageField,
        questionId: idAns,
        lessonCode: lesCode,
        studentId: studenId
    }
    ajaxCall("POST", "../api/studentsAnswers/post", JSON.stringify(Answer), successLog, errorLog);
}
ref4 = firebase.database().ref("/chat");
ref4.on("child_added", function render7() {
    render();
});
function addQuestion(messageField) {
    var que = messageField;
    var d = new Date();
    d.toString();
    Question = {
        Content: que,
        LessonCode: lesCode,
        StudentId: studenId
    }
    ajaxCall("POST", "../api/RealTimeQuestion/post", JSON.stringify(Question), successLog, errorLog);
}
function successLog() {
    $('#ques').val("");
    render();
}
function render() {
    $('#chat').html("");
    $('#clock').html("");
    $('.card-footer').html('<div class="input-group"><textarea id="ques" name="" class="form-control type_msg" placeholder="Type your message..."></textarea><div onclick="sendChatMessage()" class="input-group-append"><span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span></div></div>'); 
    ajaxCall("GET", "../api/RealTimeQuestion/get/?lessonCode=" + lesCode, "", success, error);
}
function errorLog() {
    alert("Error log");
}
function success(messages) {
    for (i = 0; i < messages.length; i++) {
        AddMessage(messages[i]);
    }
    ajaxCall("GET", "../api/StudentLikes/?studentId=" + studenId, "", successCheckStudentLike, errorLike);
}
function successCheckStudentLike(data) {
    for (var i = 0; i < data.length; i++) {
        idq = data[i].QuestionId;
        $("#likeP" + idq).attr('src', '../images/like_black.png');
    }
}
function error(err) {
    console.log(JSON.stringify(err));
    alert("EROR: " + JSON.stringify(err));
}
function AddMessage(message) {
    var divChat;
    if (message.studentId === studenId) {
        divChat = '<li style="width:100%; padding-right: 5px;"><div id="text_wrapperr" class="text_wrapper_right msj-rta macro text text-r"><p dir="rtl" style="padding-right: 3px;">' + message.Content + '</p><small><img id="likeP' + message.ID + '" onClick="PutLike(' + message.ID + ',' + studenId + ')" src="../images/like.png" width="17px" height="17px" style="float: left; margin-top: 8px;"></small><p id="numlikes" class="counter-count" style="margin-bottom: 0px;">' + message.likeCounter + '</p></div></li>';
    }
    else {
        divChat = '<li style="width:100%; padding-left: 5px;"><div id="text_wrapperr" class="text_wrapper_left msj macro text text-l"><p dir="rtl">' + message.Content + ' </p><small><img id="likeP' + message.ID + '" onClick="PutLike(' + message.ID + ',' + studenId + ')" src="../images/like.png" width="17px" height="17px" style="float: left; margin-top: 8px;"></small><p id="numlikes" class="counter-count" style="margin-bottom: 0px;">' + message.likeCounter + '</p></div></li>';
    }
    $('#chat').append(divChat);
    var height = $('#chat')[0].scrollHeight;
    $('#chat').scrollTop(height);
}
function PutLike(idm, ids) {
    ajaxCall("GET", "../api/StudentLikes/?questionId=" + idm + "&studentId=" + ids, "", successLike, errorLike);
}
function successLike(data) {
    var likenum = data.Count;
    var sid = data.StudentId;
    var qid = data.QuestionId;
    if (sid === null) {
        likenum = likenum + 1;
        addlike = {
            questionId: qid,
            studentId: studenId,
            count: likenum
        }     
        ajaxCall("POST", "../api/StudentLikes", JSON.stringify(addlike), successAddLike, errorLike);
    }
    else {
        likenum = likenum - 1;
        addlike = {
            questionId: qid,
            studentId: studenId,
            count: likenum
        }
        ajaxCall("DELETE", "../api/StudentLikes", JSON.stringify(addlike), successRemoveLike, errorLike);
    }
}
function errorLike() {
    alert("error like");
}
function successAddLike() {
   var check = firebase.database().ref("/checkChange");
    check.once("value", function (snapshot) {
        what = snapshot.val().state;
    });
    if (what=="false") {
        check.update(({ 'state': "true" }));
        render();

    }   
    else {
        check.update(({ 'state': "false" }));
        render();

    }
}
function successRemoveLike() {
    var check = firebase.database().ref("/checkChange");
    check.once("value", function (snapshot) {
        what = snapshot.val().state;
    });
    if (what == "false") {
        check.update(({ 'state': "true" }));
        render();

    }
    else {
        check.update(({ 'state': "false" }));
        render();

    }
}
check2 = firebase.database().ref("/checkChange");
check2.on('child_changed', function () { render(); });
function backToLogin() {
    ajaxCall("DELETE", "../api/StudentInLesson/?studentId=" + studenId + "&lessonCode=" + lesCode, "", successLogOut, error);
}
function successLogOut() {
    window.location.href = "loginLesson.html";
}

var realTimeAns = firebase.database().ref("/isTextLocked");
var refContent = firebase.database().ref("/contentAns");
refContent.on('value', function (snapshot) {
    qContent = snapshot.val().content;
});
realTimeAns.on('child_changed', function (snapshot) {
    realTimeAns.on('value', function (snapshot) {
        state = snapshot.val();
    });
    if (state.state === "true") {
        $('#chat').html("");
        var str = '<div id="yesNoS"><div><p><h1 dir="rtl">' + qContent + '</h1></p></div>';
        $('#chat').append(str);
    }
    if (state.state === "false") {
        render();
    }
});
var startMulti = firebase.database().ref("/startMulti");
var refMulti = firebase.database().ref("/multiDetail");
refMulti.on('value', function (snapshot) {
    multiContent = snapshot.val().content;
    idQues = snapshot.val().id;
    correctAns = snapshot.val().correctAns;
    answer1 = snapshot.val().answer1;
    answer2 = snapshot.val().answer2;
    answer3 = snapshot.val().answer3;
    answer4 = snapshot.val().answer4;
    time = snapshot.val().time;
    time= ((time) / 1000);
});

startMulti.on('child_changed', function (snapshot) {
    startMulti.on('value', function (snapshot) {
        state = snapshot.val();
    });
    if (state.state === "true" && idtemp !== idQues) {
        var idtemp = idQues;
        $('#chat').html("");
        $(".card-footer").html("");
        $('.card-footer').css({
            'border-color': '#f8f8f8',
            'background': '#f8f8f8',
        })
        var timer = firebase.database().ref("/timerMulti");
        timer.on('value', function (snapshot) {
            seconds = snapshot.val().timer;
        });
        x = setInterval(function () {
            $('#clock').html("<p>" + seconds + "s </p>");

            // If the count down is over, write EXPIRED
            if (seconds <= 0) {
                clearInterval(x);
                if (answerSelected == null)
                {
                    img = '<img src="../images/late.png" / style="width: 50px; float: right; position: absolute; margin-left: -20px;">'
                    $("#clock").html(img);
                }
                else if (correctAns != answerSelected) {
                    imgSad = '<img src="../images/sad.png" / style="width: 50px; float: right; position: absolute; margin-left: -20px;">'
                    $('#clock').html(imgSad);
                }
                else if (correctAns == answerSelected) {
                    imgHappy = '<img src="../images/good.png" / style="width: 50px; float: right; position: absolute; margin-left: -20px;">'
                    $("#clock").html(imgHappy);
                }

                answerSelected = null;

                if (correctAns == answer1) {
                    img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                    $("#awnser1Kahoot").append(img)
                }
                else if (correctAns == answer2) {
                    img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                    $("#awnser2Kahoot").append(img)
                }
                else if (correctAns == answer3) {
                    img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                    $("#awnser3Kahoot").append(img)
                }
                else if (correctAns == answer4) {
                    img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                    $("#awnser4Kahoot").append(img)
                }
                $('#awnser1Kahoot').prop("disabled", true);
                $('#awnser2Kahoot').prop("disabled", true);
                $('#awnser3Kahoot').prop("disabled", true);
                $('#awnser4Kahoot').prop("disabled", true);
            }

        }, 1000);
        li = '<div id="yesNoS"><div><p><h1 dir="rtl">' + multiContent + '</h1></p></div>';
        li += '<div id="q1"><button onclick="checkAns(this)" id="awnser1Kahoot" class="btnK 1" style="font-size: x-large; background-color: #8829d9;">' + answer1 + '</button><button onclick="checkAns(this)" id="awnser2Kahoot" class="btnK 2" style="font-size: x-large; background-color: #4853cf;">' + answer2 + '</button>'
        if (answer3 != "") {
            li += '<button id="awnser3Kahoot" onclick="checkAns(this)" class="btnK 3" style="font-size: x-large; background-color: #d14a4a;">' + answer3 + '</button>'

        }
        if (answer4 != "") {
            li += '<button id="awnser4Kahoot" onclick="checkAns(this)" class="btnK 4" style="font-size: x-large; background-color: #3aab6c;">' + answer4 + '</button>'

        }
        li += '</div>'
        $('#chat').append(li);
    }

    if (state.state === "false") {
        render();
    }
});

var countMulti = firebase.database().ref("/countMulti");
countMulti.on('child_changed', function () {
    countMulti.once("value", function (snapshot) {
        count1 = snapshot.val().count1;
        count2 = snapshot.val().count2;
        count3 = snapshot.val().count3;
        count4 = snapshot.val().count4;
    });
});
function checkAns(e) {

    answerId = e.id;
    document.getElementById("awnser1Kahoot").disabled = true;    //lock all the answers
    document.getElementById("awnser2Kahoot").disabled = true;
    document.getElementById("awnser3Kahoot").disabled = true;
    document.getElementById("awnser4Kahoot").disabled = true;
    $('#' + answerId).css({ 'box-shadow': '0 5px 10px 0 rgba(0, 0, 0, 0.58), 0 9px 10px 0 rgba(0, 0, 0, 0.62)' });


    answerSelected = e.innerHTML;
    idSelect = e.id;
    if (idSelect == 'awnser1Kahoot') {
        countMulti.update(({ 'count1': count1 + 1 }));
    }
    else if (idSelect == 'awnser2Kahoot') {
        countMulti.update(({ 'count2': count2 + 1 }));
    }
    else if (idSelect == 'awnser3Kahoot') {
        countMulti.update(({ 'count3': count3 + 1 }));
    }
    else if (idSelect == 'awnser4Kahoot') {
        countMulti.update(({ 'count4': count4 + 1 }));
    }
}
