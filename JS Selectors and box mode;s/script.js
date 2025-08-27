const box1 = document.getElementById("box1");
const boxes = document.querySelectorAll(".box");


document.getElementById("changeColorBtn").addEventListener("click", () => {
    box1.style.backgroundColor = "lightgreen";
});


document.getElementById("highlightAllBtn").addEventListener("click", () => {
    boxes.forEach((box) => {
        box.classList.toggle("highlight");
    });
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        const styles = window.getComputedStyle(box);
        alert(`
      Box Dimensions:
      Width: ${box.offsetWidth}px
      Height: ${box.offsetHeight}px
      Margin: ${styles.margin}
      Padding: ${styles.padding}
      Border: ${styles.border}
    `);
    });
});