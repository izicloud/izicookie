// start izicookie //
//var izitypes = ["necessary", "functionality", "tracking", "marketing"];
//var izitypes = ["necessary", "functionality", "tracking"];
var izitypes = ["necessary", "functionality"];
var izicookie = {};
var initgoogle = false;

var theOkButton = document.querySelector(".izicookies-accept-button-text"); //the Button
var theAnpassenButton = document.querySelector(".izicookies-accept-button-text2"); //the Button
var theCheckAllButton = document.querySelector(".izicookies-checkall-button-text"); //the Button
var theDenyAllButton = document.querySelector(".izicookies-denyall-button-text"); //the Button

var theResetButton = document.querySelector(".izicookies-reset");





/******/
document.addEventListener('DOMContentLoaded', () => {
  const openPopupButton = document.getElementById('open-cookie-popup');
  const closePopupButton = document.getElementById('close-cookie-popup');
  const popup = document.getElementById('cookiepopup');

	var hasAcceptedCookies = getCookiebannerCookie("hasAcceptedCookies"); // 0 / 1
  let popupVisible = false;

  // Function to show the popup
  const showPopup = () => {
    popup.classList.add('show'); // Apply the 'show' class to trigger the animation
    popup.classList.remove('hidden'); // Remove 'hidden' class to display the popup
	theOkButton.addEventListener("click", saveCookieClicked);
	theAnpassenButton.addEventListener("click", showAnpassen);
	theCheckAllButton.addEventListener("click", checkAll);
	theDenyAllButton.addEventListener("click", denyAll);
  };

  // Function to hide the popup
  const hidePopup = () => {
    popup.classList.remove('show'); // Remove the 'show' class to reverse the animation
    setTimeout(() => {
      popup.classList.add('hidden'); // Add 'hidden' class to remove the popup from the display after animation
    }, 400); // Timeout matches the CSS transition duration (0.4s)
  };

 
  
 
 // Function to open popup on scroll
  const scrollCookie = () => {
	
	 if (window.scrollY > 300) {
        if (!popupVisible) {
            showPopup();
            popupVisible = true; // Update the flag when the popup is shown
        }
    } else {
        if (popupVisible) {
            hidePopup();
            popupVisible = false; // Update the flag when the popup is hidden
        }
    }
  }; 
  
// Function to show the popupButton
  const showOpenPopupButton = () => {
    openPopupButton.style.display = "block";
	  document.addEventListener("scroll", scrollCookie);
  }; 
// Function to hide the popupButton
const hideOpenPopupButton = () => {
  openPopupButton.style.display = "none";
  
}; 

// Function to accept all cookies
const checkAll = () => {
  var items = document.getElementsByClassName("izicookiecheck");
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") items[i].checked = true;
  }
  saveCookieClicked();
  
}; 

// Function to deny all cookies
const denyAll = () => {
  var items = document.getElementsByClassName("izicookiecheck");
  for (var i = 1; i < items.length; i++) { // i=1 start from 2nd element (first ist necessary)
    if (items[i].type == "checkbox") items[i].checked = false;
  }
  saveCookieClicked();
  
}; 

// Function to delete the Cookei and start over
const deleteIziCookie = () => {
  document.cookie ="hasAcceptedCookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie ="iziCookieConsent=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie ="allowTracking=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  showOpenPopupButton();
  
}; 

// Function to show the checkboxes
const showAnpassen = () => {
  document.querySelector(".izicookies-checkboxes").classList.add("zeigen");
  document.querySelector(".annehmen").classList.add("zeigen");
  document.querySelector(".anpassen").classList.add("hide");
  document.querySelector(".cookieinfotext").classList.add("hide");
  
}; 


  // Event listener to open the popup
  openPopupButton.addEventListener('click', showPopup);

  // Event listener to close the popup
  closePopupButton.addEventListener('click', hidePopup);

  // Optional: Close popup when clicking outside of the content area
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      hidePopup();
    }
  });
  if (hasAcceptedCookies != 1) {
	  // not accepted
	  showOpenPopupButton();
	} else {
	  /*** check every type ***/
	  var iziCookieConsent = JSON.parse(getCookiebannerCookie("iziCookieConsent")); //json
	  for (var i = 0; i < izitypes.length; i++) {
		if (iziCookieConsent[izitypes[i]] == 1) {
			if(izitypes[i]=='tracking'){
				setCookiebannerCookie('allowTracking', 1, 365);
			}
		} else {
		  if(izitypes[i]=='tracking'){
				setCookiebannerCookie('allowTracking', 0, 365);
			}
		  removeScripts(izitypes[i]);
		}
	  }
	  if (theResetButton) {
		theResetButton.addEventListener("click", function(event){
			event.preventDefault();
			document.cookie ="hasAcceptedCookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			document.cookie ="iziCookieConsent=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			document.cookie ="allowTracking=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			showOpenPopupButton();
			showPopup();
		});
	  }
	}
  


  // Function to save the Cookie 
  const saveCookieClicked = () => {
    var mbcBanner = document.querySelector(".izicookies"); // hide our user interface that shows our A2HS button
    //console.log("cookiebutton clicked");
  
    setCookiebannerCookie("hasAcceptedCookies", 1, 365);
  
    for (var i = 0; i < izitypes.length; i++) {
      if (document.getElementById(izitypes[i]).checked === true) {
      //  console.log(izitypes[i] + "is checked");
        izicookie[izitypes[i]] = 1;
        if(izitypes[i]=='tracking' && initgoogle){

          initializeGoogleAnalytics();
          
        }
      } else {
        //console.log(izitypes[i] + "is not checked");
        izicookie[izitypes[i]] = 0;
        removeScripts(izitypes[i]);
      }
    }
  //  console.log("izicookie ", izicookie);
    setTimeout(function () {
      hidePopup();
      hideOpenPopupButton();
    }, 200);
 
    var myJSONcookie = JSON.stringify(izicookie);
    //console.log("myJSONcookie ", myJSONcookie);
    setCookiebannerCookie("iziCookieConsent", myJSONcookie, 365);
    document.removeEventListener("scroll", scrollCookie);


  }; 

  

 

  
});

/******/



function setCookiebannerCookie(cname, cvalue, exdays) {
  //console.log("cookie " + cname);
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  //console.log(expires);
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
  //console.log("the cookie:" + document.cookie);
}

function getCookiebannerCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}







/****
 * click on button in banner
 */


/*****
 * remove Scripts of given type
 */
function removeScripts(stype) {
  var allOfThem = document.querySelectorAll(
    '[data-izi-cookie-consent="' + stype + '"]'
  );
  for (var i = 0; i < allOfThem.length; i++) {
    allOfThem[i].parentNode.removeChild(allOfThem[i]);
  }
}


