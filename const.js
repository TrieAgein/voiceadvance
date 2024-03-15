function toggle_view() {
    let toggle = document.getElementById("toggle_view");
    let list = document.getElementById("claim-list");
    if (list.classList.contains("line")) {
        list.classList.remove("line")
        list.classList.add("grid")
    } else {
        list.classList.remove("grid")
        list.classList.add("line")
        
    }
}


class Claim {
    constructor() {
        this.title = "";
        this.body = "";
        this.open = true;
        this.votes = 0
    }
}


let newCommentHTML = `
<h1>New Comment</h1>
  <h2>Title</h2>
  <input style="width: 100%; padding: 5px;" type="text" placeholder="Summarise what is on your mind.">
  <h2>Description</h2>
  <textarea style="width: 100%; height:500px; padding: 5px;resize: none;" type="text" placeholder="What is on your mind?"></textarea>

`

function showPopup(content) {
    document.getElementById("popup-body").innerHTML = content;
    document.getElementById("popup-wrapper").style.display = "block"
}

function closePopup() {
    document.getElementById("popup-wrapper").style.display = null
}
