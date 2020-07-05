import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth';
import { Link } from 'react-router-dom';
import { createAuction } from './apiAdmin';

const NewAuction = () => {
  const [] = useState({});

  const { user, token } = isAuth();

  return (
    <Layout
      title="Nueva subasta"
      description=""
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">...</div>
      </div>
    </Layout>
  );
}

export default NewAuction;