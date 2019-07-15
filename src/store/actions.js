import fireapp from '@/fireapp';

const db = fireapp.database();

const initialFetch = ({ commit }) => {
  commit(db);
  commit();
};
const pickDoc = ({ commit }, payload) => {
  commit(payload);
  commit(payload);
};


export {
  initialFetch,
  pickDoc,
};
