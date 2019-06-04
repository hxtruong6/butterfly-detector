import FileSaver from 'file-saver';
import { resolve } from 'q';

export const state = () => ({
    originImage: null,
    detectedImage: null,
    url: null,
    detectedUrl: null,
    result: {},
    loading: false,
});

function getBlob(url) {
    return new Promise((resolve, reject) => {
        let blob = null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob'; //force the HTTP response, response-type header to be blob
        xhr.onload = function() {
            blob = xhr.response; //xhr.response is now a blob object
            resolve(blob);
        };
        xhr.send();
    });
}

export const mutations = {
    onFileChanged(state, originImage) {
        state.originImage = originImage;
        state.url = URL.createObjectURL(originImage);
    },
    async onPasteLink(state, link) {
        state.loading = true;
        console.log('xxx 400 loading: ', state.loading);
        state.url = link;
        // const blob = await fetch(link).then((r) => {
        //     // console.log('xxx 407 r: ', r);
        //     // return new Blob([r.buffer], {
        //     //     type: 'image/*',
        //     // });
        //     return r.blob();
        // }); // need re-test
        const blob = await getBlob(link);
        state.originImage = blob;
        console.log('xxx 403 blob: ', blob);
        state.loading = false;
        console.log('xxx 401 loading: ', state.loading);
    },
    async onDetect(state) {
        if (!state.originImage) return;
        console.log('xxx 406 originImage: ', state.originImage);

        let formData = new FormData();
        formData.append('file', state.originImage);
        state.loading = true;
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
            })
            .finally(() => {
                state.loading = false;
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
