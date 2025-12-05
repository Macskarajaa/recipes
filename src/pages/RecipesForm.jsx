import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router';
import { addRecipe, readRecipe, updateRecipe } from '../myBackend';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';


export const RecipesForm = () => {



  const { user } = useContext(MyUserContext)
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null)
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, text: "", type: "" });



  const { id } = useParams()
  id && console.log(id);
  console.log(recipe);

  useEffect(() => {
    if (id)
      readRecipe(id, setRecipe)
  }, [id])

  useEffect(() => {
    if (recipe) {
      setName(recipe.name)
      setIngredients(recipe.ingredients)
      setCategory(recipe.category)
      setSteps(recipe.steps)
      setPreview(recipe.imageUrl)

    }
  }, [recipe])



  useEffect(() => {
    if (id && recipe && user && recipe.uid !== user.uid) {
      navigate("/recipes");
    }
  }, [id, recipe, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Új recept → kötelező a kép
    if (!id && !file) {
      setLoading(false);
      setToast({ visible: true, text: "Kép feltöltése kötelező!", type: "error" });
      setTimeout(() => setToast(p => ({ ...p, visible: false })), 2000);
      return;
    }

    // ✅ Update mód → meg kell várni a recept betöltését
    if (id && !recipe) {
      setLoading(false);
      setToast({ visible: true, text: "Recept adatok még nem töltődtek be!", type: "error" });
      setTimeout(() => setToast(p => ({ ...p, visible: false })), 2000);
      return;
    }

    try {
      const inputData = { name, ingredients, steps, category, uid: user.uid, displayName: user.displayName };

      if (id) {
        // ✅ Ha nincs új file → file = null → backend megtartja régit
        await updateRecipe(id, !file ? { ...inputData, imageUrl: recipe.imageUrl, deleteUrl: recipe.deleteUrl } : inputData, file);
      } else {
        await addRecipe(inputData, file);
      }

      setToast({ visible: true, text: "Feltöltés sikeres!", type: "success" });

      setName("");
      setIngredients([""]);
      setSteps("");
      setCategory("");
      setFile(null);
      setPreview(null);

      navigate("/recipes");

    } catch (error) {
      console.error("Hiba:", error);
      setToast({ visible: true, text: "Hiba történt a feltöltés során!", type: "error" });

    } finally {
      setLoading(false);
      setTimeout(() => setToast(p => ({ ...p, visible: false })), 2000);
    }
  };

  const handleChangeIngredients = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredients = () => {
    setIngredients(prev => [...prev, ""]);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="recipe-form-container" style={{ position: "relative" }}>
      <h1 className="form-title">Új recept feltöltése</h1>

      <form className="recipe-card" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="receptnév"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="ingredients-wrapper">
          {ingredients.map((item, index) => (
            <div className="ingredient-row" key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleChangeIngredients(index, e.target.value)}
                placeholder={`${index + 1} hozzávaló:`}
              />

              <div className="ingredient-actions">
                {/* Remove icon only if >1 ingredient */}
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    className="small-btn remove-btn"
                    onClick={() => handleRemoveIngredient(index)}
                    aria-label={`Remove ingredient ${index + 1}`}
                  >
                    &times;
                  </button>
                )}

                {index === ingredients.length - 1 && (
                  <button
                    type="button"
                    className="icon-button add-icon"
                    onClick={handleAddIngredients}
                    aria-label="Add ingredient"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Elkészítés lépései:"
          required
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategória:"
          required
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="előnézet" className="preview-img" />}

        <button className="save-btn" disabled={loading} type="submit">Mentés</button>
      </form>

      {loading && <div className="loading-overlay">Loading…</div>}
      {toast.visible && (
        <div className={`toast-message ${toast.type}`}>
          {toast.text}
        </div>
      )}
      <IoClose
        onClick={() => navigate("/recipes")}
        className="close-icon"
        title="Vissza"
      />
    </div>

  );
};