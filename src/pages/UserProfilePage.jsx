import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import endpoints from '../utils/endpoints';
import { LoginContext } from '../context/LoginContext';
import Cookies from 'js-cookie';
import './UserProfilePage.css';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [profileData, setProfileData] = useState({
    displayName: '',
    profileImage: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Si no hay usuario logueado, redirigir al login
    if (!user || !user.logged) {
      navigate('/login');
      return;
    }

    // Cargar datos del perfil
    loadProfile();
  }, [user, navigate]);

  const loadProfile = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${endpoints.userProfile}profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userData = response.data.user;
      setProfileData({
        displayName: userData.displayName || userData.username,
        profileImage: userData.profileImage
      });
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      setMessage({ text: 'Error al cargar el perfil', type: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ text: 'Solo se permiten archivos JPG, PNG y WebP', type: 'error' });
        return;
      }

      // Validar tamaño (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setMessage({ text: 'El archivo es demasiado grande. Máximo 5MB', type: 'error' });
        return;
      }

      setProfileData(prev => ({
        ...prev,
        profileImage: file
      }));

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('displayName', profileData.displayName);
      
      if (profileData.profileImage instanceof File) {
        formData.append('profileImage', profileData.profileImage);
      }

      const response = await axios.put(`${endpoints.userProfile}profile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Actualizar contexto y cookies
      const updatedUser = response.data.user;
      const newUserData = {
        ...user,
        nombre: updatedUser.displayName,
        profileImage: updatedUser.profileImage
      };

      setUser(newUserData);
      Cookies.set('usuario', JSON.stringify(newUserData), { expires: 2 });

      setMessage({ text: 'Perfil actualizado exitosamente', type: 'success' });
      
      // Limpiar preview si se subió una nueva imagen
      if (profileData.profileImage instanceof File) {
        setPreviewImage(null);
      }

    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setMessage({ 
        text: error.response?.data?.error || 'Error al actualizar el perfil', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/Admin');
  };

  if (!user || !user.logged) {
    return null;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="profile-header">
          <button onClick={handleBack} className="back-button">
            ← Volver al panel
          </button>
          <h1>Mi Perfil</h1>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-image-section">
            <div className="image-preview-container">
              <img 
                src={previewImage || profileData.profileImage || '/default-avatar.png'} 
                alt="Foto de perfil" 
                className="profile-image"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
            </div>
            <div className="image-upload-section">
              <label htmlFor="profileImage" className="upload-label">
                Cambiar foto de perfil
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="file-input"
              />
              <small className="file-info">
                Formatos: JPG, PNG, WebP. Máximo 5MB
              </small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="displayName" className="form-label">
              Nombre para mostrar
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={profileData.displayName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Tu nombre"
              required
            />
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
} 