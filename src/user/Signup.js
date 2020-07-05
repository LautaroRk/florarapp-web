import React, { useState } from "react";
import Layout from "../core/Layout";
import { signup } from "../auth";
import Swal from 'sweetalert2';

const Signup = (props) => {
  const [values, setValues] = useState({
    client_id: "123123",
    username: "masche",
    email: "javi@gmail.com",
    name: "Javier",
    surname: "Mascherano",
    password: "asd123",
    confirmPassword: "asd123",
    error: "",
    success: false,
  });

  // Alias del estado
  const {
    client_id,
    username,
    email,
    name,
    surname,
    password,
    confirmPassword,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, error: "" });

    const data = await signup({ client_id, username, email, name, surname, password });

    if (data.error) {
      setValues({
        ...values,
        error: data.error.message,
        success: false,
      });
      Swal.fire({
        icon: 'error',
        title: data.error.message,
      });
    } else {
      setValues({
        ...values,
        client_id: "",
        username: "",
        email: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: "",
        error: "",
        success: true,
      });
      Swal.fire({
        icon: 'success',
        title: "Usuario registrado exitosamente",
      }).then(() => props.history.goBack());
    }
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">ID Cliente<span style={{color: 'red'}}>*</span></label>
        <input
          onChange={handleChange("client_id")}
          type="text"
          className="form-control"
          value={client_id}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Nombre de usuario<span style={{color: 'red'}}>*</span></label>
        <input
          onChange={handleChange("username")}
          type="text"
          className="form-control"
          value={username}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Nombre</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Apellido</label>
        <input
          onChange={handleChange("surname")}
          type="text"
          className="form-control"
          value={surname}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Contraseña<span style={{color: 'red'}}>*</span></label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Confirmar Contraseña<span style={{color: 'red'}}>*</span></label>
        <input
          onChange={handleChange("confirmPassword")}
          type="password"
          className="form-control"
          value={confirmPassword}
        />
      </div>

      <button
        onClick={onSubmit}
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Registrar
      </button>
    </form>
  );

  const showError = () => error && (
    <div
      className="alert alert-danger"
    >
      {error}
    </div>
  );

  const showSuccess = () => success && (
    <div
      className="alert alert-info"
    >
      Usuario creado exitosamente
    </div>
  );

  return (
    <Layout
      title="ALTA DE USUARIO"
      description=""
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
