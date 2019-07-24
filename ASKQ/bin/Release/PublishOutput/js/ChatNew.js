var yesCount = 0;
var noCount = 0;
var QuestionId;
var QuestionContent = "";
var oneClick = false;
var x;
var lockTextBox;
var tempScrollTop;
var selectedId;
var lessonId;
var courseId;
var editQuestion;
var editYNQuestion;
var c;
var dataQ = [];
var ans1;
var ans2;
var ans3;
var ans4;
var what2 = true;


$(document).ready(function () {
    toChat = JSON.parse(localStorage.toChat);
    lessonId = toChat.LessonId;
    courseId = toChat.CourseId;
    //lessonId = 39;
    //courseId = 43;
    lessonCode = toChat.LessonCode;
    document.getElementById('lessoncode').innerHTML = "Lesson Code: " + lessonCode;
    render();
    GetFiles(courseId, lessonId);

    multipleB = '<div class="btn-group"><button title="Multiple Choice Question" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" onclick="GetQuestions(' + lessonId + ',' + courseId + ')" style="margin: 5px; font-family: Assistant, sans-serif; background-color: #75c9c8cf; border-color: #75c9c8cf;"> MULTI <span class="caret"></span></button><ul id="' + lessonId + '" class="dropdown-menu" role="menu"></ul></div>'
    YesNoB = '<div class="btn-group"><button title="Yes / No Question" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" onclick="GetYNQuestions(' + lessonId + ',' + courseId + ')" style="margin: 5px; font-family: Assistant, sans-serif; background-color: #75c9c8cf; border-color: #75c9c8cf;"> Y / N <span class="caret"></span></button><ul id="y' + lessonId + '" class="dropdown-menu" role="menu"></ul></div>'
    EndLessonB = '<div class="btn-group"><button title="End Lesson" type="button" class="btn btn-success" onclick="endLesson()" style="width: 65px; margin: 5px; background-color: #d14a4a; border-color: #d14a4a;"> <img src="../images/logout.png" / style="width: 20px;"> </button></div>'
 
    document.getElementById("btnDiv").innerHTML += multipleB;
    document.getElementById("btnDiv").innerHTML += YesNoB;
    document.getElementById("btnDiv").innerHTML += EndLessonB;

});
$(".container").click(function () {
    $("#omer").removeClass("show");
});
function GetQuestions(lessonId, courseId) {
    ajaxCall("GET", "../api/MultipleChoiceQuestion/get/?lessonId=" + lessonId + "&courseId=" + courseId, "", successgetQuestions, errorEndLes);
}
function GetYNQuestions(lessonId, courseId) {
    ajaxCall("GET", "../api/YesNoQuestion/get/?lessonId=" + lessonId + "&courseId=" + courseId, "", successgetYesNoQuestions, errorEndLes);
} 
function successgetQuestions(data) {
    var idc = data[0].CourseId;
    var idl = data[0].LessonId;
    editQuestion = data;
    $("#" + idl).html("");
    for (var i = 0; i < data.length; i++) {
        var temp = i + 1;
        if (temp == data.length) {
            if (data[i].QuizTitle != "") {
                var idq = data[i].ID;
                var idt = data[i].QuizTitle;
                var qn = data[i].QuizNum;
                var li = '<li dir="rtl" class="dropdown-submenu"><a onclick="kahootQuiz(this)" class="test ' + data[i].QuizNum + '" tabindex="-1" href="#" style="font-weight: bold; color: black; font-family: "Assistant", sans-serif";>' + idt + '<span class="caret"></span></a><ul id="' + data[i].QuizNum + '" class="dropdown-menu"></ul></li>'
                document.getElementById(idl).innerHTML += li;
            }
            else if (data[i].QuizTitle == "") {
                var idq = data[i].ID;
                var idt = data[i].QuestionTitle;
                var li = '<li dir="rtl" id="' + idq + '" class="list - group - item"><a onclick="kahoot(this)" href ="#" value="edit" id="' + i + '"class="options multipleQ ' + idq + '">' + idt + '</a></li>';
                document.getElementById(idl).innerHTML += li;
            }
        }
        else if (data[i].QuizTitle == "") {
            var idq = data[i].ID;
            var idt = data[i].QuestionTitle;
            var li = '<li dir="rtl" id="' + idq + '" class="list - group - item"><a onclick="kahoot(this)" href = "#" value="edit" id="' + i + '"class="options multipleQ ' + idq + '">' + idt + '</a></li>';
            document.getElementById(idl).innerHTML += li;
        }
        else if (data[i].QuizNum != data[temp].QuizNum) {
            var idq = data[i].ID;
            var idt = data[i].QuizTitle;
            var qn = data[i].QuizNum;
            var li = '<li dir="rtl" class="dropdown-submenu"><a onclick="kahootQuiz(this)" class="test ' + data[i].QuizNum + '" tabindex="-1" href="#" style="font-weight: bold; color: black; font-family: "Assistant", sans-serif";">' + idt + '<span class="caret"></span></a><ul id="' + data[i].QuizNum + '" class="dropdown-menu"></ul></li>'
            document.getElementById(idl).innerHTML += li;
        }
    }
    localStorage.setItem("idMultipleq", idq);
    localStorage.setItem("fotGetElementById", idl);
}
function successgetYesNoQuestions(data) {
    var idc = data[0].CourseId;
    var idl = data[0].LessonId;
    editYNQuestion = data;
    $("#y" + idl).html("");
    for (var i = 0; i < data.length; i++) {
        if (data[i].QuestionTitle != "") {
            var idq = data[i].ID;
            var idt = data[i].QuestionTitle;
            var li = '<li dir="rtl" id="y' + idq + '" class="list - group - item"><a onclick="kahootYN(this)" href = "#" id="' + i + '"title="' + idq + '" class="options yesNoQ">' + idt + '</a></li>';
            document.getElementById("y" + idl).innerHTML += li;
        }
    }
}
function kahoot(e) {
    restartFireBase();
    data = editQuestion[e.id]

    refMulti.update(({ 'id': data.ID }));
    refMulti.update(({ 'time': data.Timer }));
    refMulti.update(({ 'content': data.QuestionContent }));
    refMulti.update(({ 'correctAns': data.CorrectAnswer }));
    refMulti.update(({ 'answer1': data.Answer1Content }));
    refMulti.update(({ 'answer2': data.Answer2Content }));
    refMulti.update(({ 'answer3': data.Answer3Content }));
    refMulti.update(({ 'answer4': data.Answer4Content }));
    countMulti = firebase.database().ref("/countMulti");
    countMulti.update(({ 'count1': 0 }));
    countMulti.update(({ 'count2': 0 }));
    countMulti.update(({ 'count3': 0 }));
    countMulti.update(({ 'count4': 0 }));
    startMulti.update(({ 'state': "true" }));


    clearInterval(x);
    $('.showfiles').html("");
    $('#divLecturerWindow').html("");
    $('#chartContainer').html("");
    $(".clock").html("");

    var seconds = ((data.Timer) / 1000) + 1;
    var timer = firebase.database().ref("/timerMulti");

    $(".centered").html('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
    $(".centered").append("<p>" + data.QuestionContent + "</p>");

    li = '<div id="q1"><button id="awnser1Kahoot" class="btnK" style="font-size: x-large; background-color: #8829d9;">' + data.Answer1Content + '</button><button id="awnser2Kahoot" class="btnK" style="font-size: x-large; background-color: #4853cf;">' + data.Answer2Content + '</button>'
    if (data.Answer3Content != "") {
        li += '<button id="awnser3Kahoot" class="btnK" style="font-size: x-large; background-color: #d14a4a;">' + data.Answer3Content + '</button>'

    }
    if (data.Answer4Content != "") {
        li += '<button id="awnser4Kahoot" class="btnK" style="font-size: x-large; background-color: #3aab6c;">' + data.Answer4Content + '</button>'

    }
    li += '</div>'
    $('#divLecturerWindow').append(li);

    //Update the timer down every 1 second
    x = setInterval(function () {
        seconds = seconds - 1;
        timer.update(({ 'timer': seconds }));
        timer.on('value', function (snapshot) {
            seconds = snapshot.val().timer;
        });
        $(".clock").html("<br/><p>" + seconds + "s </p>");
        // If the count down is over, write EXPIRED
        if (seconds <= 0) {
            clearInterval(x);
            $(".clock").html("<p> EXPIRED! </p>");
            if (data.CorrectAnswer == data.Answer1Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser1Kahoot").append(img)
            }
            else if (data.CorrectAnswer == data.Answer2Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser2Kahoot").append(img)
            }
            else if (data.CorrectAnswer == data.Answer3Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser3Kahoot").append(img)
            }
            else if (data.CorrectAnswer == data.Answer4Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser4Kahoot").append(img)
            }
            ajaxCall("GET", "../api/MultipleChoiceQuestion/?QuestionId=" + data.ID, "", successKahootChart, error);
        }
    }, 1000);
    var countMulti2 = firebase.database().ref("/countMulti");
    countMulti2.on("value", function (snapshot) {
        ans1 = snapshot.val();
    });
    countMulti2.on("value", function (snapshot) {
        ans2 = snapshot.val();
    });
    countMulti2.on("value", function (snapshot) {
        ans3 = snapshot.val();
    });
    countMulti2.on("value", function (snapshot) {
        ans4 = snapshot.val();
    });
}
function successKahootChart(data) {
    lio = '<div id="q1"><button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans1.count1 + '</button><button id="awnser2Kahoot" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans2.count2 + '</button>'
    lis = '<div id="q1"><button id="awnser1KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #8829d9"></button><button id="awnser2KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #4853cf"></button>'
    if (data[0].Answer3Content != "") {
        lio += '<button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans3.count3 + '</button>'
        lis += '<button id="awnser3KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #d14a4a;"></button>'
    }
    if (data[0].Answer4Content != "") {
        lio += '<button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans4.count4 + '</button>'
        lis += '<button id="awnser4KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #3aab6c;"></button>'
    }
    li += '</div></div>'
    $('.clock').html(lio + lis);

    if (data[0].CorrectAnswer == data[0].Answer1Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser1KahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == data[0].Answer2Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser2KahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == data[0].Answer3Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser3KahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == data[0].Answer4Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser4KahootChart").append(img)
    }
}

function kahootYN(e) {
    restartFireBase();
    data = editYNQuestion[e.id]

    yesNo = firebase.database().ref("/yesNoQ");
    count = firebase.database().ref("/countReal");
    yesNo.update(({ 'idQ': data.ID }));
    yesNo.update(({ 'content': data.Content }));
    count.update(({ 'yesCount': 0 }));
    count.update(({ 'noCount': 0 }));
    ref4.update(({ 'state': "false" }));

    clearInterval(x);
    $('.showfiles').html("");
    $('#divLecturerWindow').html("");
    $('#chartContainer').html("");
    $(".clock").html("");

    var seconds = 11;
    $(".centered").html('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
    $(".centered").append("<p>" + data.Content + "</p>");

    li = '<div id="q1"><button id="YesAnswer" class="btnK" style="font-size: x-large; background-color: green;"> Yes </button><button id="NoAnswer" class="btnK" style="font-size: x-large; background-color: #da3948;"> No </button></div>'
    $('#divLecturerWindow').append(li);

    //Update the timer down every 1 second
    x = setInterval(function () {
        seconds = seconds - 1;
        $(".clock").html("<br/><p>" + seconds + "s </p>");
        // If the count down is over, write EXPIRED
        if (seconds <= 0) {
            clearInterval(x);
            $(".clock").html("<p> EXPIRED! </p>");
            if (data.CorecctAnswer == '1') {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#YesAnswer").append(img)
            }
            else if (data.CorecctAnswer == '0') {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#NoAnswer").append(img)
            }
            ref4.update(({ 'state': "true" }));
            ajaxCall("GET", "../api/YesNoQuestion/?QuestionId=" + data.ID, "", successYNKahootChart, error);
        }
    }, 1000);
    count.on("value", function (snapshot) {
        yesNoCount = snapshot.val();
    });
}
function successYNKahootChart(data) {
    yesCount = yesNoCount.yesCount;
    noCount = yesNoCount.noCount;
    lio = '<div id="q1"><button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + yesCount + '</button><button id="awnser2Kahoot" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + noCount + '</button>'
    lis = '<div id="q1"><button id="YesAnswerKahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: green"></button><button id="NoAnswerKahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #da3948"></button>'

    li += '</div></div>'
    $('.clock').html(lio + lis);

    if (data[0].CorrectAnswer == '1') {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#YesAnswerKahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == '0') {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#NoAnswerKahootChart").append(img)
    }
    ref4.update(({ 'state': "true" }));

}
function kahootQuiz(event) {

    c = 0;
    clearInterval(x);

    $('.showfiles').html("");
    $('#divLecturerWindow').html("");
    $('#chartContainer').html("");
    $('.centered').html("");
    $(".clock").html("");

    data = editQuestion;
    for (var j = 0; j < data.length; j++) {
        if (data[j].QuizNum == event.classList[1]) {
            dataQ.push(data[j]);
        }
    }

    $(".centered").append('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
    $("#divLecturerWindow").append('<p style="text-align: center; font-size: -webkit-xxx-large; ">' + event.text + '</p>');
    $("#divLecturerWindow").append('<div class="btn-group"><button type="button" class="btn btn-success" data-toggle="dropdown" onclick="startQ(' + event.classList[1] +')" style="margin: 5px; font - family: "Assistant", sans - serif; "> Lets start! </button></div>');

}
function startQ(quizId) {

    refMulti.update(({ 'id': dataQ[c].ID }));
    refMulti.update(({ 'time': dataQ[c].Timer }));
    refMulti.update(({ 'content': dataQ[c].QuestionContent }));
    refMulti.update(({ 'correctAns': dataQ[c].CorrectAnswer }));
    refMulti.update(({ 'answer1': dataQ[c].Answer1Content }));
    refMulti.update(({ 'answer2': dataQ[c].Answer2Content }));
    refMulti.update(({ 'answer3': dataQ[c].Answer3Content }));
    refMulti.update(({ 'answer4': dataQ[c].Answer4Content }));
    countMulti = firebase.database().ref("/countMulti");
    countMulti.update(({ 'count1': 0 }));
    countMulti.update(({ 'count2': 0 }));
    countMulti.update(({ 'count3': 0 }));
    countMulti.update(({ 'count4': 0 }));
    startMulti.update(({ 'state': "true" }));
    if (c>0) {
        var check = firebase.database().ref("/startMulti");
        check.on("value", function (snapshot) {
            what2 = snapshot.val().state1;
        });
        if (what2 == "false") {
            check.update(({ 'state1': "true" }));
        }
        else {
            check.update(({ 'state1': "false" }));
        }
    }

    clearInterval(x);
    $('.showfiles').html("");
    $('#divLecturerWindow').html("");
    $('#chartContainer').html("");
    $('.centered').html("");
    $(".clock").html("");

    var timer = firebase.database().ref("/timerMulti");
    var seconds = ((data[c].Timer) / 1000) + 1;

    $(".centered").html('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
    $(".centered").append('<p style="width:74%; float:left">  ' + dataQ[c].QuestionContent + "</p>");
    nextQuestion = '<button type="button" class="btn btn-success" onclick="nextQ(' + quizId + ')"" style="margin: 5px; font-family: "Assistant", sans-serif; background-color: #75c9c8cf; border-color: #75c9c8cf; float: right;"> Next Question </button><ul id="' + lessonId + '" class="dropdown-menu" role="menu"></ul>'
    $(".centered").append(nextQuestion);

    li = '<div id="q1"><button id="awnser1Kahoot" class="btnK" style="font-size: x-large; background-color: #8829d9;">' + dataQ[c].Answer1Content + '</button><button id="awnser2Kahoot" class="btnK" style="font-size: x-large; background-color: #4853cf;">' + dataQ[c].Answer2Content + '</button>'
    if (dataQ[c].Answer3Content != "") {
        li += '<button id="awnser3Kahoot" class="btnK" style="font-size: x-large; background-color: #d14a4a;">' + dataQ[c].Answer3Content + '</button>'
    }
    if (dataQ[c].Answer4Content != "") {
        li += '<button id="awnser4Kahoot" class="btnK" style="font-size: x-large; background-color: #3aab6c;">' + dataQ[c].Answer4Content + '</button>'
    }
    li += '</div>'
    $('#divLecturerWindow').append(li);

    //Update the timer down every 1 second
    x = setInterval(function () {
        seconds = seconds - 1;
        timer.update(({ 'timer': seconds }));
        timer.on('value', function (snapshot) {
            seconds = snapshot.val().timer;
        });
        $(".clock").html("<br/><p>" + seconds + "s </p>");
        // If the count down is over, write EXPIRED
        if (seconds <= 0) {
            clearInterval(x);
            $(".clock").html("<p> EXPIRED! </p>");
            if (dataQ[c].CorrectAnswer == dataQ[c].Answer1Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser1Kahoot").append(img)
            }
            else if (dataQ[c].CorrectAnswer == dataQ[c].Answer2Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser2Kahoot").append(img)
            }
            else if (dataQ[c].CorrectAnswer == dataQ[c].Answer3Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser3Kahoot").append(img)
            }
            else if (dataQ[c].CorrectAnswer == dataQ[c].Answer4Content) {
                img = '<img src="../images/check-mark.png" / style="width: 30px; float: right; position: absolute; margin-left: inherit;">'
                $("#awnser4Kahoot").append(img)
            }
            ajaxCall("GET", "../api/MultipleChoiceQuestion/?QuestionId=" + dataQ[c].ID, "", successKahootQuizChart, error);
        }
    }, 1000);
    var countMulti2 = firebase.database().ref("/countMulti");
    countMulti2.on("value", function (snapshot) {
        ans1 = snapshot.val();
    });
    countMulti2.on("value", function (snapshot) {
        ans2 = snapshot.val();
    });
    countMulti2.on("value", function (snapshot) {
        ans3 = snapshot.val();
    });
    countMulti2.on("value", function (snapshot) {
        ans4 = snapshot.val();
    });
}
function nextQ(quizId) {

    temp = c + 1;
    if (temp != dataQ.length) {
        c++;
        startQ(quizId);
    }
    else {
        clearInterval(x);
        c = 0;
        $('.showfiles').html("");
        $('#divLecturerWindow').html("");
        $('#chartContainer').html("");
        $('.centered').html("");
        $(".clock").html("");

        $(".centered").html('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
        $(".centered").append("<p> The Quiz Is Done </p>");
        restartFireBase();
    }
}
function successKahootQuizChart(data) {
    lio = '<div id="q1"><button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans1.count1 + '</button><button id="awnser2Kahoot" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans2.count2 + '</button>'
    lis = '<div id="q1"><button id="awnser1KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #8829d9"></button><button id="awnser2KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #4853cf"></button>'
    if (data[0].Answer3Content != "") {
        lio += '<button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans3.count3 + '</button>'
        lis += '<button id="awnser3KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #d14a4a;"></button>'
    }
    if (data[0].Answer4Content != "") {
        lio += '<button class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #edeff2; box-shadow: none;">' + ans4.count4 + '</button>'
        lis += '<button id="awnser4KahootChart" class="btnK" style="font-size: x-large; width: calc(20% - 20px); height: 60px; background-color: #3aab6c;"></button>'
    }
    li += '</div></div>'
    $('.clock').html(lio + lis);

    if (data[0].CorrectAnswer == data[0].Answer1Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser1KahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == data[0].Answer2Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser2KahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == data[0].Answer3Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser3KahootChart").append(img)
    }
    else if (data[0].CorrectAnswer == data[0].Answer4Content) {
        img = '<img src="../images/check-mark.png" / style="width: 30px;">'
        $("#awnser4KahootChart").append(img)
    }
}
function GetFiles(idc, idl) {
    ajaxCall("GET", "../api/AddFile/?lessonId=" + idl + "&courseId=" + idc, "", successFile, errorFile);
}
function successFile(data) {
    files = data;
    document.getElementById('UlFiles').innerHTML = "";
    for (var i = 0; i < files.length; i++) {
        var idF = files[i].Idfile;
        var fileName = files[i].FileName;
        var fPath = files[i].Path;
        var size = files[i].Size;
        var type = files[i].TypeFile;
        var li = '<div onclick="openFile(this)" name="' + fPath + '" id = "' + idF + '" class="list-group-item ' + size + ' ' + type + ' ' + fPath + '" > <a href="../uploadedFiles/' + fPath + '" style="pointer-events: none; cursor: default;"> ' + fileName + '</a ></div > ';
        document.getElementById('UlFiles').innerHTML += li;
    }

}
function openFile(event) {

    $(".messages2").css({ 'overflow-y': 'hidden' });
    var size = event.classList[1];
    var type = event.classList[2];
    $('.clock').html("");
    $("#chartContainer").html("");
    $('.centered').html("");
    //clearInterval(x);
    $("#omer").removeClass("show");
    str2 ="../uploadedFiles/"
    var str = "http://proj.ruppin.ac.il/bgroup86/prod/uploadedFiles/";
    for (var i = 3; i < event.classList.length; i++) {
        str += event.classList[i] + " ";
        str2 += event.classList[i] + " ";
    }
    str = str.substring(0, str.length - 1);
    str2 = str2.substring(0, str.length - 1);
    if (type=='mpeg'||type==='mp4'||type==='wmv') {
        iframe = '<video width="100%" height="100%" style="position: relative; top: -50px;" controls><source src="' + str2+'" type="video/' + type + '">Your browser does not support the video tag</video>';
    }
    else if (type == 'jpeg' || type === 'png' || type==='jpg') {
        iframe = '<img style="height: 500px; width: auto; position: relative; top: -30px" src="'+str2+'" />';
    }
    else if (size > 10000 || type !== 'doc' && type !== 'docx' && type !== 'xls' && type !== 'xlsx' && type !== 'ppt' && type !== 'pptx') {
        iframe = '<iframe class="doc" src="https://docs.google.com/gview?url=' + str + '&embedded=true" style="position: relative; top: -60px;" width="100%" height="100%" frameborder="0"></iframe>';
    }
    else {
        iframe = "<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=" + str + "' style='position:relative; top:-60px;' width='100%' height='100%' frameborder='0'></iframe>";
    }
    $('.messages2').html(iframe);

}
function errorFile() {
    swal("Oops", "Sorry, Some Error with get your files", "error");
}
function endLesson() {
    ajaxCall("GET", "../api/StudentInLesson/?lessonId=" + lessonId + "&courseId=" + courseId, "", succsessEndLes, errorEndLes)

}
function succsessEndLes(data) {
    var students = data;
    ajaxCall("put", "../api/StudentInLesson", JSON.stringify(students), successSaveStudents, errorSaveStudents)
}
function successSaveStudents() {
    ajaxCall("DELETE", "../api/StudentInLesson/?lessCode=" + lessonCode, "", succsessDelete, errorEndLes)
}
function errorSaveStudents() {

}
function succsessDelete() {
    newFile = {
        LessonId: lessonId,
        CourseId: courseId,
        FileName: "רשימת נוכחות",
        FileDescription: "",
        Path: courseId.toString() + "/" + lessonId.toString() + "/" + lessonCode.toString() + ".xls",
        TypeFile: "xls",
        Size: 0
    };
    ajaxCall("POST", "../api/AddFile", JSON.stringify(newFile), successNewFile, errorEndLes);
}
function successNewFile() {
    ajaxCall("PUT", "../api/Lesson/?lessonCode=" + lessonCode, "", successActiveFalse, errorEndLes);
}
function successActiveFalse() {
    swal({
        title: "GoodBy!",
        text: "See you next time",
        imageUrl: 'thumbs-up.jpg'
    });
    setTimeout(function () {
        window.location.href = "indexLecturer.html";
    }, 3000);


}
function errorEndLes() {
    swal("Oops", "Sorry, Some Problem with DB", "error");
}
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

ref = firebase.database().ref("/chat");
ref.on("child_added", function render2() {
    $('#divChatWindow').html("");
    render();
});
check = firebase.database().ref("/checkChange");
check.on('child_changed', function (snapshot) {
    $('#divChatWindow').html("");
    render();
});
ref1 = firebase.database().ref("/Answers");
ref1.on("child_added", function render3() {
    $('#divLecturerWindow').html("");
    if (QuestionId === undefined) return;
    ajaxCall("GET", "../api/studentsAnswers/get/?id=" + QuestionId, "", successAnswers, error);
});
ref2 = firebase.database().ref("/isTextLocked");
ref3 = firebase.database().ref("/lessonAndCourse");
ref4 = firebase.database().ref("/YesNo");


var startMulti = firebase.database().ref("/startMulti");
var refMulti = firebase.database().ref("/multiDetail");

function restartFireBase() {
    refMulti.update(({ 'answer1': "" }));
    refMulti.update(({ 'answer2': "" }));
    refMulti.update(({ 'answer3': "" }));
    refMulti.update(({ 'answer4': "" }));
    startMulti.update(({ 'state': "false" }));
    startMulti.update(({ 'state1': "true" }));
    ref2.update(({ 'state': "false" })); 
    ref4.update(({ 'state': "true" }));

}

function render() {
    restartFireBase();
    $('#divChatWindow').html("");
    ajaxCall("GET", "../api/RealTimeQuestion/get/?lessonCode=" + lessonCode, "", success, error);
}
function success(messages) {
    for (i = 0; i < messages.length; i++) {
        AddMessage(messages[i]);
    }
}
function error(err) {
    console.log(JSON.stringify(err))
    swal("Oops", "Sorry, Some Problem with DB", "error");
}
// Add new question to the chat list
function AddMessage(message) {
    var divChat = '<div class="direct-chat-msg"> <div class="direct-chat-info clearfix"></div> <div id="text_wrapper" class="text_wrapper scale-up-top" dir="rtl">' + message.Content + '</br> <center style="position:relative; float:right;"><input type="image" onClick="deleteQuestion(' + message.ID + ',' + " 'isAnswered' " + ')" src="../images/check-button.png" width="18px" height="18px" style="margin-top: 5px"> <input type="image" onClick="deleteQuestion(' + message.ID + ',' + " 'isDeleted' " + ')" src="../images/delete-button.png" width="18px" height="18px" style="margin-top: 5px"> <input type="image" onClick="yesNoQuestion(' + message.ID + ',' + " '" + message.Content + "' " + ')" src="../images/information.png" width="18px" height="18px" style="margin-top: 5px"> <input type="image" onClick="AddAnswer(' + message.ID + ',' + " '" + message.Content + "' " + ')" src="../images/back-button.png" width="18px" height="18px" style="margin-top: 5px"></center><p id="numlikes" class="counter-count"><small>' + message.likeCounter + '</p><img id="likeP' + message.ID + '" src="../images/like.png" width="20px" height="20px" style="float: left; margin-top: 2px;"></small> </div> </div>';
    $('#divChatWindow').append(divChat);
    var height = $('#divChatWindow')[0].scrollHeight;
    $('#divChatWindow').scrollTop(height);
}
// Remove question from the chat list
function deleteQuestion(id, field) {
    var check = firebase.database().ref("/checkChange");
    check.once("value", function (snapshot) {
        what = snapshot.val().state;
    });
    if (what == "false") {
        check.update(({ 'state': "true" }));
    }
    else {
        check.update(({ 'state': "false" }));
    }
    let str = "../api/RealTimeQuestion/put/?Qid=" + id + "&field=" + field;
    ajaxCall("PUT", str, "", render, error);
}
//Add the open question to the YesNoQuestion list and play timer
function yesNoQuestion(id, content) {
    restartFireBase();
    $(".messages2").css({ 'overflow-y': 'auto' });

    yesNo = firebase.database().ref("/yesNoQ");
    count = firebase.database().ref("/countReal");
    yesNo.update(({ 'idQ': id }));
    yesNo.update(({ 'content': content }));
    count.update(({ 'yesCount': 0 }));
    count.update(({ 'noCount': 0 }));
    ref4.update(({ 'state': "false" }));

    clearInterval(x);
    $('.showfiles').html("");
    $('#divLecturerWindow').html("");
    $('#chartContainer').html("");
    $(".clock").html("");
    localStorage.setItem('id', id);
    var d = new Date();
    d.toString();


    var seconds = 11;
    $(".centered").html('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
    $(".centered").append("<p>" + content + "</p>");

    li = '<div id="q1"><button id="YesAnswer" class="btnK" style="font-size: x-large; background-color: green;"> Yes </button><button id="NoAnswer" class="btnK" style="font-size: x-large; background-color: #da3948;"> No </button></div>'
    $('#divLecturerWindow').append(li);

    //Update the timer down every 1 second
    x = setInterval(function () {
        seconds = seconds - 1;
        $(".clock").html("<br/><p>" + seconds + "s </p>");
        // If the count down is over, write EXPIRED
        if (seconds <= 0) {
            clearInterval(x);
            $(".clock").html("<p> EXPIRED! </p>");
            ref4.update(({ 'state': "true" }));
            ajaxCall("GET", "../api/YesNoQuestion/?id=" + id, "", successYNKahootChart, error);
        }
    }, 1000);
    count.on("value", function (snapshot) {
        yesNoCount = snapshot.val();
    });

}
function successUpdate() {
    $("#divLecturerWindow").scrollTop(tempScrollTop);
}
//function successChart(data) {
//    yesCount = yesNoCount.yesCount;
//    noCount = yesNoCount.noCount;
//    successChart2();
//}
//// Show chart, with yesCounter and noCounter
//window.successChart2 = function () {

//    chart = new CanvasJS.Chart("chartContainer", {
//        theme: "light1",
//        animationEnabled: false,
//        title: {
//            text: ""
//        },
//        data: [
//            {
//                type: "column",
//                dataPoints: [
//                    { label: "Yes", y: yesCount },
//                    { label: "No", y: noCount }
//                ]
//            }
//        ]
//    });
//    chart.render();

//}
// Show the question on the lecturer side
function AddAnswer(qid, qcontent) {
    restartFireBase();
    $(".messages2").css({ 'overflow-y': 'auto' });
    var refContent = firebase.database().ref("/contentAns");
    refContent.update(({ 'id': qid }));
    refContent.update(({ 'content': qcontent }));
    ref2.update(({ 'state': "true" }));
    clearInterval(x);
    $('.showfiles').html("");
    $('.clock').html("");
    $("#chartContainer").html("");
    $(".centered").html('<input type="image"  id="returnBTN" src = "../images/return.png" onclick="back()"> ');
    $(".centered").append('<p> ' + qcontent + "</p> ");
    localStorage.setItem('id', qid);
    localStorage.setItem('content', qcontent);
    QuestionId = qid;
    QuestionContent = qcontent;
    ajaxCall("GET", "../api/studentsAnswers/get/?id=" + qid, "", successAnswers, error);

}
answerStudent = firebase.database().ref("/Answers");
answerStudent.on("child_added", function render7() {
    if (QuestionId === undefined) return;
    ajaxCall("GET", "../api/studentsAnswers/get/?id=" + QuestionId, "", successAnswers, error);
});
function back() {
    restartFireBase()
    location.href = "ChatNew.html";
}
function goToIndex() {
    location.href = "indexLecturer.html";
}
//Show all students answers on the lecturer side
function successAnswers(Answer) {
    oneClick = false;
    $('#divLecturerWindow').html("");
    for (i = 0; i < Answer.length; i++) {
        AddAnswer2(Answer[i]);
    }
}
function AddAnswer2(Answer) {
    Aid = Answer.AnswerId;
    AContent = Answer.Content;
    var divChat = '<div class="direct-chat-msg"><div class="direct-chat-info clearfix"></div><div id="answer' + Aid + '" class="text_wrapper scale-up-top answer' + Aid + ' ' + Aid + '" dir="rtl" onClick="saveAll(this)" style="height: 50px;">' + Answer.Content + '</br></div></div> ';
    document.body.innerHTML += "<style> #answer" + Aid + ":after { border-left-color: #75C9C8; } </style>";
    $('#divLecturerWindow').append(divChat);
}
function saveAll(event) {
    answerId = event.classList[2];  //get the word answer + id like answer4
    id = event.classList[3];    //get the id like 4
    if (oneClick === false) {
        oneClick = true;
        tempScrollTop = $("#divLecturerWindow").scrollTop();
        $(event).css('background-color', 'green');
        selectedId = id;
        document.body.innerHTML += "<style> #" + answerId + ":after { border-left-color: green; } </style>";
        ref2.update(({ 'state': "false" })); //lock the answer option to the students 
        let str = "../api/QuestionAndAnswer/put/?Qid=" + id;
        ajaxCall("Put", str, "", successUpdate, error);
    }
    else if (id === selectedId) {
        tempScrollTop = $("#divLecturerWindow").scrollTop();
        $(event).css('background-color', '#75C9C8');
        document.body.innerHTML += "<style> #" + answerId + ":after { border-left-color: #75C9C8; } </style>";
        ref2.update(({ 'state': "true" }));
        let str = "../api/QuestionAndAnswer/put/?Qid=" + id;
        ajaxCall("Put", str, "", successUpdate, error);
        oneClick = false;
    }

    else return;

}
