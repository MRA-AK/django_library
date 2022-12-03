/*!
 * Get destination Emails
 * 
 * 
 */

 console.log("Ramin Khoshbin Presented...")


if (document.readyState == 'loading') 
{
    document.addEventListener('DOMContentLoaded', main)
} 
else 
{
    main()
}

function main() {
	// var startDate = document.getElementById("start-date")
	// startDate.addEventListener('blur', submit_start_date)
	// startDate.addEventListener('mouseout', submit_start_date)

	var freqValue = document.getElementById("freq-value")
	freqValue.addEventListener('change', submit_frequency_value)

}

function submit_start_date(event) {
	var freqObj = {}

	// var startDateInput = document.getElementById("start-date").value
	// var freqValueInput = document.getElementById("freq-value").value

	// if(startDateInput.length > 0)
	// {
	// 	// yyyy-MM-dd'T'HH:mm
	// 	var seperatorIndex = startDateInput.search('T')
	// 	var date = startDateInput.slice(0, seperatorIndex)
	// 	var time = startDateInput.slice(seperatorIndex + 1, startDateInput.length)
	// 	var freq = freqValueInput

	// 	freqObj.date = date
	// 	freqObj.time = time
	// 	freqObj.frequency = freq
	// 	console.log(freqObj)

	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open("POST", '/savefrequency/', true);
	// 	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	// 	xhr.send(JSON.stringify(freqObj))
	// }
	// else
	// {
	// 	alert("Sorry! Information is incomplete\nboth date and time in start date are required")
	// }

	var freqValueInput = document.getElementById("freq-value").value
	var freq = freqValueInput
	freqObj.frequency = freq
	console.log(freqObj)

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/savefrequency/', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(JSON.stringify(freqObj))

	setTimeout(location.reload.bind(location), 1000);
}

function submit_frequency_value(event) {
	var freqObj = {}

	// var startDateInput = document.getElementById("start-date").value
	// var freqValueInput = document.getElementById("freq-value").value

	// if(startDateInput.length > 0)
	// {
	// 	// yyyy-MM-dd'T'HH:mm
	// 	var seperatorIndex = startDateInput.search('T')
	// 	var date = startDateInput.slice(0, seperatorIndex)
	// 	var time = startDateInput.slice(seperatorIndex + 1, startDateInput.length)
	// 	var freq = freqValueInput

	// 	freqObj.date = date
	// 	freqObj.time = time
	// 	freqObj.frequency = freq
	// 	console.log(freqObj)

	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open("POST", '/savefrequency/', true);
	// 	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	// 	xhr.send(JSON.stringify(freqObj))
	// }
	// else
	// {
	// 	alert("Sorry! Information is incomplete\nboth date and time in start date are required")
	// }
	var freqValueInput = document.getElementById("freq-value").value
	var freq = freqValueInput
	freqObj.frequency = freq
	console.log(freqObj)

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/savefrequency/', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(JSON.stringify(freqObj))

	setTimeout(location.reload.bind(location), 1000);
}
