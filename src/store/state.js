export default {
  // for main layout
  isFetchedMain: false,
  docIndex: {},
  docFolders: [], // readonly
  theDocFolder: '',
  theDocId: '',

  // for doc layout
  isFetchedDoc: false,
  theDoc: [], // readonly
  newSubsection: [],
  subjTrack: {},
  theDocMeta: {}, // readonly
  speakerColor: {}, // readonly
  predIndex: [],
  lastPredId: 0,
  thePredId: 0,

  // for pred view
  thePred: {
    predId: 0,
    tokenId: '',
    sId: 0,
    spec: {
      speaker: '',
      morph: '',
      tag: '',
      left: [],
      right: [],
    },
    anno: {
      isMainP: true,
      stopTrack: false,
      stopTrackType: false,
      subs: [],
      mainSubPick: false,
      directInput: '',
      inTheSameS: true,
      inTheSameC: true,
      allFilled: false,
      state: 'ready',
      updatedBy: false,
      updatedAt: false,
    },
  },
};
