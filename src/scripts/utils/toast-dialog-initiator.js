const ToastModalInitiator = {
    init() {
        this.isToastShow = false;
        this.toastElement = document.querySelector('#toasts');
    },
    showToast(message = '') {
        if (this.isToastShow === false) {
            this.toastElement.innerText = message;

            this.toastElement.classList.add('show');
            this.isToastShow = true;

            setTimeout(() => {
                this.toastElement.classList.remove('show');
                this.isToastShow = false;
            }, 3000);
        }
    },
};

export default ToastModalInitiator;
