function reloadStylesheets() {
    var queryString = '?reload=' + new Date().getTime();
    $('link[rel="stylesheet"]').each(function () {
        this.href = this.href.replace(/\?.*|$/, queryString);
    });
}

reloadStylesheets();

function changeZIndex(i,id) {
    document.getElementById(id).style.zIndex=i;
  }