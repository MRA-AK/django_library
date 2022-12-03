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
	var addEmailButtons = document.getElementsByClassName('add-email')
	for(var i = 0; i < addEmailButtons.length; i++) 
	{
		var addEmail = addEmailButtons[i]
		addEmail.addEventListener('click', add_target_email)
	}

	var removeEmailButtons = document.getElementsByClassName('remove-email')
	for(var i = 0; i < removeEmailButtons.length; i++) 
	{
		var removeEmail = removeEmailButtons[i]
		removeEmail.addEventListener('click', remove_target_email)
	}

	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.addEventListener('click', submit_emails)
}

function add_target_email(event) {
	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.innerHTML = "Submit"
	// submitButton.style.backgroundColor = '#4E73DF';
	// submitButton.style.borderColor = '#4E73DF';
	var emailsObj = {}
	var emails = []
	var new_flag = true

	var enterdValueDiv = document.getElementsByClassName('email-value')[0]
	var enterdValue = enterdValueDiv.value
	if(enterdValue.length > 0)
	{
		var oldEmails = document.getElementsByClassName('user-email-value')
		for(var i=0; i < oldEmails.length; i++)
		{
			var exsitEmail = oldEmails[i].value
			if(enterdValue == exsitEmail)
			{
				new_flag = false
			}
		}
		if(new_flag)
		{
			if(enterdValue.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
			{
				new_flag = true
			}
			else
			{
				new_flag = false
				alert('Invalid Email!')
			}
		}
		if(new_flag)
		{
			var targetEmailDiv = document.getElementsByClassName('emails-section')[0]
			
			var newEmailDiv = document.createElement('div')
			newEmailDiv.classList.add('form-group')
			newEmailDiv.classList.add('row')
			newEmailDiv.classList.add('target-emails')
			var newEmail = `
							<div class="col-sm-8 mb-3 mb-sm-0">
								<input type="text" class="form-control form-control-user user-email-value" id="exampleFirstName"
									placeholder="Destination Email" value=${enterdValue} disabled>
								</div>
								<div class="col-sm-2 col-btn-nas">
									<a href="#" class="btn btn-danger btn-circle btn-sm-nas remove-email">
									<i class="fas fa-minus"></i>
								</a>
							</div>
		                	`
		    newEmailDiv.innerHTML = newEmail
		    targetEmailDiv.append(newEmailDiv)

			newEmailDiv.getElementsByClassName('remove-email')[0].addEventListener('click', remove_target_email)	

			enterdValueDiv.value = ""	
		}
	}
	var emailsValue = document.getElementsByClassName('user-email-value')
	for(var i=0; i < emailsValue.length; i++)
	{
		var email = emailsValue[i].value
		emails.push(email)
	}
	console.log(emails)
	if(emails.length > 0)
	{
		emailsObj.email_address = emails
		console.log(emailsObj)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/saveemail/', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(JSON.stringify(emailsObj))
	}
}

function remove_target_email(event) {
	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.innerHTML = "Submit"
	// submitButton.style.backgroundColor = '#4E73DF';
	// submitButton.style.borderColor = '#4E73DF';
	var emailsObj = {}
	var emails = []

	var targetEmailsRows = document.getElementsByClassName('target-emails')
	if(targetEmailsRows.length > 2)
	{
		var clickedButton = event.target
		if(clickedButton.className == "fas fa-minus")
		{
			clickedButton.parentElement.parentElement.parentElement.remove()
		}
		else
		{
			clickedButton.parentElement.parentElement.remove()
		}

		var emailsValue = document.getElementsByClassName('user-email-value')
		for(var i=0; i < emailsValue.length; i++)
		{
			var email = emailsValue[i].value
			emails.push(email)
		}
		
		if(emails.length > 0)
		{
			emailsObj.email_address = emails
			console.log(emailsObj)
			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/saveemail/', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.send(JSON.stringify(emailsObj))
		}
	}
	else
	{
		alert("Sorry! you can't delete all distination emails\nat least one email required")
	}
}

// function submit_emails(event) {
// 	var emailsObj = {}
// 	var emails = []

// 	var submitButton = event.target

// 	var emailsValue = document.getElementsByClassName('target-emails')
// 	for(var i=0; i < emailsValue.length; i++)
// 	{
// 		var email = emailsValue[i].getElementsByClassName('email-value')[0].value
// 		if(email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
// 		{
// 			emails.push(email)
// 		}
// 	}

// 	emails = emails.filter(element => {return element !== '';})
// 	if(emails.length > 0)
// 	{	
// 		if(emails.length == 1)
// 		{
// 			submitButton.innerHTML = emails.length.toString() + " Valid Email Submitted"
// 		}
// 		else
// 		{
// 			submitButton.innerHTML = emails.length.toString() + " Valid Emails Submitted"
// 		}
// 		submitButton.style.backgroundColor = '#1CC88A'
// 		submitButton.style.borderColor = '#1CC88A'

// 		emailsObj.targetEmails = emails
// 		console.log(emailsObj)
// 		//SEND OBJECT TO BACKEND
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", '/saveemail/', true);
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// 		xhr.send(JSON.stringify(emailsObj))
// 	}
// 	else
// 	{
// 		submitButton.innerHTML = "No Valid Email Chosen"
// 		submitButton.style.backgroundColor = '#F6C23E';
// 		submitButton.style.borderColorr = '#F6C23E'
// 	}
// }