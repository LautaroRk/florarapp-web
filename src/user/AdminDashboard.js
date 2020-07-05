import React from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  const { user: {
    _id, username, email, name, surname, role
  }} = isAuth();

  const adminLinks = () => {
    return (
      <div className="card">
        <h5 className="card-header">Administrar</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/users">Usuarios</Link>
          </li>
          <li className="list-group-item">
            <Link to="/auctions">Subastas</Link>
          </li>
          {/* <li className="list-group-item">
            <Link to="/signup">Crear usuario</Link>
          </li>
          <li className="list-group-item">
            <Link to="/create/auction">Crear subasta</Link>
          </li> */}
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h5 className="card-header">Mi perfil</h5>
        <ul className="list-group">
          {username && 
            <li className="list-group-item">
              <span className="d-inline-block w-25 text-muted small">Usuario</span>
              {username}
            </li>
          }
          {email && 
            <li className="list-group-item">
              <span className="d-inline-block w-25 text-muted small">Email</span> 
              {email}
            </li>
          }
          {(name || surname) && 
            <li className="list-group-item">
              <span className="d-inline-block w-25 text-muted small">Nombre</span>
              {`${name} ${surname}`}
            </li>
          }
          <li className="list-group-item">
            <span className="d-inline-block w-25 text-muted small">Rol</span>
            {role === 0 ? "Cliente" : "Administrador"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="PANEL DE ADMINISTRADOR" description={username}>
      <div className="d-flex row">
        <div className="col-3 ml-auto mr-1 align-self-flex-start">
          {adminLinks()}
        </div>
        <div className="col-7 mr-auto ml-1">
          {adminInfo()}
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;