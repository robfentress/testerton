$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('committed') === "true") {
        $("#committed").show();
    };
});