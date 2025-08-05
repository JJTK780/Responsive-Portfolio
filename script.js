// This function runs when the entire window, including all assets, has finished loading.
window.onload = function () {
  // --- Initialize Lucide Icons ---
  // This function finds all elements with the `data-lucide` attribute and replaces them with SVG icons.
  lucide.createIcons();

  // --- Mobile Menu Functionality ---
  // Get the necessary elements from the DOM
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Check if the menu button and menu itself exist to avoid errors
  if (mobileMenuButton && mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");

    // Add a click event listener to the menu button
    mobileMenuButton.addEventListener("click", () => {
      // Toggle the 'hidden' class to show or hide the mobile menu
      mobileMenu.classList.toggle("hidden");

      // Change the icon from 'menu' to 'x' and back
      const icon = mobileMenuButton.querySelector("i");
      const isHidden = mobileMenu.classList.contains("hidden");
      icon.setAttribute("data-lucide", isHidden ? "menu" : "x");

      // Re-render the icons after changing the attribute
      lucide.createIcons();
    });

    // Add click event listeners to each link inside the mobile menu
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Hide the menu when a link is clicked
        mobileMenu.classList.add("hidden");

        // Reset the menu button icon to 'menu'
        const icon = mobileMenuButton.querySelector("i");
        icon.setAttribute("data-lucide", "menu");

        // Re-render the icon
        lucide.createIcons();
      });
    });
  }

  // --- Smooth Scrolling for Anchor Links ---
  // Select all anchor tags whose 'href' attribute starts with '#'
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Add a click event listener to each anchor link
    anchor.addEventListener("click", function (e) {
      // Prevent the default browser behavior of jumping instantly to the section
      e.preventDefault();

      // Get the target element by its ID from the href attribute
      const targetElement = document.querySelector(this.getAttribute("href"));

      // If the target element exists, scroll to it smoothly
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
  // --- Handle Contact Form Submission ---
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");

  if (form && successMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            successMessage.classList.remove("hidden");
          } else {
            alert("Oops! Something went wrong.");
          }
        })
        .catch(() => {
          alert("Failed to send. Please try again.");
        });
    });
  }
};
