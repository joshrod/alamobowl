const menu = document.querySelector('.menu');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('main');
const footer = document.querySelector('footer');
const navbar = document.querySelector('header');

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
}