const { query } = require("express");

function submitMongoQuery() {
    let formData = new FormData(document.getElementById("loginCredentials"));
    let json = Object.fromEntries(formData);

    // Exactly how the backend reads user input
    // console.log("{name: '" + json.username + "', password: '" + json.password + "'}")
	// let query = JSON.parse("{name: '" + json.username + "', password: '" + json.password + "'}")

    let query = getQueryPretty(json)

    document.getElementById("query").innerText = query

    let url = `http://136.36.104.1:8080/login/${json.username}&${json.password}`

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("response").innerHTML = this.responseText;
        }
      };

    xhttp.open("GET", url, true);
    xhttp.send()
    
    document.getElementById("response").innerHTML = xhttp.responseText;
}

function getQueryPretty(queryJSON) {
    let parsedUsername = null
    try{
        parsedUsername = JSON.stringify(JSON.parse(queryJSON.username))
    } catch (e) {
        parsedUsername = `"${queryJSON.username}"`
    }

    let parsedPassword = null
    try{
        parsedPassword = JSON.stringify(JSON.parse(queryJSON.password))
    } catch (e) {
        parsedPassword = `"${queryJSON.password}"`
    }

    return `User.findOne({
        "username": ${parsedUsername},
        "password": ${parsedPassword}
    })`
}