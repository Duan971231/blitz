let mtbody = document.getElementsByTagName("tbody")[0];
let darr = [];
for (let mtr of document.getElementsByTagName("tbody")[0]) {
  darr.push(mtr.children[0].children[0].innerHTML);
}
console.log(darr);
