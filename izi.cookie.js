/**
 * @name iziCookie
 * @version 2.0 [September 30, 2020]
 * @author izicloud.ch
 * @copyright Copyright 2020 izicloud.ch [hello at izicloud.ch]
 * @fileoverview iziCookie ist ein Script für die Information zur Verwendung von Cookies gemäss <tt>DSGVO</tt>.
 *  <p>
 *  Die Richtlinien des European Data Protection Board (EDPB) (Europäischer Datenschutzausschuss) vom Mai 2020 stellen klar, 
 *  was eine gültige Zustimmung auf Websites in Übereinstimmung mit der DSGVO ist.
 *  <p>
 *  Die EDPB-Richtlinien besagen, dass der Cookie-Banner auf Ihrer Website keine vorher angekreuzten Kontrollkästchen haben darf, 
 *  und dass das fortgesetzte Scrollen oder Browsen durch die Nutzer nicht als gültige Zustimmung zur Verarbeitung personenbezogener 
 *  Daten angesehen werden kann.
 *  <p>
 *  Die Nutzer müssen freiwillig eine klare und bestätigende Erklärung abgeben, um ihre Zustimmung zu erteilen, damit Ihre Website 
 *  Cookies aktivieren und persönliche Daten verarbeiten kann.
 *
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /*!
  *  izicookie types
  */

  //var izitypes=['necessary','functionality','tracking','targeting'];
var izitypes=['necessary','functionality','tracking'];
var izicookie= {};

var theOkButton=document.querySelector('.izicookies-accept-button-text');
var theCheckAllButton=document.querySelector('.izicookies-checkall-button-text');
var theResetButton=document.querySelector('.izicookies-reset');

var hasAcceptedCookies = getCookiebannerCookie("hasAcceptedCookies"); // 0 / 1


function setCookiebannerCookie(cname, cvalue, exdays) {
    console.log('cookie ' + cname);
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    console.log( expires);
    document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
    console.log('the cookie:' + document.cookie);
}

function getCookiebannerCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        c = c.substring(1);
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if(hasAcceptedCookies!=1){
    // not accepted
    console.log('showBanner');
    showCookieBanner();
}else{
    var mbcBanner = document.querySelector(".izicookies");  
    mbcBanner.style.display = 'none';  // hide the prompt
    /***
     * check every type
     */
    var iziCookieConsent = JSON.parse(getCookiebannerCookie("iziCookieConsent"));
    for (var i = 0; i < izitypes.length; i++) {
      if(iziCookieConsent[izitypes[i]]==1){
        console.log('has accepted ' + izitypes[i]);
      }else{
        console.log('has not accepted ' + izitypes[i]);
        removeScripts(izitypes[i]);
      }
  }
  if(theResetButton){
  theResetButton.addEventListener("click", deleteIziCookie);
  }
}


function showdetail(elem){
  var klik = document.getElementById(elem);
  elements = document.getElementsByClassName("cookieDetail");
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display="none";
  }
  klik.style.display = 'block';
}

function showCookieBanner() {
    var mbcBanner = document.querySelector(".izicookies");
    mbcBanner.style.display = "block";
    theOkButton.addEventListener("click", saveCookieClicked);
    theCheckAllButton.addEventListener("click", checkAll);
    
  }

  function checkAll(){
    var items = document.getElementsByClassName('izicookiecheck');
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox')
            items[i].checked = true;
    }
    saveCookieClicked();
  }

/****
 * click on button in banner
 */
function saveCookieClicked() {  
    var mbcBanner = document.querySelector(".izicookies");
    mbcBanner.style.display = 'none'; 

    console.log('cookiebutton clicked');

    setCookiebannerCookie('hasAcceptedCookies', 1, 365);

    for (var i = 0; i < izitypes.length; i++) {
     if(document.getElementById(izitypes[i]).checked===true){
      console.log(izitypes[i]+ 'is checked');
      izicookie[izitypes[i]]=1;
    }else{
      console.log(izitypes[i]+ 'is not checked');
      izicookie[izitypes[i]]=0;
      removeScripts(izitypes[i]);
    }
    }
    console.log('izicookie ', izicookie);

    var myJSONcookie = JSON.stringify(izicookie);
    console.log('myJSONcookie ', myJSONcookie);
    setCookiebannerCookie('iziCookieConsent',myJSONcookie,365);

}
function deleteIziCookie( ) {
  document.cookie = 'hasAcceptedCookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  showCookieBanner();
}



/*****
 * remove Scripts of given type
 */
function removeScripts(stype){

  var allOfThem=document.querySelectorAll('[izi-cookie-consent="'+ stype +'"]');
  for (var i = 0; i < allOfThem.length; i++) {
    allOfThem[i].parentNode.removeChild(allOfThem[i]);
  }

}





