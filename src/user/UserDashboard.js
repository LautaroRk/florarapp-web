import React from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth';
import { Link } from 'react-router-dom';

const UserDashboard = () => {

  const { user: {
    _id, username, email, name, surname, role
  }} = isAuth();

  const userLinks = () => {
    return (
      <div className="card">
        <h5 className="card-header">Links</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/profile/update">Editar perfil</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
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

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h5 className="card-header">Historial de compras</h5>
        <ul className="list-group">
          <li className="list-group-item">compra</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="PANEL DE USUARIO" description={username} className="container">
      <div className="row">
        <div className="col-3 ml-auto mr-1 align-self-flex-start">
          {userLinks()}
        </div>
        <div className="col-7 mr-auto ml-1">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;