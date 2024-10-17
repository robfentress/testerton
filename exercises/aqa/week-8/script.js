(function () {

    const menuLinks = document.querySelectorAll('#navbarNav a, a.navbar-brand, footer a');
    const book = document.getElementById('book');

    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", function (e) {
            alert("Imagine this takes you to a page that makes sense given the link name.");
            e.preventDefault();
        });
    }

    book.addEventListener("submit", (e) => {
        // validation code here
        alert("Imagine this submits the form.");
        e.preventDefault();

    });

})()