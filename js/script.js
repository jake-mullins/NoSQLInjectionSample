function getMongoResponse() {
    let userInput = document.getElementById("databaseInput").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // Whatever is returned
        document.getElementById("databaseInput").value = this.responseText;
    }
    console.log("Make sure to change backendUrl")
    // CHANGE TO PROPER 
    const backendUrl = "http://136.36.104.1:8080/users/{userInput}"
    xhttp.open("GET", "")
}