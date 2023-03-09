/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
 function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function send_to_server(links){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let ref = ""
    "ref" in params ? ref = params["ref"]: null;

    //fetch(`/history?ref=${ref}`, {method: "POST", body: JSON.stringify(links), contentType: "application/json"});
    data = encodeURIComponent(btoa(JSON.stringify(links)));
    window.open(`../history/?ref=${ref}&data=${data}`);
}