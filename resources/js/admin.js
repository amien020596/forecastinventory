require('./bootstrap');

// $.noConflict();

$(document).ready(function () {

	"use strict";

	[].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
		new SelectFx(el);
	});

	$('.selectpicker').selectpicker;


	$('#menuToggle').on('click', function (event) {
		$('body').toggleClass('open');
	});

	$('.search-trigger').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	// $('.user-area> a').on('click', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.user-menu').parent().removeClass('open');
	// 	$('.user-menu').parent().toggleClass('open');
	// });
	var t = $('.table').DataTable({
		"ordering": true,
		columnDefs: [{
			orderable: false,
			targets: "no-sort"
		},
		{
			orderable: false,
			searchable: false,
			targets: 0
		}, 
		],
	});


	// var t = $('.table').DataTable( {
    //     "columnDefs": [ {
    //         "searchable": false,
    //         "orderable": false,
    //         "targets": 0
    //     } ],
    //     "order": [[ 1, 'asc' ]]
    // } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
	} ).draw();
	
	$('.select2').select2();
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})


isNumberKey = function (evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;

	// let regex = new RegExp("^\d{1,2}(?:\.\d{1,9})?$");
	// console.log($(evt.target).val());
}




swalDelete = function (trigger, e) {
	let uri = $(trigger).attr('href');
	let text = $(trigger).attr('delete-text');
	let form = $(trigger).find('form');
	e.preventDefault();
	swal({
		title: text,
		text: "Data yang telah dihapus tidak dapat dikembalikan.",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#e3342f',
		cancelButtonColor: '#3490dc',
		confirmButtonText: 'Hapus',
		cancelButtonText: 'Batal'
	}).then((result) => {
		if (result.value) {
			form.submit();
		}
	})
}

confirmLogout = function (trigger, e) {
	let uri = $(trigger).attr('href');
	let text = $(trigger).attr('confirmation-text');
	let form = $(trigger).find('form');
	e.preventDefault();
	swal({
		title: text,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#e3342f',
		cancelButtonColor: '#3490dc',
		confirmButtonText: 'Keluar',
		cancelButtonText: 'Batal'
	}).then((result) => {
		if (result.value) {
			form.submit();
		}
	})
}

chainSelect = function (trigger, target, baseUri) {
	let source = $(trigger).val();
	let url = baseUri + "/" + source;

	$.ajax({
		type: "get",
		url: url,
		success: function (res) {
			let innerHtml = "<option value='0'>-- Pilih Periode Penjualan --</option>";
			if (res instanceof Array && res.length > 0) {
				$.each(res, function (index, value) {
					innerHtml += `<option value="${value.period}">${value.period}</option>`;
				});
			}

			$(target).html(innerHtml);
		},
		error: function (res) {
			console.log(res);
		}
	})

}

swalUpdateStatus = function (trigger, e) {
	let uri = $(trigger).attr('href');
	let title = $(trigger).attr('update-title');
	let text = $(trigger).attr('update-text');
	let form = $(trigger).find('form');
	e.preventDefault();
	swal({
		title: title,
		text: text,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#e3342f',
		cancelButtonColor: '#3490dc',
		confirmButtonText: 'Ya',
		cancelButtonText: 'Tidak'
	}).then((result) => {
		if (result.value) {
			form.submit();
		}
	})
}

chainSelect = function(trigger, target, baseUri, chain_query_param = null) {
	let source = $(trigger).val();
	let url = baseUri +"/"+ source;
	let compare_againts = chain_query_param !== null 
							? getParameterByName(chain_query_param)
							: 0;
	$.ajax({
		type: "get",
		url: url,
		success: function(res) {
			let innerHtml = `<option value='0'>-- ${res.text} --</option>`;
			if (res.data instanceof Array && res.data.length > 0) {
				$.each(res.data, function(index, value) {
					innerHtml += `<option value="${value.option_id}" ${value.option_id === compare_againts ? "selected" : ""}>${value.option_text}</option>`;
				});
			} 

			$(target).html(innerHtml);
		},
		error: function (res) {
			console.log(res);
		}
	})
	
}

getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

swalGetdata = function (trigger, e) {
	let uri = $(trigger).attr('href');
	let title = $(trigger).attr('get-title');
	let text = $(trigger).attr('get-text');
	let form = $(trigger).find('form');
	e.preventDefault();
	swal({
		title: title,
		text: text,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#e3342f',
		cancelButtonColor: '#3490dc',
		confirmButtonText: 'Ya',
		cancelButtonText: 'Tidak'
	}).then((result) => {
		if (result.value) {
			form.submit();
		}
	})
}