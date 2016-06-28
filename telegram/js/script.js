/**
 * Created by 7KiLL on 27/06/16.
 */

$( document ).ready(function() {


    updateBgColor('#nickColor', 'name');
    updateBgColor('#dateColor', 'date');
    updateBgColor('#textColor', 'text');


    if(localStorage.getItem('textareaText'))
        $('#processedText').val(localStorage.getItem('textareaText'));

    $('#processedText').on('change', function () {
       localStorage.setItem('textareaText', $(this).val());
    });

    $('#startProcess').on('click', function(){
        var text = $('#processedText').val();
        //Check for empty textarea
        if(!text) {
            showAlert("Empty field", 'danger', '.row', 3000);
            return false;
        }
        var textStrings = text.split('\n');
        var re =  /(.+), \[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/;
        var name = /(.+),/;
        var date = /\[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/;
        var coma = /,<\/td> <td/;
        var htmlDate = /<td class=\"date\">\[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]<\/td>/;
        var htmlText = new String();

        textStrings.forEach(function(string, i, textString){
            if(string=='') {}
            else if(re.test(string)) {

                string = string.replace(name, "<td class=\"nickname\" id='name'>$&</td>");
                string = string.replace(date, "<td class=\"date\">$&</td>");

                if(!$('.comaBox').is(":checked")) {
                    console.log("Btn Checked");
                    string = string.replace(coma, "</td> <td");
                }

                if(!$('.dateBox').is(":checked")) {
                    string = string.replace(htmlDate, "");
                    $('#dateColor').fadeOut(300);
                }
                else {
                    $('#dateColor').fadeIn(300);
                }

                //string = "<td class='nick-date-col'>" + string;
                //string = string + "</td>";

                string = "<tr>" + string;
        }
            else {
                string = "<td class='text-col'>" + string;
                string = string + "</td>";
                string = string + "</tr>"
            }
            htmlText = htmlText + string;

        });
        htmlText = "<table class=\"table table-sm\"><tbody>" + htmlText + " </tbody></table>";

        $('.form-group').hide();
        var parsedText = document.createElement('p');
        parsedText.innerHTML = htmlText;
        $('.card-block').append(htmlText);

        updateColor('.nickname', 'name');
        updateColor('.date', 'date');
        updateColor('.text-col', 'text');
        $(this).hide();
        $('.inputs').show(300);
        $('#editProcess').show(300);
        $('#newProcess').show(300);
        $('.comaBox').show(300);
    });

    $('#editProcess').on('click', function () {
        $('table').remove();
        $('.form-group').show(300);
        $('#editProcess').hide(300);
        $('#newProcess').hide(300);
        $('#startProcess').show(300);
        $('.comaBox').hide(300);
    });

    $('#newProcess').on('click', function () {
        $('#processedText').val('');
        $('table').remove();
        $('#editProcess').hide(300);
        $(this).hide(300);
        $('.form-group').show(300);
        $('#startProcess').show(300);
    });

    $('.comaBox').change(function () {
        console.log('Checkbox has been clicked');
        console.log($('.comaBox').is(":checked"));
        textUpdate();
    });
    $('.dateBox').change(function () {
       textUpdate();
    });

    //Functions
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
        var alert = '<div class="alert alert-'+ type+'"role="alert">' +
            '<strong>'+ msg+'</strong>' +
        '</div>';
        console.log(alert);
        $(where).append(alert);
        console.log(where);
        setTimeout(function() { $('.alert').fadeOut(300 , function(){$(this).remove()}) }, 1000);
        console.log("Time");
        }

    function textUpdate() {
        var text = $('#processedText').val();
        //Check for empty textarea
        if(!text) {
            showAlert("Empty field", 'danger', '.row', 3000);
            return false;
        }
        var textStrings = text.split('\n');
        var re =  /(.+), \[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/;
        var name = /(\w)+( *)(\w)*,/;
        var date = /\[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/;
        var htmlDate = /<td class=\"date\">\[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]<\/td>/;
        var coma = /,<\/td> <td/;

        var htmlText = new String();

        textStrings.forEach(function(string, i, textString){
            if(string=='') {}
            else if(re.test(string)) {

                string = string.replace(name, "<td class=\"nickname\" id='name'>$&</td>");
                string = string.replace(date, "<td class=\"date\">$&</td>");

                if(!$('.comaBox').is(':checked')) {
                    console.log("Checkbox has been clicked");
                    string = string.replace(coma, "</td> <td");
                }

                if(!$('.dateBox').is(":checked")) {
                    string = string.replace(htmlDate, "");
                    $('#dateColor').fadeOut(300);
                }
                else {
                    $('#dateColor').fadeIn(300);
                }

                //string = "<td class='nick-date-col'>" + string;
                //string = string + "</td>";

                string = "<tr>" + string;
            }
            else {
                string = "<td class='text-col'>" + string;
                string = string + "</td>";
                string = string + "</tr>"
            }
            htmlText = htmlText + string;

        });
        htmlText = "<table class=\"table table-sm\"><tbody>" + htmlText + " </tbody></table>";

        $('.form-group').hide();
        var parsedText = document.createElement('p');
        parsedText.innerHTML = htmlText;
        $('table').remove();
        $('.card-block').append(htmlText);
        updateColor('.nickname', 'name');
        updateColor('.date', 'date');
        updateColor('.text-col', 'text');
    }


});