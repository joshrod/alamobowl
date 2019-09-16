const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector("main");
const footer = document.querySelector("footer");
const navbar = document.querySelector("header");

const sections = document.querySelectorAll(".full-page");

let currentSection = document.querySelector(".displayed");
let nextSection;
let prevSection;

window.onload = () => {
  menu.onclick = () => {
    if (!sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.add("sidebar-open");
      mainContent.classList.add("open-sidebar");
      navbar.classList.add("open-sidebar");
      footer.classList.add("open-sidebar");
    } else {
      sidebar.classList.remove("sidebar-open");
      mainContent.classList.remove("open-sidebar");
      navbar.classList.remove("open-sidebar");
      footer.classList.remove("open-sidebar");
    }
  };

  //TODO: currentSection is not being updated. FIX THIS!

  window.addEventListener(
    "wheel",
    _.throttle(
      function(e) {
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];

          if (section.classList.contains("displayed")) {
            nextSection = sections[i + 1];
            prevSection = sections[i - 1];
          }
        }
        let direction = checkScrollDirection(e);
        if (direction === "up") {
          console.log("scrolled up");
        } else if (direction === "down") {
          console.log("scrolled down");
          animationHandler(currentSection, nextSection, "moveToTopEasing");
          currentSection = document.querySelector(".displayed");
        }
      },
      1500,
      { trailing: false }
    )
  );
};

function checkScrollDirection(e) {
  if (e.deltaY < 0 && !(currentSection === sections[0])) {
    return "up";
  } else if (
    e.deltaY > 0 &&
    !(currentSection === sections[sections.length - 1])
  ) {
    return "down";
  }
}

function animationHandler(fromPage, toPage, animation) {
  let counterpart = "";
  switch (animation) {
    case "moveToTopEasing":
      counterpart = "moveFromBottom";
      break;
    case "moveToBottomEasing":
      counterpart = "moveFromTop";
      break;
  }
  fromPage.classList.add(animation);
  toPage.classList.add(counterpart);
  toPage.classList.add("displayed");
  const removeClasses = function() {
    fromPage.classList.remove("displayed");
    fromPage.classList.remove(animation);
    toPage.classList.remove(counterpart);
    fromPage.removeEventListener("animationend", removeClasses);
  };
  fromPage.addEventListener("animationend", removeClasses);
}
