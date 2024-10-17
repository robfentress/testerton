$(document).ready(function () {
    $('#search').on('submit', function (e) {
        // validation code here
        alert("Imagine this returns results.");
        e.preventDefault();

    });

    $('.page-header a, .breadcrumb a, .page-sidebar a').click(function (e) {
        alert("Imagine this takes you to a page that is appropriate for the visible link text.");
        e.preventDefault();
    });
});