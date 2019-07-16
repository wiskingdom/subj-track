import fireapp from '@/fireapp';

const db = fireapp.database();

// for main layout
const fetchMain = ({ commit }) => new Promise((resolve) => {
  db.ref('/main/docIndex').once('value').then((docIndexSnap) => {
    commit('DOC_INDEX', docIndexSnap.val());
    db.ref('/main/docFolders').once('value').then((docFoldersSnap) => {
      commit('DOC_FOLDERS', docFoldersSnap.val());
      resolve(true);
    });
  });
});

const checkFechedMain = ({ commit }, bool) => {
  commit('IS_FETCHED_MAIN', bool);
};

const pickDocFolder = ({ commit }, docFolder) => {
  commit('THE_DOC_FOLDER', docFolder);
};

const pickDoc = ({ commit }, doc) => {
  commit('THE_DOC', doc);
};

// for anno tool layout
const checkFechedAnno = ({ commit }, bool) => {
  commit('IS_FETCHED_ANNO', bool);
};

export {
  fetchMain,
  checkFechedMain,
  pickDocFolder,
  pickDoc,
  checkFechedAnno,
};
