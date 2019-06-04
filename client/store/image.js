import FileSaver from 'file-saver';

export const state = () => ({
    originImage: null,
    detectedImage: null,
    url: null,
    detectedUrl: null,
    result: null,
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
                onDownloadProgress: function(progressEvent) {
                    console.log(
                        'download',
                        progressEvent.loaded,
                        progressEvent.total,
                    );
                },
                onUploadProgress: (progressEvent) =>
                    console.log(progressEvent.loaded),
            })
            .then((res) => {
                console.log('DETECT SUCCESS!! ', res);
                const blob = new Blob([res.data], { type: 'image/*' });
                const url = URL.createObjectURL(blob);
                state.detectedImage = blob;
                state.detectedUrl = url;
                // FileSaver.saveAs(blob, `prediction.jpg`);
            })
            .catch(() => {
                console.log('DETECT FAILURE!!');
            });
    },
    async getResult(state) {
        await this.$axios
            .get('result')
            .then((res) => {
                console.log('GET SUCCESS: ', res);
                console.log('xxx 300 type of data: ', typeof res.data);
                state.result = res.data;
            })
            .catch((e) => {
                console.log('GET FAILURE!!');
            });
    },
};
