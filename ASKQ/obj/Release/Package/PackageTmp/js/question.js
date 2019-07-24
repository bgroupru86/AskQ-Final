function addQuestion() {
    var que = $("#ques").val();
    var d = new Date();
    d.toString();
    Question = {
        Content: que,
        UploadDate: d
    }
    ajaxCall("POST", "../api/RealTimeQuestion/post", JSON.stringify(Question), successLog, errorLog);
}

function successLog(data) {
    console.log(data);
    alert("succses");
}
function errorLog() {
    alert("Error log");
}