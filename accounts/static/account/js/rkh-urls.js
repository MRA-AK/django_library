/*!
 * Get target URLs
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
	var URLMenu = document.getElementsByClassName('urls-menu')[0]
	var URLAddresses = URLMenu.getElementsByClassName('url-address')
	for(var i = 0; i < URLAddresses.length; i++) 
	{
		var URL = URLAddresses[i]
		URL.addEventListener('click', add_target_url)
	}

	var existURL = document.getElementsByClassName('exsit-url')
	//display none the exist urls in list
	for (var i = 0; i < URLAddresses.length; i++)
	{
		for(var j = 0; j < existURL.length; j++) 
		{
			if( existURL[j].innerHTML == URLAddresses[i].innerHTML )
			{
				URLAddresses[i].style.display='none';
			}
		}
	}
	var removeButtons = document.getElementsByClassName('remove-url')
	for(var i = 0; i < removeButtons.length; i++) 
	{
		var removeButton = removeButtons[i]
		removeButton.addEventListener('click', remove_target_url)
	}

	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.addEventListener('click', submit_urls)
}

function add_target_url(event) {
	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.innerHTML = "Submit"
	// submitButton.style.backgroundColor = '#4E73DF';
	// submitButton.style.borderColor = '#4E73DF';

	var URLClicked = event.target
	var URLAddress = URLClicked.innerHTML
	var addFlag = true

	// to remove target url from choosable url list
	event.target.style.display = 'none';

	var existURL = document.getElementsByClassName('exsit-url')
	for(var i = 0; i < existURL.length; i++)
	{
		var URL = existURL[i].innerHTML
		if(URLAddress == URL)
		{
			addFlag = false
		}
	}

	if(addFlag)
	{
		var newURLDiv = document.createElement('div')
		var newURL = `
					<nav style="background:white; border-radius:5px; margin-bottom:0px !important;" class="navbar navbar-expand navbar-light mb-4">
					
						<span class="navbar-brand exsit-url" style="cursor:default;">${URLAddress}</span>
						<div class="col-sm col-btn-nas" >
								<span style="cursor:pointer; float:right;" class="btn btn-danger btn-circle btn-sm remove-url">
								<i class="fas fa-trash"></i>
							</span>
						</div>
					</nav>
					`
		
		newURLDiv.innerHTML = newURL			
		var URLSection = document.getElementsByClassName('urls-section')[0]
		URLSection.append(newURLDiv)

		newURLDiv.getElementsByClassName('remove-url')[0].addEventListener('click', remove_target_url)

		var URLObj = {}
		var URLs = []
		var existURL = document.getElementsByClassName('exsit-url')

		if(existURL.length > 0)
		{
			for(var i = 0; i < existURL.length; i++)
			{
				URLs.push(existURL[i].innerHTML)
			}
			URLObj.targetURLs = URLs
			console.log(URLObj)
			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/savedomain/', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.send(JSON.stringify(URLObj))
		}
	}
}

function remove_target_url(event) {
	// console.log('remove')
	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.innerHTML = "Submit"
	// submitButton.style.backgroundColor = '#4E73DF';
	// submitButton.style.borderColor = '#4E73DF';

	var URLClicked = event.target
	var URLDiv = URLClicked.parentElement.parentElement.parentElement

	var existURL = document.getElementsByClassName('exsit-url')
	var URLAddress = URLDiv.getElementsByClassName('exsit-url')[0].innerHTML
	if(existURL.length > 1)
	{
		//show again removed url in the choosable url list
		var URLMenu = document.getElementsByClassName('urls-menu')[0]
		var URLAddresses = URLMenu.getElementsByClassName('url-address')
		for(var i = 0; i < URLAddresses.length; i++) 
		{
			if( URLAddress == URLAddresses[i].innerHTML )
			{
				URLAddresses[i].style.display='block';
			}
		}
		URLDiv.remove()

		var URLObj = {}
		var URLs = []

		for(var i = 0; i < existURL.length; i++)
		{
			URLs.push(existURL[i].innerHTML)
		}
		URLObj.targetURLs = URLs
		console.log(URLObj)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/savedomain/', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(JSON.stringify(URLObj))
	}
	else
	{
		alert("Sorry! you can't delete all target links\nat least one target link required")
	}
}

// function submit_urls(event) {
// 	var URLObj = {}
// 	var URLs = []

// 	var submitButton = event.target
// 	var existURL = document.getElementsByClassName('exsit-url')
// 	console.log(existURL.length)

// 	if(existURL.length > 0)
// 	{
// 		for(var i = 0; i < existURL.length; i++)
// 		{
// 			URLs.push(existURL[i].innerHTML)
// 		}
// 		submitButton.innerHTML = "Submitted"
// 		submitButton.style.backgroundColor = '#1CC88A'
// 		submitButton.style.borderColor = '#1CC88A'

// 		URLObj.targetURLs = URLs
// 		//SEND OBJECT TO BACKEND
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", '/savedomain/', true);
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// 		xhr.send(JSON.stringify(URLObj))
// 	}
// 	else
// 	{
// 		submitButton.innerHTML = "No URL Chosen"
// 		submitButton.style.backgroundColor = '#F6C23E';
// 		submitButton.style.borderColorr = '#F6C23E'
// 	}
// }