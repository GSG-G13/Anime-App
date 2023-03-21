const api = (method,url,value) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText);
                console.log(res);
            }
        }
        xhr.open(method, url, true);
        xhr.send();
}

module.exports = {api}