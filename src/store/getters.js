// for main layout
const isFetchedMain = state => state.isFetchedMain;
const docIndex = state => state.docIndex;
const docFolders = state => state.docFolders;
const theDocFolder = state => state.theDocFolder;
const theDocId = state => state.theDocId;

// for anno tool layout
const isFetchedAnno = state => state.isFetchedAnno;
const theDoc = state => state.theDoc;
const theDocMeta = state => state.theDocMeta;
const predIndex = state => state.predIndex;
const thePredId = state => state.thePredId;
const theSpeakerColor = state => id => state.speakerColor[id];


export {
  isFetchedMain,
  docIndex,
  docFolders,
  theDocFolder,
  theDocId,
  isFetchedAnno,
  theDoc,
  theDocMeta,
  predIndex,
  thePredId,
  theSpeakerColor,
};
