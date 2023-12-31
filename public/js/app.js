const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg2.textContent = data.forecast;
      }
    });
  });
});
