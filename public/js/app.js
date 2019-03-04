const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  msg1.textContent = "Searching...";
  msg2.textContent = "";

  fetch(`/weather?location=${searchInput.value}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.place;
        msg2.textContent = data.forecast;
      }
    });
  });
});
