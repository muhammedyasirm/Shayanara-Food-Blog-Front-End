import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@chakra-ui/react';
import axios from '../../axios/adminAxios';
import DelteRecipe from './DelteRecipe';

const RecipeTable = () => {

    const [recipe, setRecipe] = useState([]);
    const [confirm, setConfirm] = useState(false);

    const fetchRecipe = useCallback(() => {
        axios.get('/admin/getRecipe').then((res) => {
            console.log("Recipe kittiyade",res);
            if(res.data.data) {
                setRecipe(res.data.data);
            }
        })
    },[]);

    useMemo(() => {
        fetchRecipe();
    },[fetchRecipe]);
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Recipe Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Recipe Added On
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View And Do The Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe.map((recipe) => {
                            return(
                                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="/foodblogLogo.jpg"
                                            alt="user profile"
                                        />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">
                                                {recipe.recipeName}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{new Date(recipe.createdAt).toLocaleDateString()}</td>

                                    <td className="py-4 ">
                                        <Button colorScheme='teal' size='sm' onClick={() => setConfirm(true)}>
                                            Delete
                                        </Button>
                                        <DelteRecipe
                                        open={confirm}
                                        onClose={() => setConfirm(false)}
                                        id={recipe._id}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default RecipeTable
