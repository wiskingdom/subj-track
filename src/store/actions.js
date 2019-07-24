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

// for doc layout
const checkFechedDoc = ({ commit }) => {
  commit('IS_FETCHED_DOC', true);
};
const fetchTheDoc = ({ commit }, docId) => new Promise((resolve) => {
  db.ref(`/main/docs/${docId}/ses`).once('value').then((snap) => {
    commit('THE_DOC', snap.val());
    resolve();
  });
});
const fetchTheDocFolder = ({ commit }, docId) => {
  db.ref(`/main/docIndex/${docId}/folder`).once('value').then((snap) => {
    commit('THE_DOC_FOLDER', snap.val());
  });
};
const fetchTheDocMeta = ({ commit }, docId) => {
  db.ref(`/main/docMeta/${docId}`).once('value').then((snap) => {
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

const fetchPredIndex = ({ commit }, docId) => new Promise((resolve) => {
  db.ref(`/main/predIndex/${docId}`).once('value').then((snap) => {
    commit('PRED_INDEX', snap.val());
    resolve();
  });
});
const pickPred = ({ commit }, predId) => new Promise((resolve) => {
  commit('THE_PRED_ID', predId);
  resolve();
});

export {
  fetchDocIndex,
  fetchDocFolders,
  checkFechedMain,
  pickDocFolder,
  pickDoc,
  checkFechedDoc,
  fetchTheDoc,
  fetchPredIndex,
  fetchTheDocFolder,
  fetchTheDocMeta,
  fetchSpeakerColor,
  tagNewSubsection,
  pickPred,
};
