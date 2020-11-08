
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


var dataSet = [

		// Title input
        [
			"", "title", 
			"<img class='img' src='./images/title.png' alt='img'>",
			"عنوان رئيسى", 
			"", "", "", "", "عام",
			`<div class='settings'>
				<input id='in1' value='عنوان رئيسى' type='text'>
				<label for='in1'>:العنوان</label> 
			</div>
			<button class='btn_1 icon-plus'><span>أختر</span></button>`
		],
		
    	["", "m00_1", "<img class='img' src='./images/m00_1.png' alt='img'>", "random2 text", 1, 1, "page 11", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_2_1", "<img class='img' src='./images/m00_2_1.png' alt='img'>", "random2 text", 1, 1, "page 11", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],
    
        ["", "m00_2_2", "<img class='img' src='./images/m00_2_2.png' alt='img'>", "random3 text", 1, 1, "page 12", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],
    
        ["", "m00_2_3", "<img class='img' src='./images/m00_2_3.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_2_4", "<img class='img' src='./images/m00_2_4.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_2_5", "<img class='img' src='./images/m00_2_5.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_3", "<img class='img' src='./images/m00_3.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

    ]; 


$(document).ready(function(){
    
    // INIT vars 
    var ict2 = 1
    // This var for ( Remove Button ) sound click only * H A D A D Y *
    var audio = new Audio("resources/btnclk.wav"); 

    /* radio-active */ 
    var t = $('#full_table').DataTable( {

        data: dataSet,
        columns: [
            { title: "index" },
            { title: "id" },
            { title: "image" },
            { title: "text" },
            { title: "year" },
            { title: "lesson" },
            { title: "reference" },
            { title: "type" },
            { title: "tags" },
            { title: "options" }
        ],

        "columnDefs": [{
				"searchable": true,
				"orderable": true,
				"targets": 0,
				"className": "dt-center", 
				"targets": "_all"
        }],
        
        "order": [[ 0, 'asc' ]],
        "pageLength": 50,
        "bAutoWidth": false,
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
        }
        
    });
    
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
            { title: "image" },
            { title: "text" },
            { title: "year" },
            { title: "lesson" },
            { title: "reference" },
            { title: "type" },
            { title: "tags" },
            { title: "options" }
        ],
        "pageLength": 100,
        "bFilter": false,
        "bLengthChange": false,
        "bAutoWidth": false,
        "bPaginate": false,
        
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

        if ($("#empty_table tr").length <= 2) {
            swal("الجدول فارغ بالفعل");
        } else {
            swal({
                title: "هل متأكد من هذه الخطوة ؟",
                text: "بمجرد تفريغ الجدول لن تتمكن من استعادة المسائل مرة اخري",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                empty_table.clear().draw();
                swal("! تم تفريغ الجدول بنجاح", {
                icon: "success",
                });
            } else {
                swal("! تم التراجع عن تفريغ الجدول");
            }
            });
        }

    });

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
 
        // class .r_b_s for ( Remove Button ) sound click *don't get confused*
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
    
    /* collect data from table 2 by button click */
    $( "#collect_data_t2" ).click(function() {
        var id_per_row = empty_table.columns(1).data().toArray()[0];
        var ops_per_row = empty_table.columns(9).data().toArray()[0];
        var id_cols_length = empty_table.rows()[0].length;
        var dict = {}
        console.log(id_cols_length)
        for (var i = 0; i < id_cols_length; i++) {
            //collect options as a dict from table 2 - perparing data to be sent to lord python.
            var sdict = {};
            $('p', ops_per_row[i]).each(function() {
                sdict[$('label[for="'+this.id+'"]').html()]= $(this).text();
            });
            dict[i] = sdict;
        };
        console.log(id_per_row); //[FUTURE]
        console.log(JSON.stringify(dict)); //[FUTURE]
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

// Img Zooming Plugin
var viewer = OpenSeadragon({

	id: "wheelzoom.exe",
	prefixUrl: "./resources/openseadrag/images/", /* icons path */
	tileSources: {
		type: 'image',
		url:  'im.png' /* the image path */
	}

});

// Trigger Tabs PLugin
new Tabby('[data-tabs]');