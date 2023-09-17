function fetchData() {
	$.ajax({
			url: 'data.json', // Ganti dengan URL data Anda
			type: 'GET',
			dataType: 'json',
			success: function(data) {
					buildTable(data);
					setTimeout(fetchData, 10000); // Memuat data setiap 10 detik
			},
			error: function(xhr, status, error) {
					console.error(error);
					setTimeout(fetchData, 10000); // Memuat data setiap 10 detik jika terjadi kesalahan
			}
	});
}

function buildTable(data) {
	var table = $('#dataTables');
	var tbody = $('<tbody>');

	table.find('tbody').empty();

	data.forEach(function(item) {
			var row = $('<tr>');
			for (let i = 0; i <= 7; i++) {
				if(i == 0){
					row.append($('<td>').text(item['essid']));
				} else if(i == 1){
					row.append($('<td>').text(item['mac']));
				} else if(i == 2){
					row.append($('<td>').text(item['vendor']));
				} else if(i == 3){
					row.append($('<td>').text(item['encryption']));
				} else if(i == 4){
					row.append($('<td>').text(item['frequency'] + ' ' + item['frequency_units']));
				} else if(i == 5){
					row.append($('<td>').text(item['channel']));
				} else if(i == 6){
					row.append($('<td>').html(setStatus(item['signal_level'])));
				}else{
					var aaa = document.createElement('a');
					aaa.setAttribute('class', 'btn btn-primary');
					aaa.setAttribute('href', '/?mac='+item['mac']+'&essid'+item['essid']);
					aaa.innerHTML = 'Select';
					row.append($('<td>').html(aaa));
				}
			}
			tbody.append(row);
	});

	table.append(tbody);
}

function setStatus(val){
	var label = document.createElement('lable');
	if (val >= -30 && val <= -1) {
			label.classList.add('status', 'green');
	} else if (val >= -50 && val <= -31) {
			label.classList.add('status', 'yellow');
	} else if (val >= -70 && val <= -51) {
			label.classList.add('status', 'red');
	} else {
			label.classList.add('status', 'gray');
	}
	label.innerText = val + ' dBm';
	return label
}
fetchData();