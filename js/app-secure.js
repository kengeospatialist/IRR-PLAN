function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

var nonce = makeid(32);

csp_content = `
script-src 'self' dropbox.com *.dropbox.com cloudflare.com *.cloudflare.com 
jsdelivr.net *.jsdelivr.net;
style-src 'self' dropbox.com *.dropbox.com cloudflare.com *.cloudflare.com 
jsdelivr.net *.jsdelivr.net 'nonce-${nonce}';
img-src 'self' tile.openstreetmap.org server.arcgisonline.com tile.thunderforest.com 
api.tiles.mapbox.com data:`;

document.querySelector('http-equiv[name="Content-Security-Policy"]').setAttribute("content", csp_content);
