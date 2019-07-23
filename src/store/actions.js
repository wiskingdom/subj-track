import fireapp from '@/fireapp';

const db = fireapp.database();

// for main layout
const fetchDocIndex = ({ commit }) => new Promise((resolve) => {
  db.ref('/main/docIndex').once('value').then((snap) => {
    commit('DOC_INDEX', snap.val());
    resolve();
  });
});
const fetchDocFolders = ({ commit }) => new Promise((resolve) => {
  db.ref('/main/docFolders').once('value').then((snap) => {
    commit('DOC_FOLDERS', snap.val());
    resolve();
  });
});
const checkFechedMain = ({ commit }) => {
  commit('IS_FETCHED_MAIN', true);
};
const pickDocFolder = ({ commit }, docFolder) => {
  commit('THE_DOC_FOLDER', docFolder);
};
const pickDoc = ({ commit }, docId) => new Promise((resolve) => {
  commit('THE_DOC_ID', docId);
  resolve();
});
const assignFolderFromDocId = ({ state, dispatch }) => {
  const theDocFolder = state.docIndex[state.theDocId].folder;
  dispatch('pickDocFolder', theDocFolder);
};

// for anno tool layout
const checkFechedAnno = ({ commit }) => {
  commit('IS_FETCHED_ANNO', true);
};
const fetchTheDoc = ({ state, commit }) => new Promise((resolve) => {
  const { theDocId } = state;
  db.ref(`/main/docs/${theDocId}/ses`).once('value').then((snap) => {
    commit('THE_DOC', snap.val());
    resolve();
  });
});
const fetchPredIndex = ({ state, commit }) => new Promise((resolve) => {
  const { theDocId } = state;
  db.ref(`/main/predIndex/${theDocId}`).once('value').then((snap) => {
    commit('PRED_INDEX', snap.val());
    resolve();
  });
});
const fetchTheDocFolder = ({ state, commit }) => {
  const { theDocId } = state;
  db.ref(`/main/docIndex/${theDocId}/folder`).once('value').then((snap) => {
    commit('THE_DOC_FOLDER', snap.val());
  });
};
const fetchTheDocMeta = ({ state, commit }) => {
  const { theDocId } = state;
  db.ref(`/main/docMeta/${theDocId}`).once('value').then((snap) => {
    commit('THE_DOC_META', snap.val());
  });
};
const fetchSpeakerColor = ({ commit }) => {
  db.ref('/main/speakerColor').once('value').then((snap) => {
    commit('SPEAKER_COLOR', snap.val());
  });
};
const tagNewSubsection = ({ commit, state }, { sId, newSubsection }) => {
  const { theDocId } = state;
  db.ref(`/main/docs/${theDocId}/ses/${sId}`).update({ newSubsection });
  commit('NEW_SUBSECTION', { sId, newSubsection });
};

export {
  fetchDocIndex,
  fetchDocFolders,
  checkFechedMain,
  pickDocFolder,
  pickDoc,
  assignFolderFromDocId,
  checkFechedAnno,
  fetchTheDoc,
  fetchPredIndex,
  fetchTheDocFolder,
  fetchTheDocMeta,
  fetchSpeakerColor,
  tagNewSubsection,
};
