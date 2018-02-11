function searchYoutube(searchTerm) {
  return fetch("/search/" + searchTerm).then(function(respose) {
    return respose.json();
  });
}

function renderSearchResults(data) {
  return data
    .map(function(item) {
      var id = item.id;
      var title = item.title;
      var thumbnail = item.thumbnail;

      return `
        <a href="https://youtube.com/watch?v=${id}">
          <div style="display: flex">
            <img src="${thumbnail}" /> 
            <h3>${title}</h3>
          </div>
        </a>`;
    })
    .join("");
}

function handleSearchSubmit(event) {
  event.preventDefault();

  var searchTerm = document.getElementById("search-term").value;

  if (!searchTerm) return;

  searchYoutube(searchTerm).then(function(data) {
    var searchResElement = document.getElementById("search-results");

    if (data.error != null) {
      searchResElement.textContent = "Error fetching data";
      return;
    }

    var html = renderSearchResults(data);

    searchResElement.innerHTML = html;
  });
}

function init() {
  var searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", handleSearchSubmit);
}
document.addEventListener("DOMContentLoaded", init);
