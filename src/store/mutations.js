// for main layout
const IS_FETCHED_MAIN = (state, payload) => {
  state.isFetchedMain = payload;
};
const DOC_INDEX = (state, payload) => {
  state.docIndex = payload;
};
const DOC_FOLDERS = (state, payload) => {
  state.docFolders = Object.freeze(payload);
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
  state.theDoc = Object.freeze(payload);
};
const THE_DOC_META = (state, payload) => {
  state.theDocMeta = Object.freeze(payload);
};
const PRED_INDEX = (state, payload) => {
  state.predIndex = payload;
};
const SPEAKER_COLOR = (state, payload) => {
  state.speakerColor = Object.freeze(payload);
};
const NEW_SUBSECTION = (state, payload) => {
  state.newSubsection = payload;
};
const SUBJ_TRACK = (state, payload) => {
  state.subjTrack = payload;
};
const CH_NEW_SUBSECTION = (state, sId) => {
  const newSubSet = new Set(state.newSubsection);
  if (newSubSet.has(sId)) {
    newSubSet.delete(sId);
  } else {
    newSubSet.add(sId);
  }
  state.newSubsection = Array.from(newSubSet);
};
// to-do
const CH_SUBJ_TRACK = (state, { tokenId, value }) => {
  state.subjTrack[`${tokenId}`] = value;
};
const LAST_PRED_ID = (state, payload) => {
  state.lastPredId = payload;
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
  SUBJ_TRACK,
  PRED_INDEX,
  CH_NEW_SUBSECTION,
  CH_SUBJ_TRACK,
  LAST_PRED_ID,
  THE_PRED_ID,
  THE_PRED,
};
