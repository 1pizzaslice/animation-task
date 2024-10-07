
document.addEventListener('mousemove', function(event) {
    const minicircle = document.getElementById('minicircle');
    minicircle.style.left = event.pageX + 'px';
    minicircle.style.top = event.pageY + 'px';
});
