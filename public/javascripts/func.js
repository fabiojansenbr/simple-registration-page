let cardRegister = $('#cardRegister');
let cardLogin = $('#cardLogin');
let cardDashboard = $('#cardDashboard');

function initPage() {
    if (!localStorage.token) {
        cardRegister.show();
        cardLogin.hide();
        cardDashboard.hide();
    } else {
        loadDashboard();
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

    // validation form registration
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

    // validation form login
    $("#formLogin").validate({
        rules: {
            emailLogin: {
                required: true,
                email: true
            },
            passwordLogin: {
                required: true
            }
        }
    });
}

function showAlert(type, message) {
    return '<div class="alert alert-' + type + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button>' + message + '</div>';
}

function loadDashboard() {
    $.ajax({
        type: 'POST',
        url: '/api/v1/user/info',
        beforeSend: function (xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            cardRegister.hide();
            cardLogin.hide();
            cardDashboard.show();

            let content = '';
            content += '<table class="table table-condensed">';
            content += '<tbody>';
            content += '<tr><th class="w-25">Name</th><td>'+data.data.firstName+' '+data.data.lastName+'</td></tr>';
            content += '<tr><th>Email</th><td>'+data.data.email+'</td></tr>';
            content += '<tr><th>Mobile Number</th><td>'+data.data.mobileNumber+'</td></tr>';
            content += '<tr><th>Date of Birth</th><td>'+data.data.dateOfBirth+'</td></tr>';
            content += '<tr><th>Gender</th><td>'+data.data.gender+'</td></tr>';
            content += '</tbody>';
            content += '</table>';
            
            $("#bodyDashboard").html(content);
        },
        error: function () {
            alert("Sorry, you are not logged in.");
            localStorage.clear();
            cardRegister.show();
            cardLogin.hide();
            cardDashboard.hide();
        }
    });
}