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


const contributeToStandardsButton = document.querySelector("#contribute-to-standards-button");
const standardsFormContainer = document.querySelector(".standards-form");

contributeToStandardsButton.addEventListener("click", (event) => {
	event.preventDefault();
	console.log("HIT");
	standardsFormContainer.classList.remove("hidden");
	contributeToStandardsButton.classList.add("hidden");
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

let guidelineSort = getQueryParams("guidelineSort");
console.log(guidelineSort);
let latestGuidelineSortButton = document.querySelector("#guideline-latest-sort-button");
let oldestGuidelineSortButton = document.querySelector("#guideline-oldest-sort-button");


if(guidelineSort === "latest"){
	latestGuidelineSortButton.classList.add("active-button");
	oldestGuidelineSortButton.classList.remove("active-button");
}
else if(!guidelineSort || guidelineSort === "oldest"){
	oldestGuidelineSortButton.classList.add("active-button");
	latestGuidelineSortButton.classList.remove("active-button");
}



let specificationSort = getQueryParams("specificationSort");
console.log(specificationSort);
let latestSpecificationSortButton = document.querySelector("#specification-latest-sort-button");
let oldestSpecificationSortButton = document.querySelector("#specification-oldest-sort-button");


if(specificationSort === "latest"){
	latestSpecificationSortButton.classList.add("active-button");
	oldestSpecificationSortButton.classList.remove("active-button");
}
else if(!specificationSort || specificationSort === "oldest" ){
	oldestSpecificationSortButton.classList.add("active-button");
	latestSpecificationSortButton.classList.remove("active-button");
}


if(guidelineSort){
	latestSpecificationSortButton.href = `?guidelineSort=${guidelineSort}&specificationSort=latest`;
	oldestSpecificationSortButton.href = `?guidelineSort=${guidelineSort}&specificationSort=oldest`;
}

if(specificationSort){
	latestGuidelineSortButton.href = `?guidelineSort=latest&specificationSort=${specificationSort}`;
	oldestGuidelineSortButton.href = `?guidelineSort=oldest&specificationSort=${specificationSort}`;
}