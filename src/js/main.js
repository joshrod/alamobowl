const menu = document.querySelector('.menu');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('main');
const footer = document.querySelector('footer');
const navbar = document.querySelector('header');

const sections = document.querySelectorAll('.page');


window.onload = () => {
    

    menu.onclick = () => {
        if (!sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.add('sidebar-open');
            mainContent.classList.add('open-sidebar');
            navbar.classList.add('open-sidebar');
            footer.classList.add('open-sidebar');

        }
        else {
            sidebar.classList.remove('sidebar-open');
            mainContent.classList.remove('open-sidebar');
            navbar.classList.remove('open-sidebar');
            footer.classList.remove('open-sidebar');
        }
    }

    window.addEventListener('wheel', _.throttle((e) => {checkScrollDirection(e);}, 1500, {'trailing': false}));
}

function animationHandler() {
    let currentSection = sections.classList.contains('displayed');
    console.log(currentSection);
}

function checkScrollDirection(e) {
    if (e.deltaY < 0) {
        console.log('scrolling up');
    }
    else if (e.deltaY > 0) {
        console.log('scrolling down');
    }
}


// function animationHandler(fromPage, toPage, animation) {
// 	let counterpart = "";
// 	overlay.style.display = "block";
// 	switch (animation) {
// 		case "moveToLeft":
// 			counterpart = "moveFromRight";
// 			break;
// 		case "moveToRight":
// 			counterpart = "moveFromLeft";
// 			break;
// 		case "rotateFall":
// 			counterpart = "scaleUp";
// 			fromPage.classList.add("ontop");
// 			break;
// 		case "scaleDown":
// 			counterpart = "scaleUpDown";
// 			break;
// 		default:
// 			break;
// 	}
// 	fromPage.classList.add(animation);
// 	toPage.classList.add(counterpart);
// 	toPage.classList.add("displayed");
// 	const removeClasses = function() {
// 		fromPage.classList.remove("displayed");
// 		fromPage.classList.remove(animation);
// 		toPage.classList.remove(counterpart);
// 		fromPage.classList.remove("ontop");
// 		overlay.style.display = "none";
// 		fromPage.removeEventListener("animationend", removeClasses);
// 	};
// 	fromPage.addEventListener("animationend", removeClasses);
// }