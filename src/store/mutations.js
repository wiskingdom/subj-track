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
const THE_DOC_ID = (state, payload) => {
  state.theDocId = payload;
};

// for anno tool layout
const IS_FETCHED_ANNO = (state, payload) => {
  state.isFetchedAnno = payload;
};
const THE_DOC = (state, payload) => {
  state.theDoc = payload;
};
const THE_DOC_META = (state, payload) => {
  state.theDocMeta = payload;
};
const THE_DOC_ANNO = (state, payload) => {
  state.theDocAnno = payload;
};
const SUBJ_TRACK = (state, payload) => {
  state.subjTrack = payload;
};
const PRED_INDEX = (state, payload) => {
  state.predIndex = payload;
};
const THE_PRED_ID = (state, payload) => {
  state.thePredId = payload;
};


export {
  IS_FETCHED_MAIN,
  DOC_INDEX,
  DOC_FOLDERS,
  THE_DOC_FOLDER,
  THE_DOC_ID,
  IS_FETCHED_ANNO,
  THE_DOC,
  THE_DOC_META,
  THE_DOC_ANNO,
  SUBJ_TRACK,
  PRED_INDEX,
  THE_PRED_ID,
};
