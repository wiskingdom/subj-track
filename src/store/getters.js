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
const theDocAnno = state => state.theDocAnno;
const subjTrack = state => state.subjTrack;
const predIndex = state => state.predIndex;
const thePredId = state => state.thePredId;
const chTopic = state => (id) => {
  const sub = state.theDocAnno[id] ? state.theDocAnno[id].chTopic : false;
  return sub;
};
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
  theDocAnno,
  subjTrack,
  predIndex,
  thePredId,
  chTopic,
  theSpeakerColor,
};
