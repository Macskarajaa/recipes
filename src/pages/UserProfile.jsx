import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { IoMdClose } from "react-icons/io";
import { updateAvatar } from '../myBackend'



export const UserProfile = () => {
    const { user, avatarUpdate, deleteAccount } = useContext(MyUserContext)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!file) return
        try {
            await avatarUpdate(file)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    };

    const handleFileChange = async (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        if (selected) setPreview(URL.createObjectURL(selected));
    };

    const handleDelete = async () => {
        if (window.confirm("Biztos törölni szeretni fiókját?")) {
            const pw = prompt("Add meg a jelszavad a fiók törléséhez!")
            await deleteAccount(pw)
        }
    }


    return (
        <div className="profile-wrapper">

            <div className="profile-header">
                <h1 className="profile-title">Profil</h1>
                <IoMdClose
                    onClick={() => navigate("/recipes")}
                    className="close-icon"
                    title="Vissza"
                />
            </div>

            <div className="profile-card">

                {/* Profile Info */}
                <div className="profile-info">
                    <div className="profile-image-wrapper">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                className="profile-img"
                                alt="profil"
                            />
                        ) : (
                            <div className="profile-placeholder">?</div>
                        )}
                    </div>

                    <div className="profile-text">
                        <h3 className="profile-name">{user?.displayName}</h3>
                        <p className="profile-email">{user?.email}</p>
                    </div>
                </div>

                {/* Upload New Photo */}
                <div className="upload-section">
                    <label className="upload-label">Új profilkép</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="upload-input"
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="előnézet"
                            className="preview-img"
                        />
                    )}
                </div>

                {/* Save Button */}
                <button
                    className="save-btn"
                    disabled={loading}
                    type="submit"
                    onClick={handleSubmit}
                >
                    {loading ? "Mentés..." : "Mentés"}
                </button>
            </div>

            {/* Delete Account */}
            <button className="delete-btn" onClick={handleDelete}>
                Fiók törlése
            </button>

            {/* Loading Overlay */}
            {loading && <div className="loading-overlay">Loading...</div>}

        </div>


    )
}

