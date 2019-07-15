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

export {
  SET_DOC_INDEX,
  SET_DOC_FOLDERS,
  SET_THE_DOC_FOLDER,
  SET_THE_DOC,
};
