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
const IS_FETCHED_DOC = (state, payload) => {
  state.isFetchedAnno = payload;
};
const THE_DOC = (state, payload) => {
  state.theDoc = payload;
};
const THE_DOC_META = (state, payload) => {
  state.theDocMeta = payload;
};
const PRED_INDEX = (state, payload) => {
  state.predIndex = payload;
};
const SPEAKER_COLOR = (state, payload) => {
  state.speakerColor = payload;
};
const NEW_SUBSECTION = (state, { sId, newSubsection }) => {
  state.theDoc[sId].newSubsection = newSubsection;
};
const LAST_PRED_ID = (state, payload) => {
  state.lastPredId = Number(payload);
};
const THE_PRED_ID = (state, payload) => {
  state.thePredId = Number(payload);
};
const THE_PRED = (state, payload) => {
  state.thePred = payload;
};

export {
  IS_FETCHED_MAIN,
  DOC_INDEX,
  DOC_FOLDERS,
  THE_DOC_FOLDER,
  THE_DOC_ID,
  IS_FETCHED_DOC,
  THE_DOC,
  THE_DOC_META,
  SPEAKER_COLOR,
  NEW_SUBSECTION,
  PRED_INDEX,
  LAST_PRED_ID,
  THE_PRED_ID,
  THE_PRED,
};
