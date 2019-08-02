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
const theStateColor = state => id => (state.stateColor[id]
  ? state.stateColor[id]
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
const theAnno = state => state.thePred.anno;
const isSubj = state => id => subjN => id === state.thePred.anno[subjN].subjId;
const hasInTheC = state => subjN => ['discourse', 'participant']
  .includes(state.thePred.anno[subjN].type);
const hasInfer = state => subjN => state.thePred.anno[subjN].type === 'knowledge';
const inferedMorph = state => subjN => state.thePred.anno[subjN].morph.replace(/\?/, '');

const annoState = (state) => {
  const { skipTrack, subj1, subj2 } = state.thePred.anno;
  let theState = 'ready';
  let subj1Filled = false;
  let subj2Filled = false;

  const targets = ['discourse', 'participant'];
  const untargets = ['knowledge', 'uncontrolled'];

  if (targets.includes(subj1.type)) {
    subj1Filled = !!subj1.inTheC;
  } else if (untargets.includes(subj1.type)) {
    subj1Filled = true;
  }

  if (targets.includes(subj2.type)) {
    subj2Filled = !!subj2.inTheC;
  } else if (untargets.includes(subj2.type)) {
    subj2Filled = true;
  }

  if (subj1.type) {
    theState = 'ongoing';
  }

  if (subj2.type) {
    theState = 'ongoing';
  }

  if (subj1Filled && !subj2.type) {
    theState = 'complete';
  }

  if (subj1Filled && subj2Filled) {
    theState = 'complete';
  }

  if (skipTrack === true) {
    theState = 'skipped';
  }

  return theState;
};

export {
  isFetchedMain,
  docIndex,
  theDocFolder,
  theDocId,
  isFetchedDoc,
  predIndex,
  theSpeakerColor,
  theStateColor,
  isNewSubsection,
  manyTracked,
  lastPredId,
  thePredId,
  prevPredId,
  nextPredId,
  sIdFromPredId,
  thePred,
  theAnno,
  isSubj,
  annoState,
  hasInTheC,
  hasInfer,
  inferedMorph,
};
