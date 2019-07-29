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
const manyTracked = state => tokenId => state.subjTrack[tokenId];
const predIndex = state => state.predIndex;
const lastPredId = state => state.lastPredId;
const thePredId = state => state.thePredId;
const prevPredId = state => (state.thePredId ? state.thePredId - 1 : 0);
const nextPredId = state => state.thePredId + 1;
const sIdFromPredId = state => predId => state.predIndex[predId].sId;

// for pred view
const thePred = state => state.thePred;
const allFilled = (state) => {
  const { skipTrack, subj1, subj2 } = state.thePred.anno;
  let subj1Filled = false;
  let subj2Filled = false;

  const targets = ['discourse', 'participants'];

  if (skipTrack === true) {
    subj1Filled = true;
    subj2Filled = true;
  } else {
    if (targets.includes(subj1.type)) {
      subj1Filled = !!subj1.inTheC;
    } else if (subj1.type === 'worldKnowledge') {
      subj1Filled = true;
    }
    if (targets.includes(subj2.type)) {
      subj2Filled = !!subj2.inTheC;
    } else if (subj2.type === 'worldKnowledge') {
      subj2Filled = true;
    }
  }

  return subj1Filled && subj2Filled;
};

export {
  isFetchedMain,
  docIndex,
  theDocFolder,
  theDocId,
  isFetchedDoc,
  predIndex,
  theSpeakerColor,
  isNewSubsection,
  manyTracked,
  lastPredId,
  thePredId,
  prevPredId,
  nextPredId,
  sIdFromPredId,
  thePred,
  allFilled,
};
