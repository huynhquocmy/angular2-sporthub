var initTimer = function () {

    var str = '2017/07/07 00:00:00';

    $('#timer').countdown(str, function (event) {
        $(this).html(event.strftime(''
            // + '<div class="timer-item"><span class="timer-number">%-w</span> <span class="timer-title">WEEKS%!w</span></div> '
            +
            '<div class="timer-item"><span class="timer-number site-section__content">%D</span> <span class="timer-title section-component-unit">DAYS</span></div> ' +
            '<div class="timer-item"><span class="timer-number site-section__content">%H</span> <span class="timer-title section-component-unit">HOURS</span></div> ' +
            '<div class="timer-item"><span class="timer-number site-section__content">%M</span> <span class="timer-title section-component-unit">MINS</span></div> ' +
            '<div class="timer-item"><span class="timer-number site-section__content">%S</span> <span class="timer-title section-component-unit">SECS</span></div>' +
            '<div class="clear"></div>'));
    });
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function () {
    initTimer();

    var submit = function () {


        var email = $('#email').val();
        if (!email) {
            return;
        }

        if (validateEmail(email)) {
            var data = {
                email: email
            };
            $.ajax({
                type: "POST",
                url: 'http://api.sporthub.vn:7070/v1/pilots',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                traditional: true,
                success: function (res) {
                    console.log(res);
                },
                dataType: 'json'
            });

            // $('.message').fadeOut();
            $('.thanks').show();
            setTimeout(function () {
                $('.thanks').fadeOut();
                // $('.message').fadeIn();
            }, 4000);
        }
    };


    $('.submit-btn').click(function () {
        submit();
    });
});