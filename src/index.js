// Declare global variables
const toyCollection = document.getElementById("toy-collection");
let addToy = false

// Define fetch that returns all toys after being fed into the card builder function
function renderToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(function(allToys) {
    allToys.forEach(toy => { buildCard(toy) });
  })
  .catch(error => console.log(error.message));
};

// Save new toy to database
function saveNewToy(event_data) {
  let formData = {
    name: event_data.name.value,
    image: event_data.image.value,
    likes: 0
  };
  
  let obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  // Fetch and render newly created toy after feeding it into the card builder function
  return fetch("http://localhost:3000/toys", obj)
    .then(resp => resp.json())
    .then(function(newToy) {
      buildCard(newToy);
    })
    .catch(error => console.log(error.message));
};

function addLike(event) {
  let likeCount = event.target.previousSibling.innerText;
  let newNum = parseInt(likeCount.charAt(0)) + 1;
  let elID = event.target.parentNode.id;
  let toyID = elID.charAt(elID.length - 1);

  function updateLikeCount() {
    let toyCard = document.getElementById(`card-${toyID}`);
    let likes = document.querySelector(`#card-${toyID} p`);
    likes.innerText = `${newNum} Likes`;
  };

  let obj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: newNum})
  };

  // Fetch and render newly created toy after feeding it into the card builder function
  fetch(`http://localhost:3000/toys/${toyID}`, obj)
    .then(resp => resp.json())
    .then(function(updatedToy) {
      updateLikeCount(updatedToy);
    })
    .catch(error => console.log(error.message));
};

// Build card that encapsulates toy
function buildCard(toy){
  const card = document.createElement("div")
  card.setAttribute("class", "card");
  card.setAttribute("id", `card-${toy.id}`);
  
  let toyName = document.createElement("h2");
  let toyImage = document.createElement("img");
  let likes = document.createElement("p");
  let likeBtn = document.createElement("button");
  toyName.innerText = toy.name;
  toyImage.setAttribute("class", "toy-avatar");
  toyImage.src = toy.image;
  likes.innerText = `${toy.likes} Likes`;
  likeBtn.setAttribute("class", "like-btn");
  likeBtn.innerText = `Like ${toy.name}`;
  card.append(toyName, toyImage, likes, likeBtn);

  likeBtn.addEventListener("click", function(e) {
    event.preventDefault();
    addLike(e);
  });
  
  toyCollection.appendChild(card);
};

// Run displayToys and formSubmit functions on load
document.addEventListener("DOMContentLoaded", function() {
  renderToys();
});

document.addEventListener("DOMContentLoaded", function() {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = "block"
      toyForm.addEventListener("submit", function(e) {
        event.preventDefault();
        saveNewToy(event.target);
      })
    } else {
      toyForm.style.display = "none"
    }
  })

})
