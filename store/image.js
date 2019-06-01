export const state = () => ({
    file: null,
    url: null,
    currentStatus: null,
});

export const mutations = {
    onFileChanged(state, url) {
        state.url = url;
    },
    onDetect(state, file) {
        
    }
};
