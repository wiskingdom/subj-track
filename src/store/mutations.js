// for main layout
const IS_FETCHED_MAIN = (state, payload) => {
  state.isFetchedMain = payload;
};
const DOC_INDEX = (state, payload) => {
  state.docIndex = payload;
};
const DOC_FOLDERS = (state, payload) => {
  state.docFolders = payload;
};
const THE_DOC_FOLDER = (state, payload) => {
  state.theDocFolder = payload;
};
const THE_DOC = (state, payload) => {
  state.theDoc = payload;
};

// for anno tool layout
const IS_FETCHED_ANNO = (state, payload) => {
  state.isFetchedAnno = payload;
};

export {
  IS_FETCHED_MAIN,
  DOC_INDEX,
  DOC_FOLDERS,
  THE_DOC_FOLDER,
  THE_DOC,
  IS_FETCHED_ANNO,
};
