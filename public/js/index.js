const inp = document.querySelector('#search')
inp.addEventListener('keyup',(e)=>{
  api("POST",`/search?q=${e.target.value}`)
})
// const list = document.querySelector('.list')

// const createElement = (data)=>{
//   list.innerHTML = ''
//   data.forEach(element => {
//     const li = document.createElement('li');
//     li.classList.add('value');
//     li.textContent = element;
//     list.appendChild(li)
//   });
// }

// module.exports = {createElement}