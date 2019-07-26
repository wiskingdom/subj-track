// for main layout
const isFetchedMain = state => state.isFetchedMain;
const docIndex = state => state.docIndex;
const theDocFolder = state => state.theDocFolder;
const theDocId = state => state.theDocId;

// for doc layout
const isFetchedDoc = state => state.isFetchedAnno;
const theSpeakerColor = state => id => (state.speakerColor[id]
  ? state.speakerColor[id]
  : 'grey');
const isNewSubsection = state => sId => state.newSubsection.includes(sId);
const NewSubsection = state => state.newSubsection;
const manyTracked = state => tokenId => state.subjTrack[tokenId];
const predIndex = state => state.predIndex;
const lastPredId = state => state.lastPredId;
const thePredId = state => state.thePredId;
const prevPredId = state => (state.thePredId ? state.thePredId - 1 : 0);
const nextPredId = state => state.thePredId + 1;
const sIdFromPredId = state => predId => state.predIndex[predId].sId;

// for pred view
const thePred = state => state.thePred;

export {
  isFetchedMain,
  docIndex,
  theDocFolder,
  theDocId,
  isFetchedDoc,
  predIndex,
  theSpeakerColor,
  isNewSubsection,
  NewSubsection,
  manyTracked,
  lastPredId,
  thePredId,
  prevPredId,
  nextPredId,
  sIdFromPredId,
  thePred,
};
