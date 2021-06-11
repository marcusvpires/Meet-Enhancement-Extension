function background()  {
  try {
    if (document.querySelector('.R3Gmyc')) {
      console.clear()
      importStyle()
      dashboard(() => { implant() })
    } else {
      setTimeout(background, 5000)
    }
  } catch (error) {
    setError('Error on start meet enhancement package', error, true)
  }
}

function importStyle() {
  const head = document.querySelector('head'); 
  const link = document.createElement('link');
  link.rel = 'stylesheet'; 
  link.type = 'text/css';
  link.href = browser.extension.getURL("resources/styles.css"); 
  head.appendChild(link); 
}

background()