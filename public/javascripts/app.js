$(document).ready(function () {
    initPage();
    initMobileNumber();
    initDatePicker();
    formValidation();

    // form submit action
    $("#formRegistration").submit(function (event) {
        if ($(this).valid()) {
            console.log('lanjut');
        }
        
        // event.preventDefault();

        // var intlNumber = $("#mobileNumber").intlTelInput("getNumber");
        // console.log(intlNumber);

        // var post_url = $(this).attr("action");
        // var request_method = $(this).attr("method");
        // var form_data = $(this).serialize();

        // var x = $(this).serializeArray();
        // $.each(x, function (i, field) {
        //     console.log(field.name + ":" + field.value + " ");
        // });

        return false;
    });
});