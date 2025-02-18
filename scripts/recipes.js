async function fetchRecipes() {
    try {
        const response = await fetch('https://datasets-server.huggingface.co/first-rows?dataset=sharktide%2Frecipes&config=default&split=train');
        const data = await response.json();
        
        const recipes = data.rows;
        const recipesContainer = document.getElementById('recipes-container');

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            
            const recipeName = recipe.row.name;
            const recipeLink = `/recipeviewer?recipe=${encodeURIComponent(recipeName)}`; // Recipe link with query param (encoded)

            const recipeNameElem = document.createElement('h3');
            recipeNameElem.textContent = recipeName;

            const recipeTimeElem = document.createElement('h4');
            console.log(recipe.row.time)
            recipeTimeElem.textContent = '⌚: ' + recipe.row.time + ' minutes';
            console.log(recipeTimeElem)


            const recipeCreatorElem = document.createElement('p');
            recipeCreatorElem.textContent = 'By: ' + recipe.row.creator;

            const recipeIngredients = document.createElement('p');
            recipeIngredients.textContent = 'Ingredients: ' + recipe.row.ingredients.join(', ');

            const recipeLinkElem = document.createElement('a');
            recipeLinkElem.href = recipeLink;
            recipeLinkElem.textContent = "View Recipe Details";

            recipeCard.appendChild(recipeNameElem);
            recipeCard.appendChild(recipeTimeElem);
            recipeCard.appendChild(recipeCreatorElem);
            recipeCard.appendChild(recipeIngredients);
            recipeCard.appendChild(recipeLinkElem);

            recipesContainer.appendChild(recipeCard);
        });

        // Add search functionality
        document.getElementById('search-recipes').addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const recipeCards = document.querySelectorAll('.recipe-card');

            recipeCards.forEach(card => {
                const recipeName = card.querySelector('h3').textContent.toLowerCase();
                const recipeIngredients = card.querySelector('p').textContent.toLowerCase();

                if (recipeName.includes(query) || recipeIngredients.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

window.onload = fetchRecipes;
