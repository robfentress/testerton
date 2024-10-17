(function () {

    const links = document.querySelectorAll('nav a, .download-list a');
    const search = document.getElementById('searchForm');

    const img = document.querySelector('#img');
    const codeBlock = document.querySelector('#codeBlock');
    const pre = document.querySelector('#pre');
    const toggler = document.querySelector('#toggler');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (e) {
            alert("Imagine this takes you to a page that makes sense give the link name.");
            e.preventDefault();
        });
    }

    search.addEventListener("submit", (e) => {
        alert("Imagine this submits the form.");
        e.preventDefault();

    });
    
    const toggleCode = function(e) {
        e.preventDefault();
        if (toggler.innerText === 'show code') {
            toggler.innerText = 'show image';
            codeBlock.classList.remove('d-none');
            img.classList.add('d-none');
            pre.focus();
        } else {
            toggler.innerText = 'show code';
            img.classList.remove('d-none');
            codeBlock.classList.add('d-none');
            img.focus();
        }
    }
    toggler.addEventListener('click', toggleCode);

})()