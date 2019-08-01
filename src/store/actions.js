import fireapp from '@/fireapp';

const db = fireapp.database();
const auth = fireapp.auth();

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
const fetchTheDocFolder = ({ commit }, docId) => new Promise((resolve) => {
  db.ref(`/main/docIndex/${docId}/folder`).once('value').then((snap) => {
    commit('THE_DOC_FOLDER', snap.val());
    resolve();
  });
});
const fetchTheDocMeta = ({ commit }, docId) => new Promise((resolve) => {
  db.ref(`/main/docMeta/${docId}`).once('value').then((snap) => {
    commit('THE_DOC_META', snap.val());
    resolve();
  });
});
const fetchSpeakerColor = ({ commit }) => new Promise((resolve) => {
  db.ref('/main/speakerColor').once('value').then((snap) => {
    commit('SPEAKER_COLOR', snap.val());
    resolve();
  });
});
const fetchNewSubsection = ({ commit }, docId) => new Promise((resolve) => {
  db.ref(`/main/newSubsection/${docId}`).once('value').then((snap) => {
    const payload = snap.val() ? snap.val() : [];
    commit('NEW_SUBSECTION', payload);
    resolve();
  });
});
const chNewSubsection = ({ commit }, sId) => new Promise((resolve) => {
  commit('CH_NEW_SUBSECTION', sId);
  resolve();
});
const pushNewSubsection = ({ state, dispatch }, sId) => {
  dispatch('chNewSubsection', sId)
    .then(() => {
      const { theDocId, newSubsection } = state;
      const push = {};
      push[theDocId] = newSubsection;
      db.ref('/main/newSubsection')
        .update(push);
    });
};

const fetchPredIndex = ({ commit }, docId) => new Promise((resolve) => {
  db.ref(`/main/predIndex/${docId}`).once('value').then((snap) => {
    commit('PRED_INDEX', snap.val());
    resolve();
  });
});
const setLastPredId = ({ state, commit }) => new Promise((resolve) => {
  commit('LAST_PRED_ID', state.predIndex.length - 1);
  resolve();
});

// for pred view
const pickPred = ({ commit }, predId) => new Promise((resolve) => {
  commit('THE_PRED_ID', predId);
  resolve();
});
const fetchThePred = ({ commit }, ids) => new Promise((resolve) => {
  db.ref(`/main/predAnno/${ids.docId}/${ids.predId}`)
    .once('value').then((snap) => {
      commit('THE_PRED', snap.val());
      resolve();
    });
});

const pushAnno = ({ state, getters, commit }) => {
  const { theDocId, thePredId } = state;
  const updatedBy = auth.currentUser.email;
  const updatedAt = new Date().toString();
  commit('STAMP', { updatedBy, updatedAt });

  const { theAnno } = getters;
  db.ref(`/main/predAnno/${theDocId}/${thePredId}/anno`)
    .update(theAnno);
};
const pickSubj = ({ commit, dispatch }, { payload, subjN }) => {
  const {
    type, subjId, morph, tag,
  } = payload;
  commit('TYPE', { type, subjN });
  commit('SUBJ_ID', { subjId, subjN });
  commit('MORPH', { morph, subjN });
  commit('TAG', { tag, subjN });
  commit('IN_THE_C', { inTheC: '', subjN });
  dispatch('pushAnno');
};
const deleteSubj = ({ commit, dispatch }, subjN) => {
  commit('TYPE', { type: '', subjN });
  commit('SUBJ_ID', { subjId: '', subjN });
  commit('MORPH', { morph: '', subjN });
  commit('TAG', { tag: '', subjN });
  commit('IN_THE_C', { inTheC: '', subjN });
  dispatch('pushAnno');
};
const setInTheC1 = ({ commit, dispatch }, inTheC) => {
  commit('IN_THE_C', { inTheC, subjN: 'subj1' });
  dispatch('pushAnno');
};
const setInTheC2 = ({ commit, dispatch }, inTheC) => {
  commit('IN_THE_C', { inTheC, subjN: 'subj2' });
  dispatch('pushAnno');
};
const setInfer = ({ commit, dispatch }, { infer, subjN }) => {
  commit('INFER', { infer, subjN });
  dispatch('pushAnno');
};
const setSkipTrack = ({ commit, dispatch }, value) => {
  commit('SKIP_TRACK', value);
  dispatch('pushAnno');
};


export {
  fetchDocIndex,
  fetchDocFolders,
  checkFechedMain,
  pickDocFolder,
  pickDoc,
  checkFechedDoc,
  fetchTheDoc,
  fetchTheDocFolder,
  fetchTheDocMeta,
  fetchSpeakerColor,
  fetchNewSubsection,
  chNewSubsection,
  pushNewSubsection,
  fetchPredIndex,
  setLastPredId,
  pickPred,
  fetchThePred,
  pickSubj,
  setInTheC1,
  setInTheC2,
  setInfer,
  deleteSubj,
  pushAnno,
  setSkipTrack,
};
