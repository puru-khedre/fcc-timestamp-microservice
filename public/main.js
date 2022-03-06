let form = document.querySelector(".form-div form");
function puru() {
  let date = form[0].value;
  console.log(date);
  form.action = `api/${date}`;
  form.submit();
}
