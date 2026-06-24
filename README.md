#Etch a sketch
# Grid Project — Doubts & Answers
### PHASE 1
## 1. How to select a class in JS from HTML

Use `document.querySelector('.classname')` for a single element.
Use `document.querySelectorAll('.classname')` for all matching elements (returns a NodeList, not a single element).

```javascript
const container = document.querySelector('.container'); // single element
```

---

## 2. How to call a function x number of times in JS

Use a `for` loop. Note: `i < x` gives exactly x iterations. `i <= x` gives x+1.

```javascript
for (let i = 0; i < 256; i++) {
  myFunction();
}
```

---

## 3. How to wrap content in a flexbox

Set `display: flex` on the **container**, and `flex-wrap: wrap` to allow items to flow to the next row.

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

---

## 4. How to add border in CSS without changing height/width

Use `box-sizing: border-box`. This makes the border included inside the element's declared width/height instead of adding to it.

```css
.grid {
  box-sizing: border-box;
  border: 1px solid black;
}
```

---

## Bugs Hit During This Project

| Bug | Cause | Fix |
|-----|-------|-----|
| Grids not visible | `div` has no height by default | Set `height` on each grid div |
| `querySelectorAll` not working as expected | Returns NodeList, not a single element | Use `querySelector` |
| Container got appended into grid | `grid.append(container)` — backwards | `container.append(grid)` |
| `color` not coloring the box | `color` applies to text only | Use `backgroundColor` |
| Grids stacking vertically, not in a grid | `div` is block-level by default | `display: flex` + `flex-wrap: wrap` on container |
| Grid squares too small / uneven | Hardcoded `width: 20px` | Calculate: container width ÷ columns per row (400 ÷ 16 = 25px) |

### PHASE 2 
# Phase 2 — Hover Effect & Pen Trail

## Mouse Events Used

| Event | What it does |
|-------|-------------|
| `mouseenter` | Fires when mouse enters the element |
| `mouseleave` | Fires when mouse leaves the element |
| `mouseover` | Fires when mouse moves over element or any child inside it |

---

## Pen Trail Logic

For a permanent trail (colour stays after hover), you only need `mouseenter`. `mouseleave` reverts the colour — removing it makes the change stick.

```javascript
grid.addEventListener('mouseenter', () => { grid.style.backgroundColor = "black"; });
```

---

## Bugs Hit During Phase 2

| Bug | Cause | Fix |
|-----|-------|-----|
| Event listener only on last grid | `addEventListener` was outside the `for` loop — `grid` out of scope | Move both lines inside the loop |
| Got confused and overcomplicated it | Added `mouseleave` + `mouseover` on top of working code | It already worked — `mouseleave` was the only thing undoing the trail. Remove it. |



## PHASE 3
# Phase 3 — Dynamic Grid Size

## Goal
Let the user input a number `y`, then generate a `y x y` grid that fills the container perfectly.

## Final Working Code

```javascript
const container = document.querySelector('.container');
let y = prompt("Enter the no of grids you want each side?")
const x = y * y;
for (i = 0; i < x; i++) {
  const grid = document.createElement("div");
  grid.style.margin = "0px";
  grid.style.backgroundColor = "yellow";
  grid.style.height = `${400/y}px`;
  grid.style.width = `${400/y}px`;
  grid.style.border = "2px white solid";
  grid.style.boxSizing = "border-box";
  container.append(grid);
  grid.addEventListener('mouseenter', () => { grid.style.backgroundColor = "black"; });
}
```

---

## Doubts Solved

### 1. How to set a hover effect in JS

Use `addEventListener` with `mouseenter` and `mouseleave` events on each element.

```javascript
grid.addEventListener('mouseenter', () => { grid.style.backgroundColor = "black"; });
grid.addEventListener('mouseleave', () => { grid.style.backgroundColor = "yellow"; });
```

For a **permanent trail** (no revert), only use `mouseenter` — drop `mouseleave`.

---

### 2. How to make grid size dynamic based on user input

