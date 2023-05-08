import { useState } from "react";
import { PlusIcon, XIcon, CloudUploadIcon } from "@heroicons/react/solid";
import axios from '../../axios/adminAxios';
import { useNavigate } from "react-router-dom";


function RecipeForm() {
    const [recipeName, setRecipeName] = useState("");
    const [serves, setServes] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState("")

    const navigate = useNavigate();


    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    };

    const handleServesChange = (event) => {
        setServes(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleIngredientNameChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleImageUpload = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleInstructionStepChange = (index, event) => {
        const newInstructions = [...instructions];
        newInstructions[index] = event.target.value;
        setInstructions(newInstructions);
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, ""]);
    };

    const handleDeleteInstruction = (index) => {
        const newInstructions = [...instructions];
        newInstructions.splice(index, 1);
        setInstructions(newInstructions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("recipeName", recipeName);
        data.append("serves", serves);
        data.append("category", category);
        data.append("description",description);
        ingredients.forEach(item => data.append("ingredients[]", item))
        instructions.forEach(item => data.append("instructions[]", item))
        // data.append("ingredients",ingredients);
        // data.append("instructions",instructions);
        data.append("image", imageFile);

        axios.post("/admin/addRecipe", data, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }).then((result) => {
            navigate('/admin/recipe')
        })
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-6">
                <label htmlFor="recipe-name" className="block font-medium mb-1">
                    Recipe Name
                </label>
                <input
                    id="recipe-name"
                    type="text"
                    name="recipeName"
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="image" className="block font-medium mb-1">
                    Image
                </label>
                <div className="flex items-center">
                    <label htmlFor="image" className="cursor-pointer rounded-md font-medium py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50">
                        <span className="text-blue-600 hover:text-blue-500">
                            <CloudUploadIcon className="h-6 w-6 mr-1" />
                            Select an image
                        </span>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                    {imageFile && (
                        <div className="flex items-center ml-2">
                            <img src={URL.createObjectURL(imageFile)} alt="Recipe" className="h-12 w-12 object-cover rounded-lg" />
                            <button onClick={() => setImageFile(null)} className="ml-2 rounded-md font-medium py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50">
                                <span className="text-red-600 hover:text-red-500">
                                    <XIcon className="h-6 w-6" />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="recipe-name" className="block font-medium mb-1">
                    Serves
                </label>
                <input
                    id="serves"
                    type="text"
                    name="serves"
                    value={serves}
                    onChange={handleServesChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="category" className="block font-medium mb-1">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <option value="">Select a category</option>
                    <option value="lunch">Lunch</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="dinner">Dinner</option>
                    <option value="snacks">Snacks</option>
                </select>
            </div>
            <div className="mb-6">
                <label className="block font-medium mb-1">Description</label>
                <div className="flex items-center mb-2">
                    <textarea
                        name="description"
                        value={description}
                        onChange={(event) => handleDescriptionChange(event)}
                        required
                        rows="2"
                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    ></textarea>
                </div>
            </div>
            <div className="mb-6">
                <label className="block font-medium mb-1">Ingredients</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            name={`ingredient-${index}`}
                            value={ingredient}
                            onChange={(event) => handleIngredientNameChange(index, event)}
                            required
                            className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {index === ingredients.length - 1 && (
                            <button
                                type="button"
                                onClick={handleAddIngredient}
                                className="ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        )}
                        {index !== ingredients.length - 1 && (
                            <button
                                type="button"
                                onClick={() => handleDeleteIngredient(index)}
                                className="ml-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="mb-6">
                <label className="block font-medium mb-1">Instructions</label>
                {instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <textarea
                            name={`instruction-${index}`}
                            value={instruction}
                            onChange={(event) => handleInstructionStepChange(index, event)}
                            required
                            rows="2"
                            className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        ></textarea>
                        {index === instructions.length - 1 && (
                            <button
                                type="button"
                                onClick={handleAddInstruction}
                                className="ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        )}
                        {index !== instructions.length - 1 && (
                            <button
                                type="button"
                                onClick={() => handleDeleteInstruction(index)}
                                className="ml-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default RecipeForm;
