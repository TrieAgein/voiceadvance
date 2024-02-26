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

function openClaim() {

}