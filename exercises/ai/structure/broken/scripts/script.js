(function () {

    const links = document.querySelectorAll('.nav a, .navbar a, .download-list a');
    const search = document.getElementById('search');

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

})()