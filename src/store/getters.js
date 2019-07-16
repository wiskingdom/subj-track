// for main layout
const isFetchedMain = state => state.isFetchedMain;
const docIndex = state => state.docStats;
const docFolders = state => state.docTypes;
const theDocFolder = state => state.theDocFolder;
const theDoc = state => state.theDoc;

// for anno tool layout
const isFetchedAnno = state => state.isFetchedAnno;

export {
  isFetchedMain,
  docIndex,
  docFolders,
  theDocFolder,
  theDoc,
  isFetchedAnno,
};
