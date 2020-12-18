/* ALERT: PLAY ON ${https://www.youtube.com/watch?v=dQw4w9WgXcQ} when developing this file*/


/*

// Diable F5 Button
function disableButtonsDown(e) { 
    if ((e.which || e.keyCode) == 116) e.preventDefault(); 
};
$(document).on("keydown", disableButtonsDown);


// Disable Right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable some short keys
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

*/



$(window).load(function() {

    $(".se-pre-con").delay(10).fadeOut("slow");

});


/* init public powerfull funcs */
var choose_row_btn = "<button class='btn_1 icon-plus'><span>أختر</span></button>";
function image(image){return "<div class='imgc'><img class='img' src='./images/"+image+".png' alt='img'></div>"};
function text(txt){return `<div id="textCell">${txt}</div>`;};
function colIcon(icon, title, id){
    return `<div style="writing-mode: tb-rl;display:inline-block;"><div style="text-align: center;margin-bottom:5px;" class="${icon}" title="${title}"></div><div style="display: inline-block;" id="ftableID">${id}</div>`
};
function vwrap(txt) {return `<div style="writing-mode: vertical-lr;display:inline-block;">${txt}</div>`}
// colIcon vars
custom_title_d = 'هذه المسئلة ديناميكة'
custom_title_s = 'هذه المسئلة إستاتيكية'
/* -------------------------------------------------------------------------------- */


