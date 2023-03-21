const api = () => {
        const url = `https://kitsu.io/api/edge/anime?page[limit]=20`
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText);
                gitResultSearch(res)
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
}


module.exports = api