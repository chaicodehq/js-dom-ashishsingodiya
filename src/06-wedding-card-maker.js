/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (!containerElement) return null;

  containerElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const parent = e.target.closest(".guest-item");
      if (parent) parent.remove();
    }
  });

  const addGuest = (name, side) => {
    const div = document.createElement("div");
    div.classList.add("guest-item");
    div.setAttribute("data-name", name);
    div.setAttribute("data-side", side);

    const span = document.createElement("span");
    span.textContent = name;

    const button = document.createElement("button");
    button.classList.add("remove-btn");
    button.textContent = "Remove";

    div.append(span, button);
    containerElement.append(div);
    return div;
  };

  const removeGuest = (name) => {
    const guestElement = containerElement.querySelector(`.guest-item[data-name="${name}"]`);
    if (guestElement) {
      guestElement.remove();
      return true;
    }
    return false;
  };

  const getGuests = () => {
    let arr = [];
    const guestElements = containerElement.querySelectorAll(".guest-item");
    guestElements.forEach((g) => {
      const name = g.getAttribute("data-name");
      const side = g.getAttribute("data-side");
      arr.push({ name, side });
    });
    return arr;
  };

  return {
    addGuest,
    removeGuest,
    getGuests,
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  if (!containerElement || !previewElement) return null;

  const btn_1 = document.createElement("button");
  btn_1.classList.add("theme-btn");
  btn_1.dataset.theme = "traditional";
  btn_1.textContent = "traditional";

  const btn_2 = document.createElement("button");
  btn_2.classList.add("theme-btn");
  btn_2.dataset.theme = "modern";
  btn_2.textContent = "modern";

  const btn_3 = document.createElement("button");
  btn_3.classList.add("theme-btn");
  btn_3.dataset.theme = "royal";
  btn_3.textContent = "royal";

  containerElement.append(btn_1, btn_2, btn_3);

  containerElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("theme-btn")) {
      previewElement.className = e.target.dataset.theme;
      previewElement.dataset.theme = e.target.dataset.theme;
    }
  });

  const getTheme = () => {
    if (!previewElement.dataset.theme) {
      return null;
    }
    return previewElement.dataset.theme;
  };

  return {
    getTheme,
  };
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  cardElement.addEventListener("click", (e) => {
    const elements = cardElement.querySelectorAll(".editing");
    elements.forEach((element) => {
      element.classList.remove("editing");
      element.contentEditable = "false";
    });

    if (e.target.hasAttribute("data-editable")) {
      e.target.classList.add("editing");
      e.target.contentEditable = "true";
    }
  });

  const getContent = (field) => {
    const element = cardElement.querySelector(`[data-editable="${field}"]`);
    if (!element) return null;
    return element.textContent;
  };

  return {
    getContent,
  };
}
