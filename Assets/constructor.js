/* =========================================================== "/" 

  Message: Console identifier 
  URL: HTML relative path ( browser.extension.getURL() )
  ID: html id
  HTML: DOM element object
  Place: Query for parent element
  Style: {
    src: style relative path
    id: style ID
  }

/" =========================================================== */


function constructor(message, url, id, html, place, style, callback) {
  try {
    if(style) { buildStyle(style, message) }
    build(message, url, id, html, place, callback)
  } catch(err) { 
    error('Error - ' + message, [
      ['Message: ', message],
      ['Path: ', url],
      ['ID: ', id],
      ['HTML: ', html],
      ['Place: ', place],
      ['Style: ', style],
      ['Callback: ', callback],
    ], err)
  }
}

function buildStyle(style, message) {
  const link = document.createElement('link');
  link.rel = 'stylesheet'; 
  link.type = 'text/css';
  link.href = style.src;
  link.id = style.id
  document.querySelector('head').appendChild(link); 
}

function build(message, url, id, html, place, callback) {
  const xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      html.innerHTML = this.responseText;
      document.querySelector(place).appendChild(html)
    }
  };
  xml.open("GET", url, true);
  xml.send();
  xml.onerror = err => { 
    error('Error - ' + message, [
      ['Message: ', message],
      ['Path: ', url],
      ['ID: ', id],
      ['HTML: ', html],
      ['Place: ', place],
      ['Callback: ', callback],
    ], err )
  }
  xml.onloadend = callback
}


// =========================================================== //


function quickBuild(element, place, style) {
  try {
    const css = document.createElement('style');
    css.id = style.id;
    css.innerHTML = style.css
    document.querySelector('head').appendChild(css); 
    document.querySelector(place).appendChild(element)
  } catch (err) {
    error('Error on quick build', [
      ['Element:', element],
      ['Place:', place],
      ['Style', style]
    ], err)
  }
}

// =========================================================== //

function onClick(query, func, type = 'click') {
  try {
    document.querySelectorAll(query).forEach(element => {
      element.addEventListener(type, func)
    })
  } catch (err) {
    error('Error on add event listener - ' +  query, [
      ['Function:', func],
      ['Query:', query],
      ['Type:', type]
    ], err)
  }
}

function newClick(query, func, prevFunc, type = 'click') {
  try {
    document.querySelectorAll(query).forEach(element => {
      element.removeEventListener(type, prevFunc)
      element.addEventListener(type, func)
    })
  } catch (err) {
    error('Error on add new event listener - ' +  query, [
      ['Function:', func],
      ['Previous function:', prevFunc],
      ['Query:', query],
      ['Type:', type]
    ], err)
  }
}

// =========================================================== //

function remove(query, message = 'Remove elements') {
  try {
    document.querySelectorAll(query).forEach(element => {
      element.remove()
    })
  } catch (err) {

  }
}