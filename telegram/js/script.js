/**
 * Created by 7KiLL on 27/06/16.
 */

$( document ).ready(function() {
    $('#startProcess').on('click', function(){
        var text = $('#processedText').val();
        var textStrings = text.split('\n');
        var re =  /(.+), \[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/;
        var name = /(\w+)/;
        var date = /\[\d{2}\.\d{2}\.\d{2} \d{1,}:\d{1,}\]/;
        var processedText = textStrings.map(function(string){
           if(string=='') {
               string = "<hr>";
           }
            else if(re.test(string)) {

               string = string.replace(name, "<span class=\"nickname\">$1</span>");
               string = string.replace(date, "<span class=\"date\">$&</span>");
               //string = "<div class='col-md-2'>" + string;
               //string = string + "</div>";
           }
            else {
               //string = "<div class='col-md-10'>" + string;
               //string = string + "</div>";
           }
            return string;
        });
        $('.form-group').hide();
        var parsedText = document.createElement('p');
        parsedText.innerHTML = processedText;
        $('.card-block').append(parsedText);
    });
});