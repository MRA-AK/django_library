/*!
 * Hide/Show not interested LOTs 
 * 
 * 
 */

console.log("Ramin Khoshbin Presented...")
var isVisible = false

if (document.readyState == 'loading') 
{
    document.addEventListener('DOMContentLoaded', main)
} 
else 
{
    main()
}

function main() {
    updateShowButton()

    let readSwitches = document.getElementsByClassName('read-checkbox')
    for(let i = 0; i < readSwitches.length; i++) {
        let readSwitche = readSwitches[i]
        readSwitche.addEventListener('click', readAction) 
    }

    let interestSwitches = document.getElementsByClassName('interest-checkbox')
    for(let i = 0; i < interestSwitches.length; i++) {
        let interestSwitche = interestSwitches[i]
        interestSwitche.addEventListener('click', intererstAction)
    }

    let showHiddenButton = document.getElementsByClassName('show-hidden')[0]
    showHiddenButton.addEventListener('click', showHiddens)

}

function updateShowButton() {
    let interestSwitches = document.getElementsByClassName('interest-checkbox')
    let lotsTable = document.getElementById('dataTable')
    var hiddenItems = lotsTable.getElementsByClassName('d-none').length
    for(let i = 0; i < interestSwitches.length; i++) {
        let interestSwitche = interestSwitches[i]
        let isIntersted = !interestSwitche.checked
        if(!isIntersted) {
            document.getElementsByClassName('show-hidden')[0].disabled = false
        }
    }
}

function readAction(event) {
    let selectedRow = event.target.parentElement.parentElement.parentElement
    let cells = selectedRow.cells;
    title = cells[0].innerHTML
    link = cells[1].querySelector("a").getAttribute("href")
    let readButton = selectedRow.getElementsByClassName('read-checkbox')[0]
    isRead = readButton.checked
    let interestButton = selectedRow.getElementsByClassName('interest-checkbox')[0]
    isIntersted = !interestButton.checked

    if((!event.target.checked) && (!isIntersted)) {
        console.log("DEFUALT")
        interestButton.checked = false
    }

    var hideObj = {}
    // hideObj.title = title
    hideObj.link = link
    hideObj.isRead = isRead
    hideObj.isIntersted = isIntersted
    console.log(hideObj)

    // Post data
    var xhr = new XMLHttpRequest();
	xhr.open("POST", '/saveinterested/', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(JSON.stringify(hideObj))

    updateShowButton()
}

function intererstAction(event) {
    let selectedRow = event.target.parentElement.parentElement.parentElement
    let cells = selectedRow.cells;
    title = cells[0].innerHTML
    link = cells[1].querySelector("a").getAttribute("href")
    let readButton = selectedRow.getElementsByClassName('read-checkbox')[0]
    isRead = readButton.checked
    let interestButton = selectedRow.getElementsByClassName('interest-checkbox')[0]
    isIntersted = !interestButton.checked

    if((event.target.checked) && (!isVisible)) {
        setTimeout(function() { 
            selectedRow.classList.add("d-none")
        }, 500); 
    }
    // else {
    //     setTimeout(function() { 
    //         interestButton.checked = false
    //     }, 500);
    // }
    var hideObj = {}
    // hideObj.title = title
    hideObj.link = link
    hideObj.isRead = isRead
    hideObj.isIntersted = isIntersted
    console.log(hideObj)

    // Post data
    var xhr = new XMLHttpRequest();
	xhr.open("POST", '/saveinterested/', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(JSON.stringify(hideObj))

    updateShowButton()
}

function showHiddens() {
    let lotsTable = document.getElementById('dataTable')
    var hiddenItems = lotsTable.getElementsByClassName('d-none')
    var showButton =  document.getElementsByClassName('show-hidden')[0]
    var showButtonText = showButton.getElementsByClassName('text')[0]
    if(!isVisible) {
        while(hiddenItems.length > 0) {
            hiddenItems = lotsTable.getElementsByClassName('d-none')
            for(let i = 0; i < hiddenItems.length; i++) {
                hiddenItems[i].classList.remove("d-none")
            }
        }
        isVisible = true
        showButtonText.innerHTML = "Hide Not Intersetd"
    }
    else {
            let interestedButtons = document.getElementsByClassName('interest-checkbox')
            for(let i = 0; i < interestedButtons.length; i++) {
                let interestedFlag = interestedButtons[i]
                if(interestedFlag.checked) {
                    interestedFlag.parentElement.parentElement.parentElement.classList.add('d-none')
                }
            }
            isVisible = false
            showButtonText.innerHTML = "Show Not Intersetd"
            let hiddens = lotsTable.getElementsByClassName('d-none')
            console.log(hiddens.length)
            if(hiddens.length > 0) {
                document.getElementsByClassName('show-hidden')[0].disabled = false
            }
            else {
                document.getElementsByClassName('show-hidden')[0].disabled = true
            }

    }
}