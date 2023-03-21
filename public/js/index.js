const inp = document.querySelector("#search");
const list = document.querySelector(".list");

const createElement = (data) => {
  list.innerHTML = "";
  data.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("value");
    li.textContent = element;
    list.appendChild(li);
  });
};

inp.addEventListener("keyup", (e) => {
  if(e.target.value === ''){
    list.innerHTML = ''
    return 
  }
  api("GET", `/search?q=${e.target.value}`);
});