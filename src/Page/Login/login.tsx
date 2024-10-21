import { useContext } from 'react';
import { LoginHook } from './hook';
import { UserContext } from '../../App';

export const Login = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Login must be used within a UserProvider');
  }
  const { setUserContext } = context;
  const { user, validateLogin, error, handleLogin } = LoginHook(setUserContext);
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 card p-5">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <form>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="text"
                className="form-control"
                value={user.email}
                onChange={(e) => validateLogin("email", e.target.value)}
                placeholder="Ingresa tu correo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={user.password}
                onChange={(e) => validateLogin("password", e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            {/* {error && <div className="alert alert-danger mt-3">{error}</div>} */}
            <button type="submit" disabled={error.length < 0}  title={error} onClick={handleLogin} className="btn btn-primary btn-block mt-3">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

