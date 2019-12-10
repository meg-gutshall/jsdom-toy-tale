// Fetch all toys via GET request
async function fetchToys() {
  const resp = await fetch("http://localhost:3000/toys");
  return data = await resp.json();
};

// Take the Response and make a div with class "card" for each toy
async function saveToys() {
  // Create toy collection element
  let toyCollection = document.getElementById("toy-collection");
  const allToys = await fetchToys();

  function displayToys(toys) {
    toys.forEach(toy => {
      const card = document.createElement("div")
      card.setAttribute("class", "card");
        // Card elements should include:
          // h2 with toy name
          // img with src of the toy image attribute and the class name "toy-avatar"
          // p with number of likes
          // button with class "like-btn"
        function buildCard(toy) {
          let toyName = document.createElement("h2");
          let toyImage = document.createElement("img");
          let likes = document.createElement("p");
          let likeBtn = document.createElement("button");
          toyName.innerText = toy.name;
          toyImage.setAttribute("class", "toy-avatar");
          toyImage.src = toy.image;
          likes.innerText = toy.likes;
          likeBtn.setAttribute("class", "like-btn");
          card.appendChild(toyName);
          card.appendChild(toyImage);
          card.appendChild(likes);
          card.appendChild(likeBtn);
        };
        buildCard(toy);
      // Append each card to toy collection element
      toyCollection.appendChild(card);
    })
  };

  displayToys(allToys);
};


document.addEventListener("DOMContentLoaded", function() {
  saveToys();
});

let addToy = false

document.addEventListener("DOMContentLoaded", function() {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = "block"
    } else {
      toyForm.style.display = "none"
    }
  })

})
