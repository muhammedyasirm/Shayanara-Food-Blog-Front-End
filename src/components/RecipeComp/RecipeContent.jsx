import React, { useCallback, useMemo, useState } from 'react';
import { Card, CardBody, CardFooter, Text, Stack, Heading, Button, Image } from '@chakra-ui/react';
import axios from '../../axios/userAxios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const RecipeContent = () => {

    const [recipe, setRecipe] = useState([]);

    const { userDetails } = useSelector((state) => state.user);

    const fetchRecipe = useCallback(() => {
        axios.get('/admin/getRecipe').then((res) => {
            console.log("Recipe kittiyade", res);
            if (res.data.data) {
                setRecipe(res.data.data);
            }
        })
    }, []);

    useMemo(() => {
        fetchRecipe();
    }, [fetchRecipe]);

    console.log("Recipe sate", recipe);

    const navigate = useNavigate();

    const singleRecipe = (id) => {
        if(userDetails.user.premium === true){
            navigate(`/user/recipeSingle/${id}`);
        } else {
            toast.success(
                'You are not a Premium user',
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
        }  
    }

    return (
        <div>
            <div className='flex justify-center'>
                <Heading className='text-stone-500 mb-3'>LETS LOOK INTO THE RECIPES</Heading>
            </div>
            {/* <div className='max-w-[1280px] mx-auto px-4 my-4 relative flex justify-center'>
                <div className='flex w-[95%] mx-auto justify-center'  >
                <p className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]'>
                        All
                    </p>
                    <p className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]'>
                        Breakfast
                    </p>
                    <p className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]'>
                        Lunch
                    </p>
                    <p className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]'>
                        Snacks
                    </p>
                    <p className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]'>
                        Dinner
                    </p>
                </div>

            </div> */}
            {recipe.map((recipe) => {
                return (
                    <div className='flex justify-center' key={recipe._id}>
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            mt={2}
                            m={5}
                            w='80%'
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                alt='Caffe Latte'
                            />

                            <Stack>
                                <CardBody>
                                    <Heading size='md'>{recipe.recipeName}</Heading>

                                    <Text py='2'>
                                        {recipe.recipeDescription}
                                    </Text>
                                </CardBody>

                                <CardFooter>
                                    <Button variant='solid' colorScheme='blue' onClick={() => {singleRecipe(recipe._id)}}>
                                        View Recipe
                                    </Button>
                                </CardFooter>
                            </Stack>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default RecipeContent
