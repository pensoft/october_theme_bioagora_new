$(document).ready(function() {
    $('#searchInput').selectize({
        plugins: ["clear_button", "remove_button", "restore_on_backspace"],
        create: true,
        valueField: 'value',
        labelField: 'text',
        searchField: 'text',
        load: function (query, callback) {
            if (query.length < 1) {
                callback([]);
                return;
            }
            $.request('onSearchRecords', {
                data: {query: query},
                success: function (response) {
                    callback(response);
                }
            });
        },
        render: {
            option_create: function (data, escape) {
                return '<div class="create">Search for: <strong>' + escape(data.input) + '</strong>&hellip;</div>';
            }
        },
        highlight: true,
        sortField: 'text',
        loadThrottle: 300,
        noResultsText: 'No results found',
        onChange: function (value) {
            updateLibraryList();
        }
    });

// $('#dateFrom').on('change', updateLibraryList());
// $('#dateTo').on('change', updateLibraryList());

    var dateFormat = 'yy-mm-dd';
    $('#dateFrom').datepicker({
        dateFormat: dateFormat,
        onSelect: function (value) {
            updateLibraryList();
        }
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });
    $('#dateTo').datepicker({
        dateFormat: dateFormat,
        onSelect: function (value) {
            updateLibraryList();
        }
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });

    var from = $("#dateFrom")
            .datepicker({
                changeMonth: true,
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $("#dateTo").datepicker({
            changeMonth: true,
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    $('#applyFilter').on('click', updateLibraryList());

    $('#clearFilter').click(function() {
        $('#dateFrom').val('');
        $('#dateTo').val('');
        $('#searchInput').val('');
        $('#sortFormat').val(0);
        $('#sortProject').val(0);
        updateLibraryList();
    });


    $('#sortFormat, #sortProject').selectize({
        onChange: function(value) {
            updateLibraryList();
        }
    });
});

function getDate( element ) {
    var date;
    try {
        date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
        date = null;
    }

    return date;
}




function updateLibraryList() {
    var sortFormat = $('#sortFormat').val();
    var sortProject = $('#sortProject').val();
    var dateFrom = $('#dateFrom').val();
    var dateTo = $('#dateTo').val();
    var searchTerm = $('#searchInput').val();

    $.request('onSearchRecords', {
        data: {
            searchTerms: searchTerm,
            sortFormat: sortFormat,
            sortProject: sortProject,
            dateFrom: dateFrom,
            dateTo: dateTo,
        },
        update: { 'library_records': '#recordsContainer' }
    });
}


$(document).keydown(function(e) {

    // 191 = /
    if (e.keyCode === 191) {
        e.preventDefault();
        $('#searchInput')[0].selectize.focus();
    }

    // 27 = esc
    if (e.keyCode === 27) {
        e.preventDefault();
        $('#searchInput')[0].selectize.close();
        $('#searchInput')[0].selectize.blur();
    }
});