Calculate grid cell size as `containerWidth / y` instead of hardcoding it.

```javascript
grid.style.width = `${400 / y}px`;
grid.style.height = `${400 / y}px`;
```

---

### 3. How to embed expressions inside strings in JS (Template Literals)

Use backticks `` ` `` with `${}` syntax — JS evaluates the expression inside `${}`.

```javascript
// Wrong — JS treats this as a plain string, no math happens
grid.style.width = "(400/y)px";
grid.style.width = `{400/y}px`;   // also wrong — missing $

// Correct
grid.style.width = `${400 / y}px`;
```

---

## Bugs Hit During Phase 3

| Bug | Cause | Fix |
|-----|-------|-----|
| Grid not wrapping after `y` columns | Cell width was hardcoded at 25px — 16 always fit per row regardless of input | Calculate width as `400/y` |
| Math not evaluating in style assignment | Used a regular string `"(400/y)px"` — JS doesn't evaluate expressions in quotes | Use template literal: `` `${400/y}px` `` |
| Template literal not working | Wrote `` `{400/y}px` `` — missing `$` before `{}` | `` `${400/y}px` `` |

---

## PHASE 4
# Phase 4 — Button-Triggered Dynamic Grid

## Goal
Move the prompt inside a button click so the grid regenerates on demand instead of firing on page load.

## Final Working Code

```javascript
const container = document.querySelector('.container');
const butt = document.querySelector('.butt');
const btn = document.createElement('button');
btn.innerText = 'New';
butt.appendChild(btn);

btn.addEventListener("click", () => {
  const y = parseInt(prompt("Enter the no of grids you want each side?"));

  if (!y || y <= 0) return;

  container.innerHTML = '';

  const x = y * y;
  for (let i = 0; i < x; i++) {
    const grid = document.createElement("div");
    grid.style.margin = "0px";
    grid.style.backgroundColor = "yellow";
    grid.style.height = `${400 / y}px`;
    grid.style.width = `${400 / y}px`;
    grid.style.border = "2px white solid";
    grid.style.boxSizing = "border-box";
    container.append(grid);
    grid.addEventListener('mouseenter', () => { grid.style.backgroundColor = "black"; });
  }
});
```

---

## Doubts Solved

### 1. How to create a button with JS

Use `document.createElement('button')`, set its text with `innerText`, then append it to an existing element.

```javascript
const btn = document.createElement('button');
btn.innerText = 'Click Me';
document.querySelector('.butt').appendChild(btn);
```

---

### 2. How to use a prompt value outside the click callback

You can't — `let`/`const` declared inside a callback are scoped to that callback only. The fix is to move all code that depends on that value **inside** the same callback.

```javascript
// WRONG — y is declared inside the callback, loop is outside
btn.addEventListener("click", () => {
  const y = parseInt(prompt("Enter grid size"));
}); // y dies here

for (let i = 0; i < y * y; i++) { ... } // y is undefined here — ReferenceError

// CORRECT — everything that uses y lives inside the callback
btn.addEventListener("click", () => {
  const y = parseInt(prompt("Enter grid size"));
  for (let i = 0; i < y * y; i++) { ... } // y is alive here
});
```

**Why:** JavaScript uses lexical scoping. A variable declared with `let` or `const` inside `{}` only exists within those braces. Once the closing `}` of the callback is hit, `y` is gone.

---

## Bugs Hit During Phase 4

| Bug | Cause | Fix |
|-----|-------|-----|
| `y is not defined` ReferenceError | `y` declared inside click callback with `const`, loop was outside the callback | Move entire loop inside the callback |
| Old grids staying when new grid generated | `container` not cleared before appending new grids | Add `container.innerHTML = ''` before the loop |
| `y * y` returning `NaN` | `prompt()` returns a string — string math breaks | Wrap with `parseInt()` |
| `i` leaking as global variable | `for (i = 0; ...)` — no `let`/`const` declaration | Use `for (let i = 0; ...)` |