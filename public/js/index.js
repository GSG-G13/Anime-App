const animesNames = require('../../src/post.json');
const listinp = document.querySelector('#search');
const ulList = document.querySelector('.list')
listinp.addEventListener('keyup',()=>{
  console.log("adfadfadga");
  animesNames.forEach(animeName=>{
    const li = document.createElement('li');
    li.classList.add('oneList');
    li.textContent = animeName;
    ulList.appendChild(li)
  })
})
