const container = document.querySelector('.container');
let y = prompt("Enter the no of grids you want each side?")
const x=y*y;
for(i=0;i<x;i++){
const grid = document.createElement("div");
grid.style.margin="0px";
grid.style.backgroundColor="yellow";
grid.style.height= `${400/y}px`;
grid.style.width= `${400/y}px` ;
grid.style.border= "2px white solid";
grid.style.boxSizing="border-box";

container.append(grid);
grid.addEventListener('mouseenter',()=>{grid.style.backgroundColor="black"});
console.log("a grid is created");
 } 


