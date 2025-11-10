document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("list");
  const pill = document.getElementById("pill");
  const items = Array.from(list.querySelectorAll(".item"));

  function placePillAt(item) {
    const parentRect = list.parentElement.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const top =
      itemRect.top -
      parentRect.top +
      itemRect.height / 2 -
      pill.offsetHeight / 2;
    pill.style.top = `${top}px`;
    pill.dataset.index = item.dataset.index;
  }

  window.addEventListener("load", () => {
    const placeholder = list.querySelector("li[style]");
    const parentRect = list.parentElement.getBoundingClientRect();
    const phRect = placeholder.getBoundingClientRect();
    const top =
      phRect.top - parentRect.top + phRect.height / 2 - pill.offsetHeight / 2;
    pill.style.top = `${top}px`;
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      placePillAt(item);
    });
  });

  pill.addEventListener("click", () => {
    alert("Oylik hisobotlarni yuklab olish ishga tushirildi!");
  });

  window.addEventListener("resize", () => {
    const idx = pill.dataset.index;
    const target = items.find((it) => it.dataset.index === idx);
    if (target) placePillAt(target);
  });
});
