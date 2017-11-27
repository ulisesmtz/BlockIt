$(document).ready(function() {
	
	$('#selectAll').click(function () {
		$(this).closest("table").find("td input:checkbox").prop("checked", this.checked);
	});
	
	$(".deleteSelected").click(function() {
		$('input.checkRow:checkbox:checked').each(function(){
			$(this).closest('tr').remove();
			$("#selectAll").prop("checked", false);
		});
	});
	
	$("#table").on("click", ".deleteRow", function() {
		$(this).closest('tr').remove();
	});
	
	$(document).on("click", ".addRow", function() {
		$('#table tr:last').after('<tr><td><input type="checkbox" class="checkRow"/></td><td>New</td><td><button value="Delete" class="deleteRow">Delete</button></td></tr>');
	});

});