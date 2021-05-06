var coll = document.getElementsByClassName("collapsible");
// collapse aside filds
for( let i = 0; i<coll.length; i++){
  coll[i].addEventListener("click", function(){ 
    this.classList.toggle("active");
    var followerElement = this.nextElementSibling;
    
    followerElement.style.display == 'block' 
      ? followerElement.style.display = 'none' 
      : followerElement.style.display = 'block' 
    
    // followerElement.style.maxHeight 
    //   ? followerElement.style.maxHeight = null
    //   : followerElement.style.maxHeight = followerElement.scrollHeight + "px";

  })
}

var chatItem = document.getElementsByClassName('user');

for( let i = 0; i < chatItem.length; i++ ) {
  chatItem[i].addEventListener("click", () => {
    let room = chatItem[i].firstElementChild.textContent;
    window.open('/?room=' + room);
  })
}

// route into room
const onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get('room');

  console.log('this is the room', room)

}

window.onload = onload;