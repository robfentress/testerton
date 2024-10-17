window.onload = function () {
    CKEDITOR.replace('editor1', {
        toolbarGroups: [
            { name: 'styles', groups: ['styles'] },
            { name: 'colors', groups: ['colors'] },
            // '/',
            { name: 'document', groups: ['mode', 'document', 'doctools'] },
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
            { name: 'forms', groups: ['forms'] },
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
            { name: 'links', groups: ['links'] },
            { name: 'insert', groups: ['insert'] }
        ],
        colorButton_colors: 'Red/FF0000,Blue/0000FF,Green/008000,Black/000000,White/FFFFFF',
        colorButton_enableAutomatic: false,
        colorButton_enableMore: false,
        linkShowTargetTab: false,
        linkShowAdvancedTab: false,
        removeButtons: 'Preview,ExportPdf,NewPage,Save,Source,Templates,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Image,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,JustifyBlock,PasteText,PasteFromWord,Styles'
    });
}