$(document).ready(function(){

    // INIT vars 
    var ict2 = 1
    var audio = new Audio("resources/btnclk.wav"); 

    /* radio-active */ 
    var fullTable = $('#full_table').DataTable( {
        "dom": '<"top">f<"bottom"t><"#margin5px"><"clear">lp',
        rowReorder:false,
        data: dataSet,
        columns: [
            { title: "i." },
            {   
                title: "id",
                render: function(data, type){
                    var icon = '';
                    var title ='';
                    var data = data.split(' ')
                    if (data.length==1){data = ['d', data]}
                    if (type=='display'){
                        switch(data[0]){
                            case 'd':
                                icon='dynamic_lamp';
                                title = custom_title_d;
                                break;
                            case 's':
                                icon='static_lamp';
                                title= custom_title_s;
                                break;
                        }
                        return colIcon(icon, title, data[1]);
                    } 
                    return data[1];
                }
            },
            { title: "المسئلة" },
            { title: "درس" },
            { 
                
            },
            { 
                title: "نوع",
                render: function(data, type){return vwrap(data);}
            
            },
            { title: "مفاتيح" },
            { title: "إعدادات" }
        ],

        
        "columnDefs": [{
            "searchable": true,
            "orderable": false,
            "targets": 0,
            "className": "dt-center", 
            "targets": "_all"
        },
        { 
             "targets": 4,
             "data": 4,
             "title": "<img src='./resources/reference.png'>"
        }], 
        "lengthChange":true,
        "paging":true,
        "pageLength": 25,
        "lengthMenu": [ 25, 50, 100, 200, 800 ],
        "bPaginate":false,
        "order": [],
        "bAutoWidth": false,
        "bInfo":true,
        "language": {
            "sLengthMenu": "أظهر _MENU_ مدخلات",
            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix": "",
            "sSearch": "ابحث:",
            "search": "_INPUT_ : أبحث",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "الأول",
                "sPrevious": "السابق",
                "sNext": "التالي",
                "sLast": "الأخير"
            }
        },

        // Cool feature: it makes the filter multi column filter so it filter many colmns at once not only one . 
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );

                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' );
                } );
            } );
        }

    });

    //table pages
    var fullTablePages = fullTable.rows().nodes();

    // draw temp index increament on column 0.
    fullTable.on('order.dt search.dt', function () {
        fullTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        });
    }).draw();

    //button sound on click.
    fullTable.on('click', 'button', function () {
        audio.play();
    });

    /* radio-active */ 
    var empty_table = $('#empty_table').DataTable({
        rowReorder: true,
        data: [],
        columns: [
            { title: "index" },
            { title: "id" },
            { title: "المسئلة" },
            { title: "درس" },
            { title: "مرجع" },
            { title: "نوع" },
            { title: "مفاتيح" },
            { title: "إعدادات" }
        ],
        "lengthChange":false,
        "bFilter": false,
        "bLengthChange": false,
        "bAutoWidth": false,
        "bPaginate": false,
        "bInfo":false,

        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0,
            "className": "dt-center", 
            "targets": "_all"
        }],

    });

    // Show alert if the table is empty when clicked on the Clear Table button
    $( "#clear_table_2" ).click(function() {
        if (empty_table.data().count() == 0) {
            swal({
                text: "الجدول فارغ بالفعل",
                button: "حسناً",
            });              
        } else {
            swal({
                title: "هل متأكد من هذه الخطوة ؟",
                text: "بمجرد تفريغ الجدول لن تتمكن من إستعادة المسائل مرة اخرى",
                icon: "warning",
                buttons: true,
                buttons: ["الغاء", "موافق"],
                dangerMode: true,
            })
                .then((willDelete) => {
                if (willDelete) {
                    empty_table.clear().draw();
                    swal("! تم تفريغ الجدول بنجاح", {
                        icon: "success",
                        button: "حسناً",
                        timer:1500
                    });
                }

            });
        }
    });

    /* move row between tables */ 
    fullTable.on('click', '.btn_1', function () {

        var row = $(this).closest('tr').clone();

        //collect options cell - table 1.
        var options_t1 = row.find('td:last-child');
        options_t1.find('button').remove();

        // convert inputs to <p> -> table 2.
        $('input', options_t1).each(function() {
            $(this).replaceWith('<p id="'+this.id+'">'+this.value+'</p>');
        });
        options_t1 = options_t1.html();

        //remove options cell before adding the row to table 2.
        row.find('td:last-child').remove();
        row.find('td:first-child').html(ict2);
        ict2 = ict2 + 1

        //processing the row then adding it to table 2 .
        row = row.append('<th>'+options_t1+'<button class="r_b_s btn_1 icon-remove"><span>أزالة</span></button></th>');
        row  = row.html();
        empty_table.row.add($('<tr>'+row+'</tr>')).draw();

        // class .r_b_s for ( Remove Button ) sound click, BANDITO:*don't get confused*
        // AHMED4END: *https://www.youtube.com/watch?v=BW1aX0IbZOE*
        // this code for ( Remove Button ) sound click only 
        // look at line 234 if you need the sound click code for all buttons 
        $(".r_b_s").on('click', function() { 
            audio.play();
        });

    });

    /* remove row from table 2 - EVENT */ 
    $('#empty_table tbody').on( 'click', '.btn_1', function () {
        empty_table
            .row( $(this).parents('tr') )
            .remove()
            .draw()

    });

    async function _openFileLoaction() {
        await eel.openFileLoaction();
    };
    //saveImage Button event
    $('#saveImage').on('click', function () {
        _openFileLoaction();
    });


    // Img Zooming Plugin
    var viewer = OpenSeadragon({
        id: "wheelzoom.exe",
        immediateRender: true,
        prefixUrl: './resources/openseadrag/images/', /* icons path */
        buildPyramid: true, 
        useCanvas:false
    });

    viewer.setVisible(false);

    var index = 0;
    $('#ToggleImages').on('click', function () {
        //
        if (index==1){$(this).text('إخفاء الإجابة')}
        else{$(this).text('إظهار الإجابة')}

        var oldTiledImage = viewer.world.getItemAt(index);

        index = (index + 1) % 2;
        var nextIndex = (index + 1) % 2;

        var newTiledImage = viewer.world.getItemAt(index);
        var nextTiledImage = viewer.world.getItemAt(nextIndex);

        oldTiledImage.setOpacity(0);
        newTiledImage.setOpacity(1);
        nextTiledImage.setPreload(true);
    }); 
    // IMAGE VIEWER CODE SEMI-END //

    /* collect data from table 2 by button click */
    $( "#collect_data_t2" ).click(function() {
        //play sound for this button.
        //https://www.youtube.com/watch?v=x7bIbVlIqEc
        audio.play()

        if (empty_table.data().count() == 0) {
            swal("يرجي اختيار مسائل اولاً", {
                button: "حسناً",
            });
        } 

        else {
            ohSnap('جارى التكوين .. إذهب لنافذة المعاينة', {color: 'blue'});

            $("#Tap3_loader_container").fadeIn("slow");
            $('#collect_data_t2').prop('disabled', true)
            $('#ToggleImages').fadeOut();
            $('#saveImage').fadeOut();
            $('.not_yet').fadeOut();
            viewer.setVisible(false);

            // start animation 
 
            
            function extractOnlyText(ele){
                return $('#ftableID', ele).text();
            };
            //ZZ: collect data from table 2
            var id_per_row = empty_table.columns(1).data().toArray()[0].map(extractOnlyText);
            console.log(id_per_row);
            var ops_per_row = empty_table.columns(7).data().toArray()[0];
            var id_cols_length = empty_table.rows()[0].length;
            var dict = {}
            for (var i = 0; i < id_cols_length; i++) {
                //collect options as a dict from table 2 - perparing data to be sent to lord python.
                var sdict = {};
                $('p', ops_per_row[i]).each(function() {
                    sdict[$('label[for="'+this.id+'"]').html().replace(':','')]= $(this).text().replace(':','');
                });
                dict[i] = sdict;
            };
            //ZZ

            viewer.addHandler('tile-loaded', function(){

                viewer.setVisible(true);
                $('#collect_data_t2').prop('disabled', false)
                $('#ToggleImages').fadeIn();
                $('#saveImage').fadeIn();
                $("#Tap3_loader_container").fadeOut("slow");

                $('.alert').fadeOut();
                ohSnap('تم التكوين .. (نافذة معاينة النتيجة)', {color: 'green'});
                // stop animation

            });

            async function run() {

                //fetch images from python server.
                tileSources = await eel.getImages(id_per_row, dict)();

                viewer.setVisible(false);

                //remove prev tiles/images and add newer ones. 
                viewer.addTiledImage({
                    tileSource: {url: tileSources[0], type: 'image'},
                    index: 1,
                    replace: true,
                    preload: true
                });
                viewer.addTiledImage({
                    tileSource: {url: tileSources[1], type: 'image'},
                    index: 0,
                    replace: true,
                    preload: true,
                });

                index = 1


            }

            run();
        }

    });


    // teansfir active class for tabs
    $(".nav-link").click(function() {

        $('.nav-link').removeClass('active');
        $(this).addClass('active');

    });

    //save user inputs to html interface.
    $(document).on('keyup', 'table input', function() {

        $(this).attr('value',$(this).val());

    }); 

    //[SETTINGS]

    const images = $('.imgc', fullTablePages)

    //#tap1_zoom
    $('#tap1_zoom').on('click', function(){
        className = $(this).attr('class');
        if (className.slice(-2,)=='on'){
            console.log('off')
            $(this).parent().find('#chkbxt').text('مفعل');

            for (var i = 0; images.length > i; i++) {
                images[i].classList.toggle('zoomEffect');
            }
        }
        else {
            console.log('on');
            $(this).parent().find('#chkbxt').text('غير مفعل');
            for (var i = 0; images.length > i; i++) {
                images[i].classList.toggle('zoomEffect');
            }
        }
    });

    //#random event
    $('#random').on('click', function(){
        className = $(this).attr('class');
        if (className.slice(-2,)=='on'){
            console.log('off')
            $(this).parent().find('#chkbxt').text('مفعل');
        }
        else {
            console.log('on');
            $(this).parent().find('#chkbxt').text('غير مفعل');
        }
    });

    //#watermark
    $('#watermark').on('click', function(){
        className = $(this).attr('class');
        if (className.slice(-2,)=='on'){
            console.log('off')
            $(this).parent().find('#chkbxt').text('غير مفعل');
            $('#watermark_op').fadeOut();
        }
        else {
            console.log('on');
            $(this).parent().find('#chkbxt').text('مفعل');
            $('#watermark_op').fadeIn();
        }
    });


    const toggle = document.querySelectorAll('.toggle');

    for (var i = 0; toggle.length > i; i++) {
        toggle[i].addEventListener('click', function () {
            this.classList.toggle('is-on');
        });
    }
    //settings - checkbox & color picker - handler
    $(document).on('change', 'input.settingsInput[type=color]', function() {
        this.parentNode.style.backgroundColor = this.value;
    });


}); 

