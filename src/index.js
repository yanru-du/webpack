// console.log('webpack11  123');
import about from './assets/aboutActive.png';
import web from './assets/web.jpg';
import txt from './assets/1.txt'
import './common.js'

let img = document.createElement('img');
img.src = about
document.body.appendChild(img);

img = document.createElement('img');
img.src = web
document.body.appendChild(img);

let text = document.createElement('div');
text.innerHTML = txt
document.body.appendChild(text);

let button = document.createElement('button');
text.innerHTML = 'click'
document.body.appendChild(text);

// text.addEventListener('click', () => {
//   import(/*webpackChunkName: 'math', webpackPreload:true */'./math.js').then((res) => {
//     let {add} = res
//     console.log(res);
//     console.log(add(2, 4));
//   })
// })