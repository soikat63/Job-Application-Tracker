

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

1. `getElementById()`- Returns a single element using its unique ID.
2. `getElementsByClassName()` - Returns multiple elements with the same class.
3. `querySelector()` - Returns the first matching element using a CSS selector.
4. `querySelectorAll()` - Returns all matching elements (NodeList) using a CSS selector.


## 2. How do you create and insert a new element into the DOM?

1. Using the `document.createElement()` to create a new element.
2. Add content using `innerText` or `innerHTML`.
3. Insert it into the DOM using `appendChild()`, `append()`.


## 3. What is Event Bubbling? And how does it work?

The event starts from the target element and moves upward through its parent elements.


## 4. What is Event Delegation in JavaScript? Why is it useful?

Attach the event listener to a parent element to handle events for its child elements.


##  5. What is the difference between preventDefault() and stopPropagation() methods?

1. The  `preventDefault()` is stops the browser's default behavior.
2. The `stopPropagation()` is Stops the event from bubbling up.