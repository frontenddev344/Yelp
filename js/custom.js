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



// $(document).ready(function() {
//     $(".js-select2").select2({
//       closeOnSelect: false
//     });
//   });


// select 2 js start

const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    options = wrapper.querySelector(".options");

let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
    "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
    "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
    "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
    "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

let currentFocus = -1;

function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addCountry();

function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

    // Add the 'active' class to the select button
    selectBtn.classList.add("active");
}

function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("selected");
    }
}

function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add("selected");
}

searchInp.addEventListener("keyup", (e) => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;

    let items = options.getElementsByTagName("li");

    if (e.key === "ArrowDown") {
        currentFocus++;
        addActive(items);
    } else if (e.key === "ArrowUp") {
        currentFocus--;
        addActive(items);
    } else if (e.key === "Enter") {
        if (currentFocus > -1) {
            if (items) items[currentFocus].click();
        }
    }
});

selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
    searchInp.focus(); // Focus on the input when the dropdown opens
    currentFocus = -1; // Reset the focus index
});


// select 2 js end


