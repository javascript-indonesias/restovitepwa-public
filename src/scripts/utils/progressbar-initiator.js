const ProgressbarInitiator = {
    init() {
        this.isLoading = false;
        this.progressElement = document.querySelector('#progress');
    },
    showProgressBar() {
        if (this.isLoading === false) {
            // tampil progress
            this.progressElement.classList.remove('hide-progress');
            this.progressElement.classList.add('show-progress');
            this.isLoading = true;
        }
    },
    hideProgressBar() {
        this.progressElement.classList.remove('show-progress');
        this.progressElement.classList.add('hide-progress');

        // sembunyi progress
        setTimeout(() => {
            this.progressElement.classList.remove('show-progress');
            this.progressElement.classList.remove('hide-progress');
            this.isLoading = false;
        }, 2800);
    },
};

export default ProgressbarInitiator;
