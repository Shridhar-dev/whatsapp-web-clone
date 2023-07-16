function addUserToDOM(user){
    let onlineUsersSection = document.getElementById("chats__users__online");
    let contact = document.createElement("div");
    contact.className = "contact";
    contact.id=`contact-${user.id}`

    contact.innerHTML = 
    `
        <img class="contact__user" src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <div class="contact__info">
            <div class="contact__name">
                <p>${user.name}</p>
                <small>Ohk</small>
            </div>
            <div class="contact__time">
                <small>11:06</small>
            </div>
        </div>
    `
    contact.addEventListener("click", setCurrentChat)
    onlineUsersSection.appendChild(contact);
}

function removeUserFromDOM(user){
    let userItem = document.getElementById(`contact-${user.id}`);
    userItem.remove();
}

function setCurrentChat(user){
    /*let userItem = document.getElementById(`contact-${user.id}`);
    userItem.remove();*/
}


export { addUserToDOM, removeUserFromDOM }