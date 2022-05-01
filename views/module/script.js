// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }  
          form.classList.add('was-validated')
        }, false)
      })
  })();

const showAddPageFormButton = document.querySelector("#show-add-page-form-button");
const addPageForm = document.querySelector(".page-form-container");

showAddPageFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    addPageForm.classList.remove("hidden");
    showAddPageFormButton.classList.add("hidden");
});

const getQueryParams = (param) => {
	let url = window.location.search.substring(1);
	let variables = url.split('&');
	for (var i = 0; i < variables.length; i++){
		var paramName = variables[i].split('=');
		if (paramName[0] == param){
				return paramName[1];
		}
	}
};

let sort = getQueryParams("sort");
console.log(sort);
let latestSortButton = document.querySelector("#latest-sort-button");
let oldestSortButton = document.querySelector("#oldest-sort-button");


if(sort === "latest"){
  latestSortButton.classList.add("active-button");
  oldestSortButton.classList.remove("active-button");
}
else if(!sort || sort === "oldest"){
  oldestSortButton.classList.add("active-button");
  latestSortButton.classList.remove("active-button");
}


