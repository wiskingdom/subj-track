import fireapp from '@/fireapp';

const db = fireapp.database();

// for main layout
const mainFetch = ({ commit }) => {
  commit(db);
  commit();
};
const pickDoc = ({ commit }, payload) => {
  commit(payload);
  commit(payload);
};

// for anno tool layout
const mainFetch = ({ commit }) => {
  commit(db);
  commit();
};

export {
  mainFetch,
  pickDoc,
  annoFetch
};
