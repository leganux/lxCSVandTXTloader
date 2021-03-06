/*
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|************************************** lxCSVandTXTloader **********************************************|
|*******************************************************************************************************|
|* This plugin is a library lo toad and save a CSV & text file, Return data in an array, table or text *|
|*******************************************************************************************************|
|***************** Plugin made by Angel Erick Cruz Olivera MIT Licsense 2017 - 2018 ********************|
|************************************************ V1.0.02 **********************************************|
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* */

var lxCSVandTXTloader = function (elementID) {
    this.element = elementID;
    this.ext = '';
    this.TXTcontent = '';
    this.array = [];
    this.htmlObj = document.getElementById(this.element);
    this.inicialize = function () {
        var JSOBJ = this;
        var inputF = JSOBJ.htmlObj;
        if (inputF.type !== 'file') {
            console.error('U can\'t inicialize the object. The input must to be a file input.');
            return false;
        }
        inputF.addEventListener('change', function () {
            if (inputF.value !== '' && inputF) {
                var exten = inputF.value.split('.');
                JSOBJ.ext = exten[1].toLowerCase();
                var reader = new FileReader();
                reader.readAsText(inputF.files[0]);
                reader.onloadend = function () {
                    JSOBJ.TXTcontent = reader.result;
                };
            } else {
                JSOBJ.TXTcontent = '';
                JSOBJ.ext = '';
            }
        }, false);
    };
    this.getDataAsText = function () {
        if (this.TXTcontent === '' && this.TXTcontent === null) {
            return false;
        }
        return this.TXTcontent;
    };
    this.getDataAsArray = function (separator) {
        if (!separator) {
            separator = ',';
        }
        if (this.TXTcontent === '' || this.TXTcontent === null) {
            return false;
        }
        if (toString(this.ext) === 'csv') {
            console.warn('The selected file Isn\'t a csv file ');
        }
        var csv = this.TXTcontent;
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i = 0; i < allTextLines.length; i++) {
            if (allTextLines[i] && allTextLines[i] !== '') {
                var data = allTextLines[i].split(separator);
                var tarr = [];
                for (var j = 0; j < data.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        this.array = lines;
        return lines;
    };
    this.getDataAsHTMLTable = function (separator, hasHeader, idContainer, cssTableClass) {
        if (!separator) {
            separator = ',';
        }
        if (!cssTableClass) {
            cssTableClass = '';
        }
        if (this.TXTcontent === '' || this.TXTcontent === null) {
            return false;
        }
        if (toString(this.ext) === 'csv') {
            console.warn('The selected file Isn\'t a csv file ');
        }
        var csv = this.TXTcontent;
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i = 0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(separator);
            var tarr = [];
            for (var j = 0; j < data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
        var HTMLTABLE = '<table class="' + cssTableClass + '">';
        for (var i = 0; i < lines.length; i++) {
            var linea = lines[i];
            HTMLTABLE = HTMLTABLE + '  <tr>';
            if (i === 0 && hasHeader === true) {
                for (var j = 0; j < linea.length; j++) {
                    HTMLTABLE = HTMLTABLE + '  <th>' + linea[j] + '</th>';
                }
            } else {
                for (var j = 0; j < linea.length; j++) {
                    HTMLTABLE = HTMLTABLE + '  <td>' + linea[j] + '</td>';
                }
            }
            HTMLTABLE = HTMLTABLE + '  </tr>';
        }
        HTMLTABLE = HTMLTABLE + ' </table>';

        if (idContainer && idContainer !== '') {
            var x = document.getElementById(idContainer);
            x.innerHTML = HTMLTABLE;
        }
        return HTMLTABLE;
    };
    this.getExtension = function () {
        if (this.ext === '' || this.ext === null) {
            return false;
        }
        return this.ext;
    };
    this.downloadCSVFile = function (text, filename, ext) {
        if (!ext) {
            filename = filename + '.csv';
        } else {
            filename = filename + ext;
        }
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

}
