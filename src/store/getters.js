// for main layout
const mainInit = state => state.mainInit;
const docIndex = state => state.docStats;
const docFolders = state => state.docTypes;
const theDocFolder = state => state.theDocFolder;
const theDoc = state => state.theDoc;

// for anno tool layout
const annoInit = state => state.annoInit;

export {
  mainInit,
  docIndex,
  docFolders,
  theDocFolder,
  theDoc,
  annoInit
};