// End docmennt ready

// Trigger Tabs PLugin
new Tabby('[data-tabs]');


//dataset - imported from python.
var dataSet = [

    // Title input
    [
        "عنوان رئيسى", "s title", 
        image('title'),
        "", "", "", "عنوان رئيسى",
        `<div class='settings'>
<input id='in1' value='عنوان رئيسى' type='text'>
<label for='in1'>:العنوان</label> 
</div>
`+choose_row_btn
    ],

    [text(''), 'm0_0_1', image('m0_0_1'), "-", "ص13<br>س1", "graphs", "حل المعادلة", choose_row_btn],
    [text(''), 'm0_0_2_1', image('m0_0_2_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_2_2', image('m0_0_2_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_2_3', image('m0_0_2_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_2_4', image('m0_0_2_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_2_5', image('m0_0_2_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_3', image('m0_0_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_4', image('m0_0_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_5', image('m0_0_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_6', image('m0_0_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_1', image('m0_0_7_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_2', image('m0_0_7_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_3', image('m0_0_7_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_4', image('m0_0_7_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_5', image('m0_0_7_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_6', image('m0_0_7_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_7', image('m0_0_7_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_8', image('m0_0_7_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_7_9', image('m0_0_7_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_8', image('m0_0_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm0_0_9', image('m0_0_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_1', image('m1_1_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_2', image('m1_1_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_3', image('m1_1_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_4', image('m1_1_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_5', image('m1_1_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_6', image('m1_1_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_7', image('m1_1_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_8', image('m1_1_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_1_9', image('m1_1_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_110', image('m1_110'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_1', image('m1_111_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_2', image('m1_111_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_3', image('m1_111_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_4', image('m1_111_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_5', image('m1_111_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_6', image('m1_111_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_7', image('m1_111_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_8', image('m1_111_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_111_9', image('m1_111_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_1', image('m1_113_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_2', image('m1_113_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_3', image('m1_113_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_4', image('m1_113_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_5', image('m1_113_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_6', image('m1_113_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_7', image('m1_113_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_8', image('m1_113_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_113_9', image('m1_113_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_11310', image('m1_11310'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_11311', image('m1_11311'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_11312', image('m1_11312'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_11313', image('m1_11313'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_114', image('m1_114'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_115', image('m1_115'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_1', image('m1_2_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_2', image('m1_2_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_3', image('m1_2_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_4', image('m1_2_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_5', image('m1_2_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_6', image('m1_2_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_7', image('m1_2_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_8', image('m1_2_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_2_9', image('m1_2_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_210', image('m1_210'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_211', image('m1_211'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_212', image('m1_212'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_213', image('m1_213'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_214', image('m1_214'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_215', image('m1_215'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_1', image('m1_216_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_2', image('m1_216_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_3', image('m1_216_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_4', image('m1_216_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_5', image('m1_216_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_6', image('m1_216_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_216_7', image('m1_216_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_217', image('m1_217'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_218', image('m1_218'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_1', image('m1_3_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_1', image('m1_3_2_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_2', image('m1_3_2_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_3', image('m1_3_2_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_4', image('m1_3_2_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_5', image('m1_3_2_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_6', image('m1_3_2_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_7', image('m1_3_2_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_8', image('m1_3_2_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_2_9', image('m1_3_2_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_3', image('m1_3_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_4', image('m1_3_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_5', image('m1_3_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_6', image('m1_3_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_7', image('m1_3_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_8', image('m1_3_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_3_9', image('m1_3_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_310', image('m1_310'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_311', image('m1_311'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_312', image('m1_312'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_313', image('m1_313'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_314', image('m1_314'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_315', image('m1_315'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_316', image('m1_316'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_317', image('m1_317'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_318', image('m1_318'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_319', image('m1_319'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_320', image('m1_320'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_321', image('m1_321'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_322', image('m1_322'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_323', image('m1_323'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_324', image('m1_324'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_325', image('m1_325'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_326', image('m1_326'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_328_1', image('m1_328_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_328_2', image('m1_328_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_328_3', image('m1_328_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_328_4', image('m1_328_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_328_5', image('m1_328_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_329', image('m1_329'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_1_1', image('m1_4_1_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_1_2', image('m1_4_1_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_1_3', image('m1_4_1_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_1_4', image('m1_4_1_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_2', image('m1_4_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_3', image('m1_4_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_4', image('m1_4_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_5', image('m1_4_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_6', image('m1_4_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_7', image('m1_4_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_8', image('m1_4_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_4_9', image('m1_4_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_410', image('m1_410'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_411', image('m1_411'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_412', image('m1_412'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_413', image('m1_413'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_414', image('m1_414'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_415', image('m1_415'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_416', image('m1_416'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_417', image('m1_417'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_418', image('m1_418'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_419', image('m1_419'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_420', image('m1_420'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_421', image('m1_421'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_422', image('m1_422'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_423', image('m1_423'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_424', image('m1_424'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_425', image('m1_425'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_426', image('m1_426'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_427', image('m1_427'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_428', image('m1_428'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_429', image('m1_429'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_430', image('m1_430'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_431', image('m1_431'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_432', image('m1_432'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_433', image('m1_433'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_1', image('m1_435_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_2', image('m1_435_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_3', image('m1_435_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_4', image('m1_435_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_5', image('m1_435_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_6', image('m1_435_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_7', image('m1_435_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_8', image('m1_435_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_435_9', image('m1_435_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_436', image('m1_436'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_437', image('m1_437'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_1', image('m1_5_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_2', image('m1_5_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_3', image('m1_5_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_4', image('m1_5_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_5', image('m1_5_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_6', image('m1_5_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_7', image('m1_5_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_1', image('m1_5_8_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_2', image('m1_5_8_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_3', image('m1_5_8_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_4', image('m1_5_8_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_5', image('m1_5_8_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_6', image('m1_5_8_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_7', image('m1_5_8_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_8', image('m1_5_8_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_8_9', image('m1_5_8_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_810', image('m1_5_810'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_811', image('m1_5_811'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_812', image('m1_5_812'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_813', image('m1_5_813'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_814', image('m1_5_814'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_815', image('m1_5_815'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_816', image('m1_5_816'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_817', image('m1_5_817'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_5_9', image('m1_5_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_510', image('m1_510'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_511', image('m1_511'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_512', image('m1_512'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_513', image('m1_513'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_514', image('m1_514'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_515', image('m1_515'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_517', image('m1_517'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_518', image('m1_518'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_1', image('m1_6_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_2', image('m1_6_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_3', image('m1_6_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_4', image('m1_6_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_5', image('m1_6_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_6', image('m1_6_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_7_1', image('m1_6_7_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_7_2', image('m1_6_7_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_7_3', image('m1_6_7_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_7_4', image('m1_6_7_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_7_5', image('m1_6_7_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_6_7_6', image('m1_6_7_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_1', image('m1_610_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_2', image('m1_610_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_3', image('m1_610_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_4', image('m1_610_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_5', image('m1_610_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_6', image('m1_610_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_7', image('m1_610_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_8', image('m1_610_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_610_9', image('m1_610_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_61010', image('m1_61010'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_61011', image('m1_61011'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_61012', image('m1_61012'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_61013', image('m1_61013'), '', '', '', '', choose_row_btn],
    [text(''), 'm1_611', image('m1_611'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_1_1', image('m2_7_1_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_1_2', image('m2_7_1_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_1_3', image('m2_7_1_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_1_4', image('m2_7_1_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_1_5', image('m2_7_1_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_1_6', image('m2_7_1_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_2', image('m2_7_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_3', image('m2_7_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_4', image('m2_7_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_5', image('m2_7_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_6', image('m2_7_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_7', image('m2_7_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_8', image('m2_7_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_7_9', image('m2_7_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_1', image('m2_710_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_2', image('m2_710_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_3', image('m2_710_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_4', image('m2_710_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_5', image('m2_710_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_6', image('m2_710_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_7', image('m2_710_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_8', image('m2_710_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_710_9', image('m2_710_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_71010', image('m2_71010'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_1', image('m2_712_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_2', image('m2_712_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_3', image('m2_712_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_4', image('m2_712_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_5', image('m2_712_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_6', image('m2_712_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_712_7', image('m2_712_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_1', image('m2_8_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_2', image('m2_8_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_3', image('m2_8_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_4', image('m2_8_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_5', image('m2_8_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_6', image('m2_8_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_7', image('m2_8_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_1', image('m2_8_8_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_2', image('m2_8_8_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_3', image('m2_8_8_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_4', image('m2_8_8_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_5', image('m2_8_8_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_6', image('m2_8_8_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_7', image('m2_8_8_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_8', image('m2_8_8_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_8_9', image('m2_8_8_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_810', image('m2_8_810'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_811', image('m2_8_811'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_812', image('m2_8_812'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_813', image('m2_8_813'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_814', image('m2_8_814'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_815', image('m2_8_815'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_816', image('m2_8_816'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_817', image('m2_8_817'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_818', image('m2_8_818'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_8_9', image('m2_8_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_810', image('m2_810'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_811', image('m2_811'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_812', image('m2_812'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_813', image('m2_813'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_814', image('m2_814'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_815', image('m2_815'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_816', image('m2_816'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_817', image('m2_817'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_818', image('m2_818'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_819', image('m2_819'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_820', image('m2_820'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_1', image('m2_821_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_2', image('m2_821_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_3', image('m2_821_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_4', image('m2_821_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_5', image('m2_821_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_6', image('m2_821_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_7', image('m2_821_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_8', image('m2_821_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_821_9', image('m2_821_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_82110', image('m2_82110'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_82111', image('m2_82111'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_822', image('m2_822'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_823', image('m2_823'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_1', image('m2_9_1_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_2', image('m2_9_1_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_3', image('m2_9_1_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_4', image('m2_9_1_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_5', image('m2_9_1_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_6', image('m2_9_1_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_7', image('m2_9_1_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_8', image('m2_9_1_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_1_9', image('m2_9_1_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_110', image('m2_9_110'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_111', image('m2_9_111'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_112', image('m2_9_112'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_113', image('m2_9_113'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_114', image('m2_9_114'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_2', image('m2_9_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_3', image('m2_9_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_4', image('m2_9_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_5', image('m2_9_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_6', image('m2_9_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_7', image('m2_9_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_8', image('m2_9_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_9_9', image('m2_9_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_910', image('m2_910'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_911', image('m2_911'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_912', image('m2_912'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_913', image('m2_913'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_1', image('m2_915_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_2', image('m2_915_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_3', image('m2_915_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_4', image('m2_915_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_5', image('m2_915_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_6', image('m2_915_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_7', image('m2_915_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_8', image('m2_915_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_915_9', image('m2_915_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_91510', image('m2_91510'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_91511', image('m2_91511'), '', '', '', '', choose_row_btn],
    [text(''), 'm2_91512', image('m2_91512'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_1', image('m210_1_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_2', image('m210_1_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_3', image('m210_1_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_4', image('m210_1_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_5', image('m210_1_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_6', image('m210_1_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_7', image('m210_1_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_8', image('m210_1_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_1_9', image('m210_1_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_110', image('m210_110'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_111', image('m210_111'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_112', image('m210_112'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_113', image('m210_113'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_114', image('m210_114'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_115', image('m210_115'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_116', image('m210_116'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_117', image('m210_117'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_118', image('m210_118'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_119', image('m210_119'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_120', image('m210_120'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_121', image('m210_121'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_122', image('m210_122'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_123', image('m210_123'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_2', image('m210_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_3', image('m210_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_4', image('m210_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_5', image('m210_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_6', image('m210_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_7', image('m210_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_8', image('m210_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm210_9', image('m210_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm21010', image('m21010'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_1', image('m21011_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_2', image('m21011_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_3', image('m21011_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_4', image('m21011_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_5', image('m21011_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_6', image('m21011_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_7', image('m21011_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm21011_8', image('m21011_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm21012', image('m21012'), '', '', '', '', choose_row_btn],
    [text(''), 'm21013', image('m21013'), '', '', '', '', choose_row_btn],
    [text(''), 'm21014', image('m21014'), '', '', '', '', choose_row_btn],
    [text(''), 'm21015', image('m21015'), '', '', '', '', choose_row_btn],
    [text(''), 'm21016', image('m21016'), '', '', '', '', choose_row_btn],
    [text(''), 'm21017', image('m21017'), '', '', '', '', choose_row_btn],
    [text(''), 'm21018', image('m21018'), '', '', '', '', choose_row_btn],
    [text(''), 'm21019', image('m21019'), '', '', '', '', choose_row_btn],
    [text(''), 'm21020', image('m21020'), '', '', '', '', choose_row_btn],
    [text(''), 'm21021', image('m21021'), '', '', '', '', choose_row_btn],
    [text(''), 'm21022', image('m21022'), '', '', '', '', choose_row_btn],
    [text(''), 'm21023', image('m21023'), '', '', '', '', choose_row_btn],
    [text(''), 'm21024', image('m21024'), '', '', '', '', choose_row_btn],
    [text(''), 'm21025', image('m21025'), '', '', '', '', choose_row_btn],
    [text(''), 'm21026', image('m21026'), '', '', '', '', choose_row_btn],
    [text(''), 'm21027', image('m21027'), '', '', '', '', choose_row_btn],
    [text(''), 'm21028', image('m21028'), '', '', '', '', choose_row_btn],
    [text(''), 'm21029', image('m21029'), '', '', '', '', choose_row_btn],
    [text(''), 'm21030', image('m21030'), '', '', '', '', choose_row_btn],
    [text(''), 'm21031', image('m21031'), '', '', '', '', choose_row_btn],
    [text(''), 'm21032', image('m21032'), '', '', '', '', choose_row_btn],
    [text(''), 'm21033', image('m21033'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_1', image('m21035_1'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_2', image('m21035_2'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_3', image('m21035_3'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_4', image('m21035_4'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_5', image('m21035_5'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_6', image('m21035_6'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_7', image('m21035_7'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_8', image('m21035_8'), '', '', '', '', choose_row_btn],
    [text(''), 'm21035_9', image('m21035_9'), '', '', '', '', choose_row_btn],
    [text(''), 'm2103510', image('m2103510'), '', '', '', '', choose_row_btn],
    [text(''), 'm2103511', image('m2103511'), '', '', '', '', choose_row_btn],
    [text(''), 'm2103512', image('m2103512'), '', '', '', '', choose_row_btn],
    [text(''), 'm2103513', image('m2103513'), '', '', '', '', choose_row_btn],
    [text(''), 'm2103514', image('m2103514'), '', '', '', '', choose_row_btn],
    [text(''), 'm2103515', image('m2103515'), '', '', '', '', choose_row_btn],
    [text(''), 'm21036', image('m21036'), '', '', '', '', choose_row_btn],
    [text(''), 'm21037', image('m21037'), '', '', '', '', choose_row_btn],
]; 

//as a guide only.
var olddataset = [

    // Title input
    [
        "عنوان رئيسى", "title", 
        image('title'),
        "", "", "", "عنوان رئيسى",
        `<div class='settings'>
<input id='in1' value='عنوان رئيسى' type='text'>
<label for='in1'>:العنوان</label> 
</div>
`+choose_row_btn
    ],

    [text("أوجد مجموعة الحل فى ح للمعادلة : د(س)=0 فى كل شكل."), "d m00_1", image('m00_1'), 
     "L0", "ص13س1", "graphs", "حل المعادلة", choose_row_btn],

    [text(""), "", image('m00_1'), 
     "", "", "", "", choose_row_btn],

    [text("إذا كان منحنى الدالة التربيعية د يقطع محور السينات فى النقطتين (2،0)،(-3،0) فإن مجموعة حل المعادلة : د(س)=0 فى ح هى"), "s m00_2_1", image('m00_2_1'), 
     "L0", "ص13س2-1", "MCQ", "حل المعادلة", choose_row_btn],

    [text("مجموعة حل المعادلة :س^2-س=0 فى ح هى"), "s m00_2_2", image('m00_2_2'), 
     "L0", "ص13س2-2", 
     "MCQ", "حل المعادلة", choose_row_btn],

    [text("إذا كانت: د(س)=س^2+بس+ج،س=2 أحد جذرى المعادلة:د(س)=0 فإن:د(2)="), "s m00_2_3", image('m00_2_3'), 
     "L0", "ص13س2-3", "MCQ", "حل المعادلة", choose_row_btn],

    [text("إذا كان: س=3 جذراً للمعادلة:س^2+مس=3 فإن: م="), "d m00_2_4", image('m00_2_4'), 
     "L0", "ص13س2-4", "MCQ", "حل المعادلة", choose_row_btn],

    [text("إذا كان أحد جذرى المعادلة: س^2-16=0 هو 4 فإن الجذر الأخر هو"), "s m00_2_5", image('m00_2_5'), 
     "L0", "ص13س2-5", "MCQ", "حل المعادلة", choose_row_btn],

    [text("أوجد جبرياً مجموعة حل كل من المعادلات الآتية فى ح :"), "s m00_3", image('m00_3'), 
     "L0", "ص13س3", "quest", "حل المعادلة", choose_row_btn],

    [text("أوجد فى ح مجموعة حل كل من المعادلات الآتية باستخدام القانون العام مقرباً الناتج لرقم عشرى واحد :"), "m00_4", image('m00_4'), 
     "L0", "ص14س4", "quest", "حل المعادلة", choose_row_btn],

    [text("أوجد فى ح مجموعة حل كل من المعادلات الآتية جبرياً وحقق الناتج بيانياً :"), "d m00_5", image('m00_5'), 
     "L0", "ص14س5", "quest", "حل المعادلة", choose_row_btn],

    [text("إذا كان مجموع الأعداد الصحيحة المتتالية (1+2+3+...+ن) يعطى بالعلاقة: ج=ن/2(1+ن) فكم عدداً صحيحاً متتالياً بدءاً من العدد 1 يكون مجموعها مساوياً :"), "m00_6", image('m00_6'), 
     "L0", "ص14س6", "quest", "حل المعادلة", choose_row_btn],

    [text("الشرط الذى يجعل المعادلة: اس^2+بس+ج=0 تربيعية هو"), "m00_7_1", image('m00_7_1'), 
     "L0", "ص14س7-1", "MCQ", "حل المعادلة", choose_row_btn],

    [text("إذا كان : (ص-4)^2=36 ، ص<0 فإن : ص+4="), "m00_7_2", image('m00_7_2'), 
     "L0", "ص14س7-2", "MCQ", "حل المعادلة", choose_row_btn],

    [text("إذا كان : س=4 أحد جذرى المعادلة : س^2+مس=4 فإن :"), "m00_7_3", image('m00_7_3'), 
     "L0", "ص14س7-3", "MCQ", "حل المعادلة", choose_row_btn],

    [text("الجذر المشترك للمعادلتين التربيعيتين: س^2-3س+2=0 ، 2س^2-5س+2=0 هو"), "m00_7_4", image('m00_7_4'), 
     "L0", "ص14س7-4", "MCQ", "حل المعادلة", choose_row_btn],

    [text("إذا كان المنحني : ص=س(ا-س) فأي من العبارات التالية يكون صحيحاً ؟"), "m00_7_5", image('m00_7_5'), 
     "L0", "ص15س7-5", "MCQ", "حل المعادلة", choose_row_btn],

    [text("الشكل المقابل يمثل المنحنى : ص=اس^2+بس+ج فأى مما يأتى صحيح ؟"), "m00_7_6", image('m00_7_6'), 
     "L0", "ص15س7-6", "MCQ", "حل المعادلة", choose_row_btn],

    [text("فى الشكل المقابل : إذا كان حجم متوازى المستطيلات = 40سم^2 فإن : س= سم"), "m00_7_7", image('m00_7_7'), 
     "L0", "ص15س7-7", "MCQ", "حل المعادلة", choose_row_btn],

    [text("فى الشكل المقابل : إذا كان مساحة المستطيل = 78 سم^2 فإن محيط المستطيل = سم"), "m00_7_8", image('m00_7_8'), 
     "L0", "ص15س7-8", "MCQ", "حل المعادلة", choose_row_btn],

    [text("قطعة أرض على شكل مستطيل بعداه 6 ، 9 من الأمتار يراد مضاعفة مساحة هذه القطعة وذلك بزيادة كل من بعديها بنفس المقدار فإن المقدار المضاف يساوى أمتار."), "m00_7_9", image('m00_7_9'), 
     "L0", "ص15س7-8", "MCQ", "حل المعادلة,تطبيق", choose_row_btn],

    [text("أوجد قيمة ا التى تجعل س=2 أحد جذرى المعادلة:"), "m00_8", image('m00_8'), 
     "L0", "ص15س8", "quest", "حل المعادلة", choose_row_btn],

    [text("إذا كانت د(س)=اس^2+بس+ج ، د(0)=-3 أوجد قيمة : ا ، ب ، ج إذا علم أن جذرى المعادلة : د(س)=0 هما3 ، -1/2"), "m00_9", image('m00_9'), 
     "L0", "ص15س9", "quest", "حل المعادلة", choose_row_btn],

    [text(""), "m11_1", image('m11_1'), 
     "L0", "ص15س9", "quest", "حل المعادلة", choose_row_btn],
]; 

