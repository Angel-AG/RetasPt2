let slider = tns({
    container: '.my-slider',
    "slideBy": "1", 
    "speed": 400,
    "nav": false,
    controlsContainer: "#controls",
    prevButton: ".previous",
    nextButton: ".next",
    responsive: {
        1600: {
            items: 6, 
            gutter: 25
        },
        1024: {
            items: 4, 
            gutter: 25
        },
        768: {
            items: 2, 
            gutter: 25
        }, 
        480: {
            items: 1,
            gutter: 25
        }
    }

})