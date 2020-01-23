const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector("main");
const footer = document.querySelector("footer");
const navbar = document.querySelector("header");

const sections = document.querySelectorAll(".full-page");

let sectionNum = 0;
let currentSection = sections[sectionNum];
let nextSection;
let prevSection;

const newsSection = document.getElementById("news");
let footerTrigger = footer.getBoundingClientRect().top;

window.addEventListener("load", function() {
    menu.onclick = () => {
        if (!sidebar.classList.contains("sidebar-open")) {
            sidebar.classList.add("sidebar-open");
            mainContent.classList.add("open-sidebar");
            navbar.classList.add("open-sidebar");
        } else {
            sidebar.classList.remove("sidebar-open");
            mainContent.classList.remove("open-sidebar");
            navbar.classList.remove("open-sidebar");
        }
    };

    // * When manually manipulating animationHandler() MAKE SURE YOU SET THE nextSection AND prevSection VARIABLES IN YOUR CODE!!!!

    window.addEventListener(
        "wheel",
        _.throttle(
            function(e) {
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];

                    if (section === currentSection) {
                        nextSection = sections[i + 1];
                        if (nextSection === sections[5]) {
                            nextSection = sections[4];
                        }
                        prevSection = sections[i - 1];
                        if (prevSection === sections[-1]) {
                            prevSection = sections[0];
                        }
                    }
                }
                let direction = checkScrollDirection(e);
                if (direction === "up") {
                    console.log("scrolled up");
                    animationHandler(
                        currentSection,
                        prevSection,
                        "moveToBottomEasing"
                    );
                    sectionNum--;
                } else if (direction === "down") {
                    console.log("scrolled down");
                    animationHandler(
                        currentSection,
                        nextSection,
                        "moveToTopEasing"
                    );
                    sectionNum++;
                }
                currentSection = sections[sectionNum];
            },
            1000,
            { trailing: false }
        )
    );
});

newsSection.addEventListener("scroll", function() {
    console.log(footerTrigger);
    console.log(newsSection.scrollTop);
});

function checkScrollDirection(e) {
    // if (e.deltaY < 0 && !(currentSection === sections[0])) {
    //     if (currentSection === sections[4] && newsSection.scrollTop === 0) {
    //         return "up";
    //     }
    //     return "up";
    if (
        e.deltaY < 0 &&
        currentSection !== sections[0] &&
        currentSection !== sections[4]
    ) {
        return "up";
    } else if (
        e.deltaY < 0 &&
        currentSection === sections[4] &&
        newsSection.scrollTop === 0
    ) {
        return "up";
    } else if (
        e.deltaY > 0 &&
        currentSection !== sections[sections.length - 1]
    ) {
        return "down";
    }
}

function animationHandler(fromPage, toPage, animation) {
    let counterpart = "";
    switch (animation) {
        case "moveToTopEasing":
            counterpart = "moveFromBottom";
            fromPage.classList.add("on-top");
            break;
        case "moveToBottomEasing":
            counterpart = "moveFromTop";
            fromPage.classList.add("on-top");
            break;
    }
    fromPage.classList.add(animation);
    toPage.classList.add(counterpart);
    toPage.classList.add("displayed");
    const removeClasses = function() {
        fromPage.classList.remove("displayed");
        fromPage.classList.remove(animation);
        toPage.classList.remove(counterpart);
        fromPage.classList.remove("on-top");
        toPage.classList.remove("on-top");
        fromPage.removeEventListener("animationend", removeClasses);
    };
    fromPage.addEventListener("animationend", removeClasses);
}

function showFooter() {
    footer.style.display = "block";
    document.body.style.overflow = "scroll";
}

function hideFooter() {
    footer.style.display = "none";
    document.body.style.overflow = "hidden";
}
