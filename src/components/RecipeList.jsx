import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = props => {
    const {recipeList} = props;
    return (
        <>
        {
            recipeList.map(recipe => {
                return (
                    <RecipeCard key={recipe.id} {...recipe}/>
                )
            })
        }
        </>
    )
}

export default RecipeList;