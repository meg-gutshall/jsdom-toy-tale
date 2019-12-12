async function fetchToys() {
  const resp = await fetch("http://localhost:3000/toys");
  return data = await resp.json();
};

async function formSubmit() {
  const submitBtn = await document.querySelector(".add-toy-form input")
  submitBtn.addEventListener("click", saveNewToy);
};

// Save toy to database
function saveNewToy() {
  let formData = {
    name: name,
    image: image,
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

  // Fetch newly created toy
  fetch("http://localhost:3000/toys", obj)
    .then(resp => resp.json())
    .then(toy => console.log(toy))
    .catch(error => console.log(error.message));
};

// Render newly created toy

async function displayToys() {
  let toyCollection = document.getElementById("toy-collection");
  const allToys = await fetchToys();

  function parseToys(toys) {

    function buildCard(toy){
      const card = document.createElement("div")
      card.setAttribute("class", "card");

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

      toyCollection.appendChild(card);
    };

    toys.forEach(toy => { buildCard(toy) });
  };

  parseToys(allToys);
};


document.addEventListener("DOMContentLoaded", function() {
  displayToys();
  formSubmit();
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
