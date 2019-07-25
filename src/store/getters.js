// for main layout
const isFetchedMain = state => state.isFetchedMain;
const docIndex = state => state.docIndex;
const docFolders = state => state.docFolders;
const theDocFolder = state => state.theDocFolder;
const theDocId = state => state.theDocId;

// for anno tool layout
const isFetchedDoc = state => state.isFetchedAnno;
const theDoc = state => state.theDoc;
const theDocMeta = state => state.theDocMeta;
const theSpeakerColor = state => id => state.speakerColor[id];
const predIndex = state => state.predIndex;
const lastPredId = state => state.lastPredId;
const thePredId = state => state.thePredId;
const prevPredId = state => (state.thePredId ? state.thePredId - 1 : 0);
const nextPredId = state => state.thePredId + 1;
const sIdFromPredId = state => predId => state.predIndex[predId].sId;

export {
  isFetchedMain,
  docIndex,
  docFolders,
  theDocFolder,
  theDocId,
  isFetchedDoc,
  theDoc,
  theDocMeta,
  predIndex,
  theSpeakerColor,
  lastPredId,
  thePredId,
  prevPredId,
  nextPredId,
  sIdFromPredId,
};
