import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { deleteRecipe } from "../myBackend";
import { useNavigate } from "react-router";

export const RecipeCard = ({
  id,
  name,
  steps = "",
  ingredients = [],
  imageUrl,
  deleteUrl,
  category,
}) => {
  const navigate = useNavigate();
  const list = Array.isArray(ingredients) ? ingredients : [];

  return (
    <article className="rc-card" aria-labelledby={`rc-title-${id}`}>
      <div className="rc-actions">
        <button
          className="rc-icon rc-edit"
          onClick={() => navigate("/edit/" + id)}
          aria-label="Szerkesztés"
          type="button"
        >
          <MdModeEditOutline size={20} />
        </button>

        <button
          className="rc-icon rc-delete"
          onClick={() => deleteRecipe(id, deleteUrl)}
          aria-label="Törlés"
          type="button"
        >
          <MdDeleteForever size={20}/>
        </button>
      </div>

      <div className="rc-image-wrap">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name || "Recept képe"}
            className="rc-image"
          />
        ) : (
          <div className="rc-image-placeholder">Kép nincs</div>
        )}
      </div>

      <div className="rc-body">
        <h2 id={`rc-title-${id}`} className="rc-title">
          {name}
        </h2>

        {category && <span className="rc-badge">{category}</span>}

        <div className="rc-section">
          <h4 className="rc-subtitle">Hozzávalók</h4>
          <ul className="rc-ingredients">
            {list.length === 0 ? (
              <li className="rc-ingredient">Nincs megadva</li>
            ) : (
              list.map((ing, i) => (
                <li key={i} className="rc-ingredient">
                  {ing}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rc-section">
          <h4 className="rc-subtitle">Elkészítés</h4>
          <p className="rc-steps">
            {steps}
          </p>
        </div>
      </div>
    </article>
  );
};