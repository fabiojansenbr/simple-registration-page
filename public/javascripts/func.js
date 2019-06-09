function initPage() {
    let cardRegister = $('#cardRegister');
    let cardLogin = $('#cardLogin');
    let cardDashboard = $('#cardDashboard');

    if (localStorage.length == 0) {
        cardRegister.show();
        cardLogin.hide();
        cardDashboard.hide();
    } else if (localStorage.length >= 1) {
        cardRegister.hide();
        cardLogin.hide();
        cardDashboard.show();
    }
}

// initialize input phone number
function initMobileNumber() {
    let telInput = $("input[type=tel]");

    telInput.intlTelInput({
        initialCountry: 'id'
    });
}

// initialize input date
function initDatePicker() {
    $('#dateOfBirth').datepicker({
        format: 'yyyy-dd-mm',
        uiLibrary: 'bootstrap4',
        showRightIcon: false,
        showOnFocus: true
    });
}

// validate all form fields
function formValidation() {
    $.validator.setDefaults({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.col-sm-10').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

    $('#formRegistration').validate({
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            mobileNumber: {
                required: true,
                number: true,
                remote: {
                    url: "/api/v1/auth/register/unique-check",
                    type: "post",
                    data: {
                        realMobileNumber: function () {
                            return $("#mobileNumber").intlTelInput("getNumber");
                        }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: "/api/v1/auth/register/unique-check",
                    type: "post"
                }
            },
            password: {
                required: true
            },
            confirmPassword: {
                required: true,
                equalTo: "#password"
            },
            dateOfBirth: {
                dateISO: true
            }
        },
        messages: {
            firstName: {
                required: "Please enter your firstname"
            },
            lastName: {
                required: "Please enter your lastname"
            },
            mobileNumber: {
                required: "Please enter your mobile phone number"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter valid email"
            },
            password: {
                required: "Please provide a password"
            },
            confirmPassword: {
                required: "Please provide a password",
                equalTo: "Password does not match"
            }
        }
    });
}