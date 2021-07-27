import ToastModalInitiator from './toast-dialog-initiator';
import RestoranNetworkSource from '../data/restoran-netsource';
import ProgressbarInitiator from './progressbar-initiator';

const CommentButtonInitiator = {
    init(successCb) {
        this.successSendCallback = successCb;
        this.sendCommentButton = document.querySelector('#button-comment');
        this.inputUsername = document.querySelector('#input-name');
        this.inputCommentText = document.querySelector('#input-comment');

        this.setCommentButtonListener();

        ToastModalInitiator.init();
    },
    setIdRestoranDetail(idresto) {
        this.idResto = idresto;
    },
    setCommentButtonListener() {
        this.sendCommentButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.getDataCommentInput();
        });
    },
    getDataCommentInput() {
        this.stringUsername = this.inputUsername.value;
        this.stringComment = this.inputCommentText.value;

        if (this.stringUsername && this.stringComment) {
            if (this.stringUsername.length > 3) {
                if (this.stringComment.length > 10) {
                    this.sendComment();
                } else {
                    ToastModalInitiator.showToast(
                        'Silahkan isi komentar dengan benar',
                    );
                }
            } else {
                // show toast
                ToastModalInitiator.showToast('Silahkan isi nama dengan benar');
            }
        } else {
            // show toast
            ToastModalInitiator.showToast(
                'Nama dan isi komentar tidak boleh kosong',
            );
        }
    },
    async sendComment() {
        await this.showProgressBar(false);
        try {
            await this.showProgressBar(true);
            const data = await RestoranNetworkSource.sendCommentReview({
                id: this.idResto,
                name: this.stringUsername,
                review: this.stringComment,
            });

            if (data.error === false) {
                setTimeout(() => {
                    ToastModalInitiator.showToast('Sukses mengirim komentar');
                    this.successSendCallback(data);
                }, 1000);
            } else {
                ToastModalInitiator.showToast('Gagal mengirim komentar');
            }
            await this.showProgressBar(false);
        } catch (err) {
            console.log(err);
            ToastModalInitiator.showToast('Gagal mengirim komentar');
            await this.showProgressBar(false);
        }
    },
    async showProgressBar(isloading = false) {
        if (isloading === true) {
            ProgressbarInitiator.showProgressBar();
        } else {
            ProgressbarInitiator.hideProgressBar();
        }
    },
};

export default CommentButtonInitiator;
