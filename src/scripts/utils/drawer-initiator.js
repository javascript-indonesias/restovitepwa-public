const DrawerInitiator = {
    init({ button, drawer, content }) {
        button.addEventListener('click', (event) => {
            this.toggleDrawer(event, button, drawer);
        });

        content.addEventListener('click', (event) => {
            this.closeDrawer(event, button, drawer);
        });
    },

    toggleDrawer(event, button, drawer) {
        event.stopPropagation();
        button.classList.toggle('active');
        drawer.classList.toggle('active');
    },

    closeDrawer(event, button, drawer) {
        event.stopPropagation();
        drawer.classList.remove('open');
        button.classList.remove('open');
    },
};

export default DrawerInitiator;
