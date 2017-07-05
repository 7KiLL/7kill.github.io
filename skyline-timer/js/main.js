window.onload = function() {
    var currentDate = new Date();
    var endDate     = new Date(2017, 6, 10, 9);
    var flatTime = endDate - currentDate;

    function Timer(e) {
        if(e <= 0)
            return "<h1>SkylineDrop is free now! Hope for a long time...</h1>";
        var inDays = e / 1000 / 60 / 60 / 24;

        var T = {
            "days": function (flat) {
                var t = Math.floor(inDays);
                if(flat)
                    return t * 24 * 60 * 60 * 1000;
                return t;
            },
            "hours": function (flat) {
                var t = Math.floor(((flatTime - T.days(true)) / 1000 / 60 / 60));
                if(flat)
                    return t * 60 * 60 * 1000;
                return t;
            },
            "minutes": function (flat) {
                var t = Math.floor((flatTime - T.days(true) - T.hours(true)) / 1000 / 60);
                if(flat)
                    return t * 60 * 1000;
                return t;
            },
            "seconds": function (flat) {
                var t  = Math.floor((flatTime - T.days(true) - T.hours(true) - T.minutes(true)) / 1000);
                if(flat)
                    return t * 1000;
                return t;
            }
        };
        var baseHTML = '';
        baseHTML =  T.days() + '<sub>days</sub> ';
        baseHTML += T.hours() + '<sub>hours</sub> ';
        baseHTML += T.minutes() +'<sub>minutes</sub> ';
        baseHTML += T.seconds() +'<sub>seconds</sub> ';
        baseHTML = '<h1>'+baseHTML+'</h1>';
        return baseHTML;
    }

    var timerDOM = document.querySelector('.timer');
    function updateTimer() {
        flatTime -= 1000;
        timerDOM.removeChild(timerDOM.getElementsByTagName('h1')[0]);
        timerDOM.insertAdjacentHTML('afterbegin', Timer(flatTime));
    }
    timerDOM.insertAdjacentHTML('afterbegin', Timer(flatTime));
    setInterval(function() {updateTimer()}, 1000);

};
