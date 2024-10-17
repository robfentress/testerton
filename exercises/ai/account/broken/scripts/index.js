$(document).ready(function () {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };

    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true
    });

    $('.number').autotab({
        filter: 'number',
        tabOnSelect: true
    });
    $('.ccard').autotab({
        filter: 'number',
        tabOnSelect: true
    });


    //Timeout after 20 minutes
    window.setTimeout(function () {
        window.location.href = 'timeout.html';
    }, 1200000)
});


// Editor code lifted from https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
$(document).ready(function () {
    var editor, txt;

    var charge = ['cardFirst', 'cardLast', 'card1', 'card2', 'card3', 'card4', 'exp', 'code'];
    $("[name='monthly']").on('change', function (e) {
        if (this.value === "yes") {
            console.log("yes");
            for (var i=0; i<charge.length; i++) {
                $(`[name='${charge[i]}']`).addClass('req');
                $(`[name='${charge[i]}']`).attr("aria-required", "true")
            }
        } else {
            console.log("no");
            for (var i=0; i<charge.length; i++) {
                $(`[name='${charge[i]}']`).removeClass('req');
                $(`[name='${charge[i]}']`).removeAttr("aria-required");
            }
        }
    });
    initDoc();
    
    $("#formatting").on('change', function (e) {
        formatDoc('formatblock', e.target[e.target.selectedIndex].value);
        e.target.selectedIndex = 0;
    });
    $("#font").on('change', function (e) {
        formatDoc('fontname', e.target[e.target.selectedIndex].value);
        e.target.selectedIndex = 0;
    });
    $("#fontSize").on('change', function (e) {
        formatDoc('fontsize', e.target[e.target.selectedIndex].value);
        e.target.selectedIndex = 0;
    });
    $("#foreColor").on('change', function (e) {
        formatDoc('forecolor', e.target[e.target.selectedIndex].value);
        e.target.selectedIndex = 0;
    });
    $("#backColor").on('change', function (e) {
        formatDoc('backcolor', e.target[e.target.selectedIndex].value);
        e.target.selectedIndex = 0;
    });

    $("#print").on('click', function (e) {
        printDoc();
    });

    $("#undo").on('click', function (e) {
        formatDoc('undo');
    });
    $("#redo").on('click', function (e) {
        formatDoc('redo');
    });
    $("#removeFormat").on('click', function (e) {
        formatDoc('removeFormat')
    });

    $("#bold").on('click', function (e) {
        formatDoc('bold');
    });
    $("#italic").on('click', function (e) {
        formatDoc('italic');
    });
    $("#underline").on('click', function (e) {
        formatDoc('underline');
    });

    $("#justifyLeft").on('click', function (e) {
        formatDoc('justifyleft');
    });
    $("#justifyCenter").on('click', function (e) {
        formatDoc('justifycenter');
    });
    $("#justifyRight").on('click', function (e) {
        formatDoc('justifyright');
    });


    $("#numberedList").on('click', function (e) {
        formatDoc('insertorderedlist');
    });
    $("#dottedList").on('click', function (e) {
        formatDoc('insertunorderedlist');
    });

    $("#quote").on('click', function (e) {
        formatDoc('formatblock', 'blockquote');
    });


    $("#hyperlink").on('click', function (e) {
        var sLnk = prompt('Write the URL here', 'http:\/\/');
        if (sLnk && sLnk != '' && sLnk != 'http://') {
            formatDoc('createlink', sLnk)
        }
    });

    $("#cut").on('click', function (e) {
        formatDoc('cut');
    });
    $("#copy").on('click', function (e) {
        formatDoc('copy');
    });
    $("#paste").on('click', function (e) {
        alert(`Your browser does not support pasting by clicking this button.  You will need to use Control + V (Windows) or Command + V (Mac) instead`);
    });

    function initDoc() {
        editor = document.getElementById("textBox");
        txt = editor.innerHTML;

        // Indents or outdents text
        $("#textBox").on('keydown keyup blur', function (e) {
            if (e.which === 9 && !e.shiftKey) {
                if (e.type === 'keydown') document.execCommand('indent', false);
                e.preventDefault();
            }
            if (e.which === 9 && e.shiftKey) {
                if (e.type === 'keydown') document.execCommand('outdent', false);
                e.preventDefault();
            }
        });
    }

    function formatDoc(sCmd, sValue) {
        editor.focus();
        const result = document.execCommand(sCmd, false, sValue);
        console.log('document.execCommand result: ', result);
    }

    $("[name='compForm']").on("submit", function (e) {
        e.preventDefault();
        validate();
    });

    $("#submit").on("mousedown", validate);

    function validate() {
        var valid = true;
        var correctFormat = true;
        var errmsg = '';


        var ss1 = Number(document.compForm["ss1"].value);
        var ss2 = Number(document.compForm["ss2"].value);
        var ss3 = Number(document.compForm["ss3"].value);

        $('.number').removeClass("format");
        if (isNaN(ss1)) {
            $("[name='ss1']").addClass("format");
            correctFormat = false;
        }
        if (isNaN(ss2)) {
            $("[name='ss2']").addClass("format");
            correctFormat = false;
        }
        if (isNaN(ss3)) {
            $("[name='ss3']").addClass("format");
            correctFormat = false;
        }
        if (correctFormat === false) {
            valid = "false";
            errmsg += '<li><span class="format">Incorrectly formated fields highlighted in yellow.</span></li>';
        }

        $('.req').removeClass("invalid");
        if (document.compForm["first"].value == "") {
            $('[name="first"]').addClass("invalid");
            valid = false;
        }
        if (document.compForm["last"].value == "") {
            $('[name="last"]').addClass("invalid");
            valid = false;
        }
        if (document.compForm["username"].value == "") {
            $('[name="username"]').addClass("invalid");
            valid = false;
        }
        if (document.compForm["password"].value == "") {
            $('[name="password"]').addClass("invalid");
            valid = false;
        }
        if (document.compForm["password2"].value == "") {
            $('[name="password2"]').addClass("invalid");
            valid = false;
        }
        if (document.compForm["password"].value !== document.compForm["password2"].value) {
            errmsg += '<li>Password fields must match</li>';
            valid = false;
        }
        if (valid == true) {
            if ($('input[name="monthly"]:checked').val() === "yes") {
                window.location.href = 'created.html?committed=true';
            } else {
                window.location.href = 'created.html';
            }
            return true;
        } else {
            if ($('.invalid').length !== 0) {
                errmsg += '<li>Fields highlighted in red are required</li>';
            }
            $('#status').html("<div class='alert alert-danger'><h2>Error:</h2><ul>" + errmsg + "</ul></div>");
            $('html,body').animate({
                scrollTop: $("#status").offset().top
            });
            return false;
        }
        return valid;
    }


    function printDoc() {
        var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
        oPrntWin.document.open();
        oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + editor.innerHTML + "<\/body><\/html>");
        oPrntWin.document.close();
    }

    $('input#datepicker').unbind('keydown');
    $('input#datepicker').blur(function (e) {
        $("#datepicker").datepicker("hide")
    })
});