function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageSize = function PageSize() {
  _classCallCheck(this, PageSize);
};

PageSize.format = {
  a4: 'A4',
  letter: 'Letter'
};
PageSize.orientation = {
  portrait: 'portrait',
  landscape: 'landscape'
};
PageSize.size = {
  a4: { width: 595, height: 842 },
  letter: { width: 612, height: 792 }
};
export default PageSize;