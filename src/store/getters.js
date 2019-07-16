// for main layout
const isFetchedMain = state => state.isFetchedMain;
const docIndex = state => state.docIndex;
const docFolders = state => state.docFolders;
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
