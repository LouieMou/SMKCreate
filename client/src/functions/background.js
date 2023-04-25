/* Importing global colors */
const yellow = getComputedStyle(document.documentElement).getPropertyValue(
    "--secondary-yellow"
  );

const green = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-green"
  );
const dusty_blue = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-dusty-blue"
  );
const dark_blue = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-dark-blue"
  );

const blue = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-blue"
  );
const brown = getComputedStyle(document.documentElement).getPropertyValue(
    "--SMK-brown"
  );

const turquoise = getComputedStyle(document.documentElement).getPropertyValue(
    "--accented-turquoise"
  );

// Color array based on global colors
const colorArray = [yellow, green, dusty_blue, dark_blue, blue, brown, turquoise]


export function setBackgroundColor(color) {        
    document.documentElement.style.setProperty('--background-color', color)
}

export function randomizeBackground(){
    const randomColor = colorArray[Math.floor(Math.random()*colorArray.length)]
    setBackgroundColor(randomColor);
    return randomColor;
}

export function setWhiteBackground(){
  const white = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-white"
  );
  setBackgroundColor(white);
}


