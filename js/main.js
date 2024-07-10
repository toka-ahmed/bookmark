var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var list;

if (localStorage.getItem("products")) {
    list = JSON.parse(localStorage.getItem("products"));
    displayProducts();
} else {
    list = [];
}
function addProduct() {
    var siteName = nameInput.value.trim();
    var url = urlInput.value.trim();

    if (testName(siteName) && testUrl(url)) {
        var product = {
            nameSite: siteName,
            pathUrl: url
        };
        list.push(product);
        localStorage.setItem("products", JSON.stringify(list));
        displayProducts();
        clearForm();
    } else {
        var errorMessage = "Invalid input:\n\n" +
            "Site name must contain at least 3 characters and only alphanumeric characters.\n" +
            "Site URL must be valid.";

        alert(errorMessage);

        if (!testName(siteName)) {
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
        } else {
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }

        if (!testUrl(url)) {
            urlInput.classList.add('is-invalid');
            urlInput.classList.remove('is-valid');
        } else {
            urlInput.classList.remove('is-invalid');
            urlInput.classList.add('is-valid');
        }
    }
}






function testName(name) {
    const nameRegex = /^[a-zA-Z0-9]{3,}$/;
    return nameRegex.test(name);
}

function testUrl(url) {
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+)(\.[a-zA-Z0-9-]+)*(:\d+)?([/a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlRegex.test(url);
}

function displayProducts() {
    var temp = '';
    for (var i = 0; i < list.length; i++) {
        temp += `
            <tr>
                <td>${i + 1}</td>
                <td>${list[i].nameSite}</td>
                <td class="green">
                    <button type="button" class="btn btn-success" onclick="visitSite(${i})">
                        <i class="fa-regular fa-eye"></i> Visit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct(${i})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById("myRow").innerHTML = temp;
}

function visitSite(index) {
    window.open(list[index].pathUrl, '_blank');
}

function deleteProduct(index) {
    list.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(list));
    displayProducts();
}

function clearForm() {
    nameInput.value = '';
    urlInput.value = '';
    nameInput.classList.remove('error-border');
    urlInput.classList.remove('error-border');
}







