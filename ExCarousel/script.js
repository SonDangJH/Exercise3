function runProgram() {   
    document.querySelector('.prev').addEventListener('click',function() {
        plusSlides(-1);
    })
    document.querySelector('.next').addEventListener('click',function() {
        plusSlides(1);
    })
    document.querySelectorAll('.dot').forEach((element) => {
        element.addEventListener('click', function() {
            currentSlide(element.getAttribute("data-index"));
        })
    })

    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        slideIndex = n
        showSlides(n);
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }
}

runProgram();
