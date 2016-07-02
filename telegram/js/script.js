/**
 * Created by 7KiLL on 27/06/16.
 * Updated by 7KiLL on 03/07/16. Buttons rework, parse mechanics rework, flexbox,
 * sticky footer, meta info, contacts.
 */

$( document ).ready(function() {
    //Global Objects
    var pattern = {
        log: /(.+), \[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/,
        nick: /(.+)(?=(,|:) \[)/,
        date: /\[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/,
        reply: /\[In reply to (.+)\]/i,
        coma: /(,|:)\B/
    };
    var parse = {
        name: function (str) {
            str = str.replace(pattern.nick,
            "<td class=\"nickname\">$&</td>");
            return str;
        },
        date: function (str) {
            str = str.replace(pattern.date,
            "<td class=\"date\">$&</td>");
            return str;
        },
        clearData: function (str) {
            str = str.replace(pattern.date,
            "");
            return str;
        },
        coma: function (str) {
            str = str.replace(pattern.coma,
            ""
            );
            return str;
        },
        reply: function (str) {
            str = str
                .replace(pattern.reply,
            '<em class="text-muted">[In reply to <span class="nickname">$1</span>]</em>');
            return str;
        }
    };
    var check = {
        date: function (e) {
            return $(e).hasClass('checked');
        },
        //Deprecated
        coma: function (e) {
            return check.date(e);
        }
    };

    //Main function
    function Update(text) {
        //Check for empty textarea
        var stringArray = text.split('\n'); 
        var htmlTable = '';
        var reply = '';

        $.each(stringArray, function (line, string) {
            if(pattern.reply.test(string)) {
                reply = string;
                reply = parse.reply(reply);
                string = '';
            }
            if(string=='') {return true}
            else if(pattern.nick.test(string)&&pattern.date.test(string)){
                string = parse.name(string);
                string = parse.coma(string);
                check.date('.dateBox')?
                    string = parse.date(string) : string = parse.clearData(string);
                htmlTable += '<tr>' + string;  //Open Table Row
            }
            else if(pattern.nick.test(string)) {
                string = parse.name(string);
                string = parse.coma(string);
                htmlTable += '<tr>' + string;  //Open Table Row
            }
            else {
                if(reply) {
                    string = reply + ' ' + string;
                    reply = '';
                }
                string = '<td class="text-col">' + string + '</td>';
                htmlTable += string + '</tr>'; //Close Table Row
            }
        });
        htmlTable = '<table class="table table-sm"><tbody>' + htmlTable + '</tbody></table>';
        return htmlTable;
    }

    //Updating buttons color
    updateBgColor('#nickColor', 'name');
    updateBgColor('#dateColor', 'date');
    updateBgColor('#textColor', 'text');

    //Local storage shit
    if(localStorage.getItem('textareaText'))
        $('#processedText').val(localStorage.getItem('textareaText'));
    //Updating textarea "cache"
    $('#processedText').on('change', function () {
       localStorage.setItem('textareaText', $(this).val());
    });
    //Start button event handler
    $('#startProcess').on('click', function(){
        var text = $('#processedText').val();
        if(!text) {
            showAlert("Empty field", 'danger', '#wrap', 1200);
            return false;
        }
        $('.form-group').hide();
        $('.table').show();
        $('.card-block').append(Update(text));

        updateColor('.nickname', 'name');
        updateColor('.date', 'date');
        updateColor('.text-col', 'text');
        $(this).hide();
        $('.inputs').show(300);
        $('#editProcess').show(300);
        $('#newProcess').show(300);
    });
    //Edit
    $('#editProcess').on('click', function () {
        $('table').remove();
        $('.form-group').show(300);
        $('#editProcess').hide(300);
        $('#newProcess').hide(300);
        $('#startProcess').show(300);

    });
    //Clear
    $('#newProcess').on('click', function () {
        $('#processedText').val('');
        $('table').remove();
        $('#editProcess').hide(300);
        $(this).hide(300);
        $('.form-group').show(300);
        $('#startProcess').show(300);

    });
    //Date
    $('.dateBox').on('click', function () {
        if(check.date(this)) {
            $(this)
                .removeClass('checked btn-success')
                .addClass('btn-danger')
                .html('Date <i class="fa fa-times" aria-hidden="true"></i>');
                $('#dateColor').fadeOut(300);
        }
        else {
            $(this)
                .removeClass('btn-danger')
                .addClass('checked btn-success')
                .html('Date <i class="fa fa-check" aria-hidden="true"></i>');
            $('#dateColor').fadeIn(300);
        }
       textUpdate();
    });

    //Other functions
    function updateColor(e, l) {
        if(localStorage.getItem(l)!==null) {
            console.log('localStorage: ' + l + ' has been found');
            $(e).each(function(i, item){
                $(this).css('color', localStorage.getItem(l));
            });
        }
    }
    function updateBgColor(e, l) {
        if(localStorage.getItem(l)) {
            $(e).css('background-color', localStorage.getItem(l));
        }
    }

    function showAlert(msg, type, where, time) {
        var alert = '<div class="alert alert-'+ type+'" role="alert">' +
            '<strong>'+ msg+'</strong>' +
        '</div>';
        $(where).prepend(alert);
        setTimeout(function() { $('.alert').fadeOut(300 , function(){$(this).remove()}) }, time);
        }

    function textUpdate() {
        var text = $('#processedText').val();
        if(!text) {
            showAlert("Empty field", 'danger', '#wrap', 1200);
            return false;
        }
        $('.form-group').hide();
        $('table>tbody').html(Update(text));
        updateColor('.nickname', 'name');
        updateColor('.date', 'date');
        updateColor('.text-col', 'text');
        $('.footer').addClass('sticky');
    }

});
