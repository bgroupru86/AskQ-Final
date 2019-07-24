$(document).ready(function () {
    //get all hobbies from DB
    $("#register-form").submit(f1);
});
function f1() {
    start();
    return false;
}
function valid() {
    if ($("#pass").val()!= $("#re_pass").val()) {
        swal("Oops", "The passwords you entered are not equal", "error");
        return false;
    }
    if ($("#agree-term").is(':checked') == false) {
        swal("Oops", "You have to agree to the statements", "error");
        return false;
    }
    return true;
}
function start() {
    var idP = $("#idNum").val();
    var typeP = $("#sel1").val();
    ajaxCall("GET", "../api/person/?PersonId=" + idP + "&PersonType=" + typeP, "", successCheckPersonId, errorCheckPersonId);
}
function successCheckPersonId(data) {
    if (data == false) {
        swal("Oops", "The ID is registered in a Database", "error");
    }
    else if (valid() == true) {
        UploadImg();
    }
}
function errorCheckPersonId() {
    swal("Oops", "Sorry,We have a Problem in Database", "error");
}
function UploadImg() {
    imgStr = "";
    var idP = $("#idNum").val();
    var data = new FormData();
    var file = $("#imgInp").get(0).files[0];
    if (file != null) {
        var typeImg = file.type;
        typeImg = typeImg.split("/");
        var newFileName = idP + "." + typeImg[1];
        // Add the uploaded file to the form data collection
        data.append("UploadedImage", file, newFileName);

        // Ajax upload
        $.ajax({
            type: "POST",
            url: "../Api/FileUpload",
            contentType: false,
            processData: false,
            async: false,
            data: data,
            success: saveImages,
            error: errorIMG
        });
    }
    else {
        AddPerson();
    }
}
function saveImages(data) {
    console.log(data);
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            imgStr = data[i];
        }
    }
    AddPerson();
}
function errorIMG() {
    alert("ERROR UPLOAD");
}
function AddPerson() {
    if (imgStr == "") {
        if ($("#gender").val() == "Male") {
            imgStr = "images/male.jpg";
        }
        else {
            imgStr = "images/female.jpg";
        }
    }
    Person = {
        Id: $("#idNum").val(),
        FirstName: $("#name").val(),
        LastName: $("#lastName").val(),
        Email: $("#email").val(),
        Userpassword: $("#pass").val(),
        Gender: $("#gender").val(),
        Type: $("#sel1").val(),
        Img: imgStr
    };
    ajaxCall("POST", "../api/Person", JSON.stringify(Person), success, error);

}
function success() {
    swal("Good job!", "Registration to ASKQ was successful!", "success");
    
    window.location.href="index.html";
}

function error(err) {
    swal("Oops", "Registration failed", "error")
}
