function copyText() {
	/* Getting the text field */
	var copyText = document.getElementById('output');
	
	/* Select the text field */
	copyText.select();
  
	/* Copy the text inside the text field */
	navigator.clipboard.writeText(copyText.value.trim());
	
	/* Alert */
	alert('Translation Copied!');
}


