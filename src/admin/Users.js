import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth';
import { getUsers, deleteUser } from './apiAdmin';
import { VisibilityOutlined, EditOutlined, DeleteOutline } from '@material-ui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import Swal from 'sweetalert2';

const Users = (props) => {
  const { user, token } = isAuth();

  const [values, setValues] = useState({
    users: [],
  });

  // Alias del estado
  const { users } = values;

  useEffect(() => {
    getUsers(user._id, token)
      .then(users => setValues({...values, users}))
      .catch(error => console.log(error));
  }, [users]);

  const onDelete = (userToDelete) => {
    Swal.fire({
      icon: 'warning',
      title: `Se eliminará el usuario '${userToDelete.username}'`,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => deleteUser(user._id, token, userToDelete._id),
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (!result.value) return null;
      if (result.value.hasOwnProperty('error')) {
        Swal.fire({
          icon: 'error',
          title: "Se produjo un error al eliminar el usuario",
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: `El usuario '${userToDelete.username}' fue eliminado correctamente`,
        });
      }
    });
  };

  const renderActions = (data) => (
    <div className="text-nowrap text-center">
      <VisibilityOutlined className="ml-1 mr-1" style={{ cursor: 'pointer', fontSize: '18px' }} 
        onClick={() => props.history.push('/user', { _id: data._id })}  
      />
      {/* @TODO: <EditOutlined className="ml-1 mr-1" style={{ cursor: 'pointer', fontSize: '18px' }} 
        onClick={() => console.log(data.username)}
      /> */}
      <DeleteOutline className="ml-1 mr-1" style={{ cursor: 'pointer', fontSize: '18px' }} 
        onClick={() => onDelete(data)}
      />
    </div>
  );

  const columns = [{
      dataField: 'client_id',
      text: 'ID',
      sort: true,
    }, {
      dataField: 'username',
      text: 'Usuario',
      sort: true,
    }, {
      dataField: 'name',
      text: 'Nombre',
      sort: true,
      formatter: (cell, row) => `${row.name || ''} ${row.surname || ''}`,
    }, {
      dataField: 'email',
      text: 'Email',
    }, {
      dataField: 'role',
      text: 'Rol',
      sort: true,
      formatter: (cell, row) => cell === 1 ? 'Admin' : 'Cliente',
    }, {
      text: 'Acciones',
      formatter: (cell, row) => renderActions(row),
    }
  ];

  return (
    <Layout
      title="USUARIOS"
      description=""
    >
        <div className="col-md-11 pb-2 m-auto">
          <button
            onClick={() => props.history.push('/signup', { from: props.location })}
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Crear Usuario
          </button>
          <BootstrapTable 
            bootstrap4
            classes="table-responsive-sm table-sm table-hover bg-white text-nowrap"
            headerWrapperClasses="thead-dark"
            keyField="_id" 
            data={ users ? users : [] } 
            columns={ columns }
          />
        </div>

    </Layout>
  );
}

export default Users;