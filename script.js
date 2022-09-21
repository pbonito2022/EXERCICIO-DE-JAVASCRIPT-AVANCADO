

function myFunction() {
document.getElementById("users").innerHTML = "";
document.getElementById("mgs").innerHTML = "";
const idinput = document.getElementById("id1").value;

if (idinput == null || idinput == "") {

  document.getElementById("mgs").innerHTML = "Insert user Id";

} else {

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        appendData(data);
        })
        .catch(function (err) {
        console.log("error: " + err);
        });

    function appendData(data) {

        var mainContainer = document.getElementById("users");
        var cont = 0;
        
        for (var i = 0; i < data.length; i++) {
            
            if (data[i].id == idinput) {
            var li = document.createElement("li");
            li.innerHTML = `Id: ${data[i].id} Name:${data[i].name} Username: ${data[i].username} Email:${data[i].email} Address:${data[i].address.street}, ${data[i].address.suite} - ${data[i].address.zipcode} ${data[i].address.city} Phone:${data[i].phone} Website:${data[i].website} Company:${data[i].company.name}`;
            
            li.classList.add("item");
            li.dataset.userId = data[i].id;
            li.addEventListener("click", (event) => getPosts(event));
            mainContainer.appendChild(li);
            cont= 1;
            }        
        }
        if (cont == 0) {
        document.getElementById("mgs").innerHTML = "User not found!";
        }
    }

    function cleanPosts() {
        var users = document.querySelectorAll(".item ul");
        for (var i = 0; i < users.length; i++) {
            if (users[i]) {
            users[i].style.display = "none";
            }
        }
    }

    function getPosts(event) {
        var userId = event.target.dataset.userId;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((json) => renderPosts(json, event.target));
        }

        function renderPosts(posts, target) {
        var postsList = target.childNodes[1];

        cleanPosts();

        if (postsList) {
        postsList.style.display = "block";
        } else {
            var list = document.createElement("ul");

            for (var i = 0; i < posts.length; i++) {
                var item = document.createElement("li");
                var liTitle = document.createElement("strong");
                var liBody = document.createElement("p");

                liTitle.innerHTML = `Id Post:`+ posts[i].id +` Title:`+ posts[i].title;
                liBody.innerHTML = `Body:`+posts[i].body;

                item.appendChild(liTitle);
                item.appendChild(liBody);
                list.appendChild(item);
            }

            target.appendChild(list);
            }
        }
    }

} 

