var minDate, maxDate;

// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    var min = minDate.val();
    var max = maxDate.val();
    var date = new Date(data[4]);

    if (
        (min === null && max === null) ||
        (min === null && date <= max) ||
        (min <= date && max === null) ||
        (min <= date && date <= max)
    ) {
        return true;
    }
    return false;
});

$(document).ready(function () {
    

    minDate = new DateTime($("#min"), {
        format: "YYYY/MM/DD",
    });
    maxDate = new DateTime($("#max"), {
        format: "YYYY/MM/DD",
    });

    var table = $("#example").DataTable({

        dom: '<"#topLayer"lBf>rtip',

        //dom: '<B><"clear"<"#l"l><"#r"f>>rtip',
        buttons: [
            {
                extend: "print",
                className: 'button is-primary is-rounded',
                text: '<i class="fa-solid fa-print"></i> Print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '14px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', '14px')
                        .css('color', 'black');
                },
                messageTop: 'Bu çıktı kantar verileridir. MOSAŞ',
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                extend: "excel",
                className: 'button is-primary is-rounded',
                text: '<i class="fa-solid fa-file-excel"></i> Excel',
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                extend: "pdf",
                title: 'KantarVeri',
                text: 'Kantar Veri PDF',
                orientation: 'landscape',
                pageSize: 'A4',
                
                className: 'button is-primary is-rounded',
                text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                extend: "colvis",
                className: 'button is-primary is-rounded',
                text:'<i class="fa-solid fa-eye"></i> Column Visible'
            }
            ,
        ],
        columnDefs: [
            {
                targets: -1,
                visible: false,
            },
        ],
    });

    $('#example_filter input').addClass('input is-primary is-rounded');

    $("#min, #max").on("change", function () {
        table.draw();
    });

    // Insert at the top left of the table
    table
        .buttons()
        .container()
        .appendTo($("div.column.is-half", table.table().container()).eq(0));
});

$(function () {
    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M/DD hh:mm A'
        }
    });
});
