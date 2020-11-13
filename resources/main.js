/* ALERT: PLAY ON ${https://www.youtube.com/watch?v=dQw4w9WgXcQ} when developing this file*/


/*

// Diable F5 Button
function disableButtonsDown(e) { 
    if ((e.which || e.keyCode) == 116) e.preventDefault(); 
};
$(document).on("keydown", disableButtonsDown);


// Disable Right click
document.addEventListener('contextmenu', event => event.preventDefault());

*/





$(window).load(function() {

    $(".se-pre-con").delay(10).fadeOut("slow");

});


/* dataSet custom variables to make me write less stuff when adding data to table :D */ // bandtio say OMG
var choose_row_btn = "<button class='btn_1 icon-plus'><span>أختر</span></button>";
function image(image){return "<img class='img' src='./images/"+image+".png' alt='img'>"};

function text(txt){
    return `<div id="textCell" title="${txt}" style="height:50px;overflow: hidden; text-overflow: ellipsis;">
                ${txt}
            </div>`;
};
/* -------------------------------------------------------------------------------- */
var dataSet = [

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
		
    	[text("أوجد مجموعة الحل فى ح للمعادلة : د(س)=0 فى كل شكل."), "m00_1", image('m00_1'), 
         "L0", "ص13س1", "graphs", "حل المعادلة", choose_row_btn],

        [text("إذا كان منحنى الدالة التربيعية د يقطع محور السينات فى النقطتين (2،0)،(-3،0) فإن مجموعة حل المعادلة : د(س)=0 فى ح هى"), "m00_2_1", image('m00_2_1'), 
         "L0", "ص13س2-1", "MCQ", "حل المعادلة", choose_row_btn],
    
        [text("مجموعة حل المعادلة :س^2-س=0 فى ح هى"), "m00_2_2", image('m00_2_2'), 
         "L0", "ص13س2-2", 
         "MCQ", "حل المعادلة", choose_row_btn],
    
        [text("إذا كانت: د(س)=س^2+بس+ج،س=2 أحد جذرى المعادلة:د(س)=0 فإن:د(2)="), "m00_2_3", image('m00_2_3'), 
         "L0", "ص13س2-3", "MCQ", "حل المعادلة", choose_row_btn],

        [text("إذا كان: س=3 جذراً للمعادلة:س^2+مس=3 فإن: م="), "m00_2_4", image('m00_2_4'), 
         "L0", "ص13س2-4", "MCQ", "حل المعادلة", choose_row_btn],

        [text("إذا كان أحد جذرى المعادلة: س^2-16=0 هو 4 فإن الجذر الأخر هو"), "m00_2_5", image('m00_2_5'), 
         "L0", "ص13س2-5", "MCQ", "حل المعادلة", choose_row_btn],

        [text("أوجد جبرياً مجموعة حل كل من المعادلات الآتية فى ح :"), "m00_3", image('m00_3'), 
         "L0", "ص13س3", "quest", "حل المعادلة", choose_row_btn],

        [text("أوجد فى ح مجموعة حل كل من المعادلات الآتية باستخدام القانون العام مقرباً الناتج لرقم عشرى واحد :"), "m00_4", image('m00_4'), 
         "L0", "ص14س4", "quest", "حل المعادلة", choose_row_btn],

        [text("أوجد فى ح مجموعة حل كل من المعادلات الآتية جبرياً وحقق الناتج بيانياً :"), "m00_5", image('m00_5'), 
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

    ]; 


$(document).ready(function(){
    
    // INIT vars 
    var ict2 = 1
    var tileSources = [{type: 'image', url: '' }, {type: 'image', url: '' }]
    // This var for ( Remove Button ) sound click only * H A D A D Y *
    var audio = new Audio("resources/btnclk.wav"); 

    /* radio-active */ 
    var t = $('#full_table').DataTable( {
        
        rowReorder:true,
        data: dataSet,
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

        "columnDefs": [{
				"searchable": true,
				"orderable": false,
				"targets": 0,
				"className": "dt-center", 
				"targets": "_all"
        }], 
        "lengthChange":false,
        "paging":false,
        "bPaginate":false,
        "order": [[ 4, 'asc' ]],
        "bAutoWidth": false,
        "bInfo":false,
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
    
    // draw temp index increament on column 0.
    t.on('order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
		});
    }).draw();
    
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
    
    // draw temp index increament on column 0.
    t.on('order.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
		});
    }).draw();
    
    
    
    
    /* move row between tables */ 
    $(".btn_1").on('click', function() {

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
    


   
    // IMAGE VIEWER CODE  //
    tileSources = tileSources.map(function(tileSource, i) {
      return {
        tileSource: tileSource,
        opacity: i === 0 ? 1 : 0,
        preload: i === 1 ? true : false
      };
    });
    
    
    // Img Zooming Plugin
    var viewer = OpenSeadragon({
        id: "wheelzoom.exe",
        prefixUrl: './resources/openseadrag/images/', /* icons path */
        tileSource: tileSources,
    });
    var index = 1;
    $('#ToggleImages').on('click', function () {
      var oldTiledImage = viewer.world.getItemAt(index);

      index = (index + 1) % tileSources.length;
      var nextIndex = (index + 1) % tileSources.length;

      var newTiledImage = viewer.world.getItemAt(index);
      var nextTiledImage = viewer.world.getItemAt(nextIndex);

      oldTiledImage.setOpacity(0);
      newTiledImage.setOpacity(1);
      nextTiledImage.setPreload(true);
    }); 
    // IMAGE VIEWER CODE SEMI-END //
    
    /* collect data from table 2 by button click */
    $( "#collect_data_t2" ).click(function() {
        
        
        if (empty_table.data().count() == 0) {
            swal("يرجي اختيار مسائل اولاً", {
                button: "حسناً",
            });
        } 
        
        else {
            $('#collect_data_t2').fadeOut();
            $('#ToggleImages').fadeOut();
            var id_per_row = empty_table.columns(1).data().toArray()[0];
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
            
            async function run() {
              tileSources = await eel.hi(id_per_row, dict)(); 
              console.log("Got this from Python: " + tileSources[0]);
              console.log("Got this from Python: " + tileSources[1]);
              viewer.open( [{type: 'image', url: tileSources[1] }, {type: 'image', url: tileSources[0] }] ); 
              index = 1;
              $('#collect_data_t2').show();
              $('#ToggleImages').show();
            }

            run();
        }
        
    });
    
    
    // and this code for all button sound click * H A D A D Y *
    $("button").on('click', function() {
                
        var audio = new Audio("resources/btnclk.wav");
        audio.play();

    });

    // teansfir active class for tabs
    $(".nav-link").click(function() {

        $('.nav-link').removeClass('active');
        $(this).addClass('active');

    });
    
}); 
// End docmennt ready

$(document).on('keyup', 'table input', function() {

    $(this).attr('value',$(this).val());

}); 



// Trigger Tabs PLugin
new Tabby('[data-tabs]');
