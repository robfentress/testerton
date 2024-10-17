(function () {
  function processForm(e) {
    if (e.preventDefault) e.preventDefault();
      alert("Imagine this returns results.");

    // You must return false to prevent the default form behavior
    return false;
  }

  var form = document.getElementById('search');
  if (form.attachEvent) {
      form.attachEvent("submit", processForm);
  } else {
      form.addEventListener("submit", processForm);
  }

  let menuLinks = document.querySelectorAll('.page-header a, .breadcrumb a, .page-sidebar a');

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function (e) {
      alert("Imagine this takes you to a page that makes sense given the link name.");
      e.preventDefault();
    });
  }
  
})()

