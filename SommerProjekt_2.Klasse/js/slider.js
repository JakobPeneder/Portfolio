function loadFilter(number) {
  sessionStorage.setItem('Index', number);
  console.log(sessionStorage.getItem('Index'));
  window.location.href = "./filter.html";
}
function filterop() {
  sessionStorage.setItem('Index', 0);
}