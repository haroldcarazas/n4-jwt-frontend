import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = {
      username,
      password,
    };

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();

      if (!res.ok) {
        return alert(json.message);
      }

      localStorage.setItem('tokenFunval', json.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario: <input type='text' name='username' required />
        </label>
        <br />
        <label>
          Contraseña: <input type='text' name='password' required />
        </label>
        <br />
        <button type='submit'>Ingresar</button>
      </form>
    </main>
  );
}

export default Login;
