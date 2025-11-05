import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { addRecipe } from '../myBackend';

export const RecipesForm = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChangeIngredients = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => setIngredients((prev) => [...prev, '']);

  const handleRemoveIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
    else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const inputData = { name: name.trim(), ingredients: ingredients.filter(Boolean), steps, category };
      await addRecipe(inputData, file);
      navigate('/');
    } catch (err) {
      console.error('Save failed', err);
      alert('Hiba történt a mentés során. Kérlek próbáld újra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-page">
      <div className="recipe-card">
        <button onClick={() => navigate('/')} className="close-btn" aria-label="Close">
          <IoMdClose size={20} />
        </button>

        <h1 className="form-title">Új recept feltöltése</h1>

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label>Recept neve</label>
            <input type="text" placeholder="recept neve" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Elkészítés lépései</label>
            <textarea value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="steps" required rows={5}></textarea>
          </div>

          <div className="form-group">
            <label>Hozzávalók</label>
            {ingredients.map((item, idx) => (
              <div className="ingredient-row" key={idx}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChangeIngredients(idx, e.target.value)}
                  placeholder={`#${idx + 1} hozzávaló`}
                />
                <button type="button" onClick={() => handleRemoveIngredient(idx)} className="icon-btn remove">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="add-btn">
              <FaPlus /> Hozzáadás
            </button>
          </div>

          <div className="form-group">
            <label>Kategória</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategória" required />
          </div>

          <div className="form-group">
            <label>Kép feltöltése</label>
            {preview ? <img src={preview} alt="előnézet" className="preview-img" /> : <div className="no-preview">Nincs kép kiválasztva</div>}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')} className="cancel-btn">Mégse</button>
            <button type="submit" disabled={loading} className="save-btn">{loading ? 'Mentés folyamatban...' : 'Mentés'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
