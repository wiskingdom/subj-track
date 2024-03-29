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
  stateColor: {
    ready: 'grey',
    ongoing: 'warning',
    complete: 'green',
    skipped: 'black',
  }, // readonly
  predIndex: [],
  lastPredId: 0,
  thePredId: 0,

  // for pred view
  thePred: {
    predId: 0,
    tokenId: '',
    sId: 0,
    speaker: '',
    spec: {
      morph: '',
      tag: '',
      delim: '',
      left: [],
      right: [],
    },
    anno: {
      skipTrack: false,
      skipReason: '',
      subj1: {
        type: '', // worldKnowledge, discourse, participants, false
        subjId: '',
        morph: '',
        tag: '',
        inTheC: '', // itself, overt pro, null pro, PRO
      },
      subj2: {
        type: '', // worldKnowledge, discourse, participants, false
        subjId: '',
        morph: '',
        tag: '',
        inTheC: '', // itself, overt pro, null pro, PRO
      },
      note: '',
      updatedBy: '',
      updatedAt: '',
    },
  },
};
