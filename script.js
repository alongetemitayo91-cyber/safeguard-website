import { inject } from "@vercel/analytics";

inject();
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Waitlist form: submits to Formspree, which forwards each signup
// straight to an inbox.
const notifyForm = document.getElementById("notifyForm");
const notifyNote = document.getElementById("notifyNote");

if (notifyForm) {
  notifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = notifyForm.querySelector("button");
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch(notifyForm.action, {
        method: "POST",
        body: new FormData(notifyForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        notifyForm.reset();
        button.textContent = "You're on the list";
        if (notifyNote) {
          notifyNote.textContent =
            "Thanks — we'll email you the moment SafeGuard NG launches.";
        }
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      button.disabled = false;
      button.textContent = originalLabel;
      if (notifyNote) {
        notifyNote.textContent =
          "Something went wrong. Please try again in a moment.";
      }
    }
  });
}
