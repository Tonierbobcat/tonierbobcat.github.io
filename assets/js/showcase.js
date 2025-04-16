const workItems = [
    {
        image: "images/fulls/01.jpg",
        thumbnail: "images/thumbs/01.jpg",
        title: "Magna sed consequat tempus",
        description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
    },
    {
        image: "images/fulls/02.jpg",
        thumbnail: "images/thumbs/02.jpg",
        title: "Ultricies lacinia interdum",
        description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
    },
    {
        image: "images/fulls/03.jpg",
        thumbnail: "images/thumbs/03.jpg",
        title: "Tortor metus commodo",
        description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
    },
    {
        image: "images/fulls/04.jpg",
        thumbnail: "images/thumbs/04.jpg",
        title: "Quam neque phasellus",
        description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
    },
    {
        image: "images/fulls/05.jpg",
        thumbnail: "images/thumbs/05.jpg",
        title: "Nunc enim commodo aliquet",
        description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
    },
    {
        image: "images/fulls/06.jpg",
        thumbnail: "images/thumbs/06.jpg",
        title: "Risus ornare lacinia",
        description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
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