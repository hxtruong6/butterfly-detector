import FileSaver from 'file-saver';

export const state = () => ({
    originImage: null,
    detectedImage: null,
    url: null,
    detectedUrl: null,
});

export const mutations = {
    onFileChanged(state, originImage) {
        state.originImage = originImage;
        state.url = URL.createObjectURL(originImage);
    },
    async onDetect(state) {
        let formData = new FormData();
        formData.append('file', state.originImage);
        await this.$axios
            .post('image', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log('SUCCESS!! ', res);
                const blob = new Blob([res.data], { type: 'image/*' });
                const url = URL.createObjectURL(blob);
                state.detectedImage = blob;
                state.detectedUrl = url;
                // FileSaver.saveAs(blob, `prediction.jpg`);
            })
            .catch(() => {
                console.log('FAILURE!!');
            });
    },
};
