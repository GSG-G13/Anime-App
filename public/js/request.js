const api = (method, url) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let res = JSON.parse(xhr.responseText);
            if (url.includes("/result")) {
                createPost(res)
            } else {
                createElement(res);
            }
        }
    }
    xhr.open(method, url, true);
    xhr.send();
}

