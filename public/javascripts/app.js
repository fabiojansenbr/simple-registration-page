$(document).ready(function () {
    initPage();
    initMobileNumber();
    initDatePicker();
    formValidation();

    $("#submitRegistration").click(function () {
        if ($("#formRegistration").valid()) {
            $("#overlay").css('display', 'flex');

            $.ajax({
                type: "POST",
                url: "/api/v1/auth/register",
                data: $("#formRegistration").serialize(),
                success: function (data) {

                    if (data.status == true) {
                        $("#overlay").css('display', 'none');
                        $('#formRegistration').trigger("reset");
                        $("#formRegistration").prepend(showAlert('success', 'User created successfully! click login button to continue'));

                        $("#cardLogin").show();
                    } else {
                        $("#overlay").css('display', 'none');
                        $("#formRegistration").prepend(showAlert('danger', 'Cannot get any response, please try again'));
                    }

                },
                error: function () {
                    $("#overlay").css('display', 'none');
                    $("#formRegistration").prepend(showAlert('danger', 'Internal server error!'));
                }
            });
        }
    });

    $("#submitLogin").click(function () {
        if ($("#formLogin").valid()) {
            let formData = $("#formLogin").serializeArray();

            $.ajax({
                type: "POST",
                url: "/api/v1/auth/login",
                data: {
                    email: formData[0].value,
                    password: formData[1].value
                },
                success: function (data) {
                    if (data.status == true) {
                        // save token to localStorage
                        localStorage.token = data.data.token;
                        
                        // close modal
                        $('#loginModal').modal('toggle');
                        
                        // display dashboard only, hide form registration and login
                        $("#cardRegister").hide();
                        $("#cardLogin").hide();
                        $("#cardDashboard").show();

                        loadDashboard();
                    } else {
                        $("#formLogin").prepend(showAlert('danger', data.message));
                    }
                },
                error: function () {
                    $("#formLogin").prepend(showAlert('danger', 'Internal server error!'));
                }
            });
        }
    });

    $("#logout").click(function() {
        localStorage.clear();
        initPage();
    });
});