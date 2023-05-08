import React, { useEffect, useState } from 'react';
import LikeAndShare from '../LikeAndShare/LikeAndShare';
import Comments from '../Comments/Comments'
import { Checkbox, Stack, Text } from '@chakra-ui/react'
import { AiOutlineLike } from 'react-icons/ai';
import RecipeComment from './RecipeComment';
import { useParams } from "react-router-dom";
import axios from '../../axios/userAxios';

const RecipeSingleView = () => {

    const [checkedItems, setCheckedItems] = useState([false, false])
    const [instructionCheck, setInstructionCheck] = useState([false, false])
    const [recipe, setRecipe] = useState([])

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        axios.get(`/user/getSingleView/${id}`).then((res) => {
            setRecipe(res.data.recipe);
        })
    },[])


    return (
        <div className="max-w-[1280px] mx-auto px-4 pt-3 relative flex justify-center items-center ">
            {recipe.map((recipe) => {
                return(
                    <div className="sm:w-[95%] md:w-[60%]" key={recipe._id}>

                <div className="px-5">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-2xl font-bold">{recipe.recipeName}</h3>
                            <h3 className=" font-semibold">Serves: {recipe.recipeServes} </h3>
                        </div>
                    </div>
                    <img
                        className="rounded-sm w-100 h-100 my-4"
                        src={recipe.recipeImage
                            ? recipe.recipeImage.url
                           : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} />
                    <p>{recipe.recipeDescription}</p>

                    <div className="flex-col mb-3 mt-3">
                        <div className="flex justify-center mt-3">
                            <p className="text-[24px] font-semibold text-center">Ingredients</p>
                        </div>
                        <div>
                            <Stack mt={2} spacing={1}>
                            {recipe.recipeIngredients.map((ing,index) => {
                                return(
                                <Checkbox
                                    key={index}
                                    isChecked={checkedItems[index]}
                                    onChange={(e) => {
                                        let newArr = [...checkedItems]
                                        newArr[index] = e.target.checked
                                        setCheckedItems(newArr)
                                    }}
                                >
                                    <Text fontSize='xl'>{ing}</Text>
                                </Checkbox>
                                )
                            })}
                            </Stack>
                            
                        </div>
                    </div>
                    <div className="flex-col mb-3">
                        <div className="flex justify-center mt-3">
                            <p className="text-[24px] font-semibold text-center">Instructions</p>
                        </div>
                        <div>
                            <Stack mt={2} spacing={1}>
                                {recipe.recipeInstruction.map((ins,index) => {
                                    return(
                                        <Checkbox
                                    isChecked={instructionCheck[{index}]}
                                    onChange={(e) => setInstructionCheck([e.target.checked, instructionCheck[{index}]])}
                                    key={index}
                                >
                                    <Text fontSize='xl'>{ins}</Text>
                                </Checkbox>
                                    )
                                })}
                            </Stack>
                        </div>
                    </div>
                </div>
                <RecipeComment recipe = {recipe} id = {id}/>
            </div>
                )
            })}
        </div>
    )
}

export default RecipeSingleView
