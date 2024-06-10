const lengthSlider = document.querySelector('.char-length-slider');
const charCount = document.querySelector('.char-count');


const getSliderVal = () => {
charCount.textContent = lengthSlider.value;
}

const styleRangeSlider = () => {
const min = lengthSlider.min;
const max = lengthSlider.max;
const val = lengthSlider.value;

lengthSlider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

const handleSliderInput = () => {
getSliderVal();
styleRangeSlider();
}
charCount.textContent = lengthSlider.value;
lengthSlider.addEventListener('input', handleSliderInput);