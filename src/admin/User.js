import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth';
import { Link } from 'react-router-dom';
import { dateToString } from '../utils/dates';
import { getUser } from './apiAdmin';
import BootstrapTable from 'react-bootstrap-table-next';

const User = (props) => {

  const [profile, setProfile] = useState({});

  const { 
    _id,
    client_id, 
    username, 
    email, 
    name, 
    surname, 
    role, 
    history, 
  } = profile;

  const { 
    token,
    user,
  } = isAuth();

  useEffect(() => {
    getUser(user._id, token, props.location.state._id)
      .then(user => setProfile(user))
      .catch(error => console.log(error));
  }, []);

  const userInfo = () => {
    return (
      <div className="card mb-3 col-7 p-0">
        <h5 className="card-header">Perfil</h5>
        <ul className="list-group">
          {client_id && 
            <li className="list-group-item p-1 pl-4">
              <span className="d-inline-block w-25 text-muted small">ID</span>
              {client_id}
            </li>
          }
          {username && 
            <li className="list-group-item p-1 pl-4">
              <span className="d-inline-block w-25 text-muted small">Usuario</span>
              {username}
            </li>
          }
          {email && 
            <li className="list-group-item p-1 pl-4">
              <span className="d-inline-block w-25 text-muted small">Email</span> 
              {email}
            </li>
          }
          {(name || surname) && 
            <li className="list-group-item p-1 pl-4">
              <span className="d-inline-block w-25 text-muted small">Nombre</span>
              {`${name} ${surname}`}
            </li>
          }
          <li className="list-group-item p-1 pl-4">
            <span className="d-inline-block w-25 text-muted small">Rol</span>
            {role === 0 ? "Cliente" : "Administrador"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {

    const columns = [{
      dataField: 'auction_id',
      text: 'ID Subasta',
      sort: true,
    }, {
      dataField: 'date',
      text: 'Fecha',
      sort: true,
      formatter: (cell, row) => dateToString(new Date(cell))
    }, {
      dataField: 'quantity',
      text: 'Cantidad',
      sort: true,
    }, {
      dataField: 'unit_price',
      text: 'Precio/u.',
      formatter: (cell, row) => `$${cell}` 
    }, {
      dataField: 'total',
      text: 'Total',
      sort: true,
      formatter: (cell, row) => `$${cell}`
    }, 
    // {
    //   dataField: '_id',
    //   text: 'Acciones',
    //   formatter: (cell, row) => renderActions(row),
    // }
  ];

  return (
    <div className="card mb-5">
      <h5 className="card-header">Historial de compras</h5>
      <BootstrapTable 
        keyField="_id" 
        columns={ columns } 
        data={ history || [] } 
        bootstrap4
        classes="table-responsive-sm table-sm table-hover bg-white text-nowrap mb-0"
        noDataIndication={() => <p className="text-center text-muted m-2">El usuario '{username}' no tiene compras registradas</p>}
      />
    </div>
  );
  };

  return (
    <Layout title="DETALLE DE USUARIO" description={username}>
      <div className="d-flex flex-column col-11 m-auto">
        {userInfo()}
        {purchaseHistory()}
      </div>
    </Layout>
  );
}

export default User;