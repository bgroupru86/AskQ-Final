function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method,
        url: api,
        data: data,
        cache: false,
        async: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
};
function addfile_ajax(newFile, lessonId, courseId2, fname,file) {
    var newFileName = fname + file.name;
    var formData = new FormData();
    formData.append('file',file, newFileName);
    x = window.location.pathname;
    $.ajax({
        url: x +"/../../filesCode/UploadHandler.ashx",
        type: "POST",
        contentType: false,
        processData: false,
        data: formData,
        // dataType: "json",
        success: function (succsus) {
            jQuery("#loader").remove();
            AddFileSuccsess(newFile);
        },
        error: function (err) {
            jQuery("#loader").remove();
            alert(err.statusText);
        }
    });
};
