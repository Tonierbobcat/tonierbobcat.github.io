const workItems = [
    {
        image: "images/fulls/01.jpg",
        thumbnail: "images/thumbs/01.jpg",
        title: "(Plugin Development) Minecraft Party System",
        description: "An advanced groundbreaking party system for minecraft that allows players to create parties with players and NPCs."
    },
    {
        image: "images/fulls/02.jpg",
        thumbnail: "images/thumbs/02.jpg",
        title: "(Plugin Development) Labs Minigame",
        description: "Similar to LabsMC where players get spawned on a platform and for the duration of the game random events fire until there is one player left."
    },
    {
        image: "images/fulls/03.jpg",
        thumbnail: "images/thumbs/03.jpg",
        title: "(Software Development) Aseprite Sprite Sheet Convert For LibGDX",
        description: "A simple software that converts the sprite sheet json into .atlas files for the LibGDX framework for java."
    },
    {
        image: "images/fulls/04.jpg",
        thumbnail: "images/thumbs/04.jpg",
        title: "(Plugin Development) Minecraft AI Companion Addon",
        description: "Allows players to have their own follower is intergrated with an LLM so players can chat with their companion. It is aware of the players surroundings and the items in their inventory."
    },
    {
        image: "images/fulls/05.jpg",
        thumbnail: "images/thumbs/05.jpg",
        title: "(Game Development) UNNAMED Plant Game",
        description: "A game where you are a botanist in Japan and you go out and discover plants to plant into your garden. As you complete the main quest you unlock decorations that you can decorate your garden with."
    }
];

window.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById('two');
    const row = section.querySelector('.row');

    // Loop through each work item and create HTML dynamically
    workItems.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('col-6', 'col-12-xsmall', 'work-item');

        // Add the inner HTML for each work item
        article.innerHTML = `
            <a href="${item.image}" class="image fit thumb">
                <img src="${item.thumbnail}" alt="" />
            </a>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;

        // Append the article to the row
        row.appendChild(article);
    });
});