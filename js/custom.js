$(document).ready(function(){
$(".toggle-btn").click(function(){
$("body").addClass("toggle");
});

$(".closed-btn").click(function(){
$("body").removeClass("toggle");
});

});

document.addEventListener('DOMContentLoaded', () => {
    const tableWrapper = document.querySelector('.table-wrapper');
    let isDragging = false;
    let startX;
    let scrollLeft;

    tableWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        tableWrapper.classList.add('active');
        startX = e.pageX - tableWrapper.offsetLeft;
        scrollLeft = tableWrapper.scrollLeft;
        tableWrapper.style.cursor = 'grabbing'; // Change cursor to grabbing while dragging
    });

    tableWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        tableWrapper.classList.remove('active');
        tableWrapper.style.cursor = 'grab'; // Reset cursor when leaving
    });

    tableWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        tableWrapper.classList.remove('active');
        tableWrapper.style.cursor = 'grab'; // Reset cursor when mouse up
    });

    tableWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tableWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fastness
        tableWrapper.scrollLeft = scrollLeft - walk;
    });
});

let zindex = 10

$(document).ready(function(){
    $(".business-list .action").click(function(){
        $(this).css('z-index', zindex);
        zindex++;
    });
});

document.querySelectorAll('details').forEach((detail) => {
    detail.addEventListener('click', function() {
        document.querySelectorAll('details').forEach((otherDetail) => {
            if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
                otherDetail.removeAttribute('open');
            }
        });
    });
});