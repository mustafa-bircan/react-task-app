import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginPage.css'; // CSS dosyasını import ettik

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email === 'admin@example.com' && data.password === 'password123') {
      toast.success("Başarıyla giriş yapıldı!");
      navigate('/dashboard');
    } else {
      toast.error("Geçersiz e-posta veya şifre!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Giriş</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>E-posta</label>
            <input
              type="email"
              className="input-field"
              {...register('email', { required: 'E-posta gerekli' })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label>Şifre</label>
            <input
              type="password"
              className="input-field"
              {...register('password', { required: 'Şifre gerekli' })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="submit-btn">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
