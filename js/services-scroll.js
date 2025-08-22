// Handle "Services" link click
document.addEventListener("DOMContentLoaded", () => {
  const servicesLink = document.getElementById("services-link");

  if (servicesLink) {
    servicesLink.addEventListener("click", (e) => {
      // If not on home page, redirect with query
      if (window.location.pathname !== "/") {
        e.preventDefault();
        window.location.href = "/?scroll=services";
      }
    });
  }

  // If on homepage and query param exists
  if (window.location.pathname === "/" && window.location.search.includes("scroll=services")) {
    const section = document.getElementById("visa-services-wrapper");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // Clean the URL (remove ?scroll=services)
      history.replaceState(null, "", "/");
    }
  }
});
