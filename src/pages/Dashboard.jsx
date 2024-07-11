import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenFunval');

  useEffect(() => {
    fetch('http://localhost:3000/me', { headers: { authorization: token } })
      .then(res => res.json())
      .then(datos => {
        setData(datos);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [token]);

  if (!token) {
    navigate('/');
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('tokenFunval');
    navigate('/');
  };

  return (
    <main>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <h1>
        ¡Bienvenido, {data.nombres} {data.apellidos}!
      </h1>
    </main>
  );
}

export default Dashboard;
