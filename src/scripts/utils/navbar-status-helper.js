const NavbarStatusHelper = {
    init() {
        this.liElementMenu = document.querySelectorAll('.menu ul li');
    },
    setActiveStatusNavbar(position) {
        // Clear all class
        this.liElementMenu.forEach((element, index) => {
            const hrefElement = element.querySelector('a');
            if (index === position) {
                hrefElement.classList.add('active');
            } else {
                hrefElement.classList.remove('active');
            }
        });
    },
};

export default NavbarStatusHelper;
