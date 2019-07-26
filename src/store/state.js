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
  thePred: {},
};
