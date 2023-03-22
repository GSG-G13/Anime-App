const inp = document.querySelector("#search");
const list = document.querySelector(".list");
const btn = document.getElementById("btn")
const content = document.querySelector(".content")
const createElement = (data) => {
  list.innerHTML = "";
  data.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("value");
    li.textContent = element;
    list.appendChild(li);
  });
};

const createPost = (data) => {
  data.forEach(e => {
    // console.log(e.attributes.canonicalTitle);
    const card = document.createElement("div")
    card.classList.add("card")
    //========================================
    const imgContent = document.createElement("div")
    imgContent.classList.add("img-content")
    const img = document.createElement("img")
    img.classList.add("img")
    img.src = e.attributes.posterImage.original
    imgContent.appendChild(img)
    //=========================================
    const textContent = document.createElement("div")
    textContent.classList.add("text-content")
    const animeName = document.createElement("h2")
    animeName.classList.add("name")
    animeName.textContent = e.attributes.canonicalTitle
    textContent.appendChild(animeName)
    // /=================================
    const DateContent = document.createElement("div")
    DateContent.classList.add("Date")
    const start = document.createElement("h4")
    start.classList.add("start")
    start.textContent = e.attributes.startDate
    const end = document.createElement("h4")
    end.classList.add("end")
    end.textContent = e.attributes.endDate
    DateContent.appendChild(start)
    DateContent.appendChild(end)
    textContent.appendChild(DateContent)

    //====================================
    const description = document.createElement("p")
    description.classList.add("description")
    description.textContent = e.attributes.description
    textContent.appendChild(description)
    card.appendChild(imgContent)
    card.appendChild(textContent)
    content.appendChild(card)
  })
}

inp.addEventListener("keyup", (e) => {
  if (e.target.value === '') {
    list.innerHTML = ''
    return
  }
  api("GET", `/search?q=${e.target.value}`);
});

btn.addEventListener("click", () => {
  api("GET", `/result?q=${inp.value}`)
})