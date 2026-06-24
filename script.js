const container = document.querySelector('.container');
const x=256
for(i=0;i<x;i++){
const grid = document.createElement("div");
grid.style.backgroundColor="yellow";
grid.style.height= "25px";
grid.style.width= "25px";
grid.style.border= "2px white solid";
grid.style.boxSizing="border-box"
container.append(grid);
console.log("a grid is created")
}
