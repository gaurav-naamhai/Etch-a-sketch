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