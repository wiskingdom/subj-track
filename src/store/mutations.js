// for main layout
const SET_MAIN_INIT= (state, payload) => {
  state.mainInit = payload;
};
const SET_DOC_INDEX = (state, payload) => {
  state.docIndex = payload;
};
const SET_DOC_FOLDERS = (state, payload) => {
  state.docFolders = payload;
};
const SET_THE_DOC_FOLDER = (state, payload) => {
  state.theDocFolder = payload;
};
const SET_THE_DOC = (state, payload) => {
  state.theDoc = payload;
};

// for anno tool layout
const SET_ANNO_INIT= (state, payload) => {
  state.annoInit = payload;
};

export {
  SET_MAIN_INIT,
  SET_DOC_INDEX,
  SET_DOC_FOLDERS,
  SET_THE_DOC_FOLDER,
  SET_THE_DOC,
  SET_ANNO_INIT,
};
