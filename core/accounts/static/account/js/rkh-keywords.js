/*!
 * Get target Keywords
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
	var addKeywordButtons = document.getElementsByClassName('add-keywords')
	for(var i = 0; i < addKeywordButtons.length; i++) 
	{
		var addKeyword = addKeywordButtons[i]
		addKeyword.addEventListener('click', add_target_keyword)
	}

	var removeKeywordButtons = document.getElementsByClassName('remove-keywords')
	for(var i = 0; i < removeKeywordButtons.length; i++) 
	{
		var removeKeyword = removeKeywordButtons[i]
		removeKeyword.addEventListener('click', remove_target_keyword)
	}

	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.addEventListener('click', submit_keywords)
}

function add_target_keyword(event) {
	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.innerHTML = "Submit"
	// submitButton.style.backgroundColor = '#4E73DF';
	// submitButton.style.borderColor = '#4E73DF';
	var keywordsObj = {}
	var keywords = []
	var new_flag = true

	var enterdValueDiv = document.getElementsByClassName('keyword-value')[0]
	var enterdValue = enterdValueDiv.value
	if(enterdValue.length > 0)
	{
		var old_keys = document.getElementsByClassName('user-keywords')
		for(var i=0; i < old_keys.length; i++)
		{
			var exsitKeyword = old_keys[i].value
			if(enterdValue == exsitKeyword)
			{
				new_flag = false
			}
		}
		if(new_flag)
		{
			var targetKeywordDiv = document.getElementsByClassName('keywords-section')[0]

			var newKeywordDiv = document.createElement('div')
			newKeywordDiv.classList.add('form-group')
			newKeywordDiv.classList.add('row')
			newKeywordDiv.classList.add('target-keywords')
			var newKeyword = `
							<div class="col-sm-8 mb-3 mb-sm-0">
								<input type="text" class="form-control form-control-user user-keywords" id="exampleFirstName"
									placeholder="target keyword" value=${enterdValue} disabled>
								</div>
								<div class="col-sm-2 col-btn-nas">
									<a href="#" class="btn btn-danger btn-circle btn-sm-nas remove-keywords">
									<i class="fas fa-minus"></i>
								</a>
							</div>
		                	`
		    newKeywordDiv.innerHTML = newKeyword
		    targetKeywordDiv.append(newKeywordDiv)

			newKeywordDiv.getElementsByClassName('remove-keywords')[0].addEventListener('click', remove_target_keyword)
		}
		enterdValueDiv.value = ""
	}

	var keywordsValue = document.getElementsByClassName('user-keywords')
	for(var i=0; i < keywordsValue.length; i++)
	{
		var keyword = keywordsValue[i].value
		keywords.push(keyword)
	}
	keywords = keywords.filter(element => {return element !== '';})
	
	if(keywords.length > 0)
	{
		keywordsObj.targetKeywords = keywords
		console.log(keywordsObj)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/savekeyword/', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(JSON.stringify(keywordsObj))
	}
	else
	{
		keywordsObj.targetKeywords = ['@ALL#']
		console.log(keywordsObj)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/savekeyword/', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(JSON.stringify(keywordsObj))
	}
}

function remove_target_keyword(event) {
	// var submitButton = document.getElementsByClassName('submit-btn')[0]
	// submitButton.innerHTML = "Submit"
	// submitButton.style.backgroundColor = '#4E73DF';
	// submitButton.style.borderColor = '#4E73DF';

	var clickedButton = event.target
	if(clickedButton.className == "fas fa-minus")
	{
		clickedButton.parentElement.parentElement.parentElement.remove()
	}
	else
	{
		clickedButton.parentElement.parentElement.remove()
	}

	var keywordsObj = {}
	var keywords = []
	var keywordsValue = document.getElementsByClassName('user-keywords')
	for(var i=0; i < keywordsValue.length; i++)
	{
		var keyword = keywordsValue[i].value
		keywords.push(keyword)
	}
	keywords = keywords.filter(element => {return element !== '';})
	if(keywords.length > 0)
	{
		keywordsObj.targetKeywords = keywords
		console.log(keywordsObj)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/savekeyword/', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(JSON.stringify(keywordsObj))
	}
	else
	{
		keywordsObj.targetKeywords = ['@ALL#']
		console.log(keywordsObj)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/savekeyword/', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(JSON.stringify(keywordsObj))		
	}
}

// function submit_keywords(event) {
// 	var keywordsObj = {}
// 	var keywords = []

// 	var submitButton = event.target

// 	var keywordsValue = document.getElementsByClassName('target-keywords')
// 	for(var i=0; i < keywordsValue.length; i++)
// 	{
// 		var keyword = keywordsValue[i].getElementsByClassName('keyword-value')[0].value
// 		keywords.push(keyword)
// 	}

// 	keywords = keywords.filter(element => {return element !== '';})
// 	if(keywords.length > 0)
// 	{
// 		submitButton.innerHTML = "Submitted"
// 		submitButton.style.backgroundColor = '#1CC88A'
// 		submitButton.style.borderColor = '#1CC88A'

// 		keywordsObj.targetKeywords = keywords
// 		console.log(keywordsObj)
// 		//SEND OBJECT TO BACKEND
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", '/savekeyword/', true);
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// 		xhr.send(JSON.stringify(keywordsObj))
// 	}
// 	else
// 	{
// 		keywordsObj.targetKeywords = ['@ALL#']
// 		console.log(keywordsObj)
// 		//SEND OBJECT TO BACKEND
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", '/savekeyword/', true);
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// 		xhr.send(JSON.stringify(keywordsObj))

// 		submitButton.innerHTML = "Will Scrape Whole Target Websites"
// 		submitButton.style.backgroundColor = '#F6C23E';
// 		submitButton.style.borderColorr = '#F6C23E'
// 	}
// }