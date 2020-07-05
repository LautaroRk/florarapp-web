import React, { useState, useEffect, useRef } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth';
import { getAuctions, createAuction } from './apiAdmin';
import { VisibilityOutlined, EditOutlined, DeleteOutline } from '@material-ui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import Swal from 'sweetalert2';
import { dateToString, excelDateToJs } from '../utils/dates';
import Auction from '../auction/Auction';
import * as XLSX from 'xlsx';

const io = require('socket.io-client');
const socket = io('http://localhost:8000');

const Auctions = (props) => {
  const { user, token } = isAuth();

  const [values, setValues] = useState({
    auctions: [],
  });

  const fileRef = useRef(null);

  // Alias del estado
  const { auctions } = values;

  useEffect(() => {
    getAuctions()
      .then(auctions => setValues({...values, auctions}))
      .catch(error => console.log(error));
  }, []);

  const renderActions = (data) => (
    <div className="text-nowrap text-center">
      <VisibilityOutlined className="ml-1 mr-1" style={{ cursor: 'pointer', fontSize: '18px' }} 
        //onClick={() => props.history.push('/user', { _id: data._id })}  
        onClick={() => socket.emit('test', {_id: data._id, stock_left: 5, username: 'Pepe'})}
      />
      {/* @TODO: <EditOutlined className="ml-1 mr-1" style={{ cursor: 'pointer', fontSize: '18px' }} 
        onClick={() => console.log(data.username)}
      /> */}
      {/* <DeleteOutline className="ml-1 mr-1" style={{ cursor: 'pointer', fontSize: '18px' }} 
        onClick={() => onDelete(data)}
      /> */}
    </div>
  );

  const formatAuction = auction => {
    try {
      const result = {
        order_id:         auction["IdPedido"],
        auction_id:       auction["Id"],
        initial_stock:    auction["Cant"],
        article_id:       auction["IdArticulo"],
        description:      auction["Descripción"],
        description0C:    auction["0C"],
        category_id:      auction["IdRubro"],
        color_id:         auction["IdColor"],
        color:            auction["Color"],
        variety_id:       auction["IdVariedad"],
        variety:          auction["Variedad"],
        quality_id:       auction["IdCalidad"],
        quality:          auction["Calidad"],
        stem_length_id:   auction["IdLargoTallo"],
        stem_length:      auction["Largo"],
        stems:            auction["Varas"],
        source_id:        auction["IdOrigen"],
        source:           auction["Origen"],
        initial_price:    auction["Precio"],
        min_price:        auction["PrecioMin"],
        provider:         auction["Proveedor"],
        provider_id:      auction["IdProveedor"],
        opening_id:       auction["IdApertura"],
        opening:          auction["Apertura"],
        observations:     auction["Observaciones"],
        start_date:       excelDateToJs(auction["Inicio"]),
        duration:         auction["Minutos"],
        min_quantity:     auction["CantMin"],
        discount_freq:    auction["FrecDesc"],
        discount_rate:    auction["PorcDesc"],
        image_url:        auction["Foto"],
      };

      return result;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const uploadFile = async () => {
    try {
      const errors = [];

      if (fileRef.hasOwnProperty('current')) {
        if (fileRef.current.files.length) {
          const file = fileRef.current.files[0];
          const reader = new FileReader();
          reader.onload = e => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: 'binary'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            
            // @TODO: validar datos antes de llamar al back
            data.forEach(async (auction, index) => {
              const formattedAuction = formatAuction(auction);
              const response = await createAuction(user._id, token, formattedAuction);

              console.log(response)
              
              if (response.hasOwnProperty("error")) {
                errors.push({ row: index + 2, id: formattedAuction.auction_id, error: response.error });
              } 
            });
          };
          reader.readAsBinaryString(file);
          getAuctions()
            .then(auctions => setValues({...values, auctions}))
            .catch(error => console.log(error));
        };
      };

      // // Si no hubo errores
      // console.log("ERRORS: ", errors, errors.length)
      // if (errors.length === 0) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: `Se agregaron ${rowsCount} subastas`,
      //   });
      // // Si hubo algunos errores
      // } else if (errors.length > 0 && errors.length < rowsCount.length) {
      //   Swal.fire({
      //     icon: 'warning',
      //     title: `Revisa las lineas: ${errors.map(error => `${error.row} `)}`,
      //     text: `Se agregaron ${rowsCount.length - errors.length} subastas`,
      //   });
      // // Si todos fueron errores
      // } else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'Por favor revisa el archivo',
      //   });
      // }

      return true;

    } catch (error) {
      // Informamos el error.
      console.log(error);
      return false;
    }
  };

  const showDescription = (auction) => {
    let descText = "";
    if (auction.article_id === "0C") {
      descText = auction.description0C;
    } else {
      if (auction.description) descText = descText.concat(auction.description);
      // if (auction.variety) descText = descText.concat(" - " + auction.variety);
      if (auction.color) descText = descText.concat(" - " + auction.color);
      if (auction.quality) descText = descText.concat(" - " + auction.quality);
      if (auction.source) descText = descText.concat(" - " + auction.source);
      if (auction.stem_length) descText = descText.concat(" - " + auction.stem_length);
      if (auction.stems) descText = descText.concat(" - x" + auction.stems);
    }
    
    return descText;
  };

  const columns = [{
      dataField: 'auction_id',
      text: 'ID',
      sort: true,
    }, {
      dataField: 'stock_left',
      text: 'Stock',
      sort: true,
    }, {
      dataField: 'article_id',
      text: 'Articulo',
      sort: true,
      formatter: (cell, row) => row.article_id !== "0C" ? row.description : "0C",
    }, {
      dataField: 'description',
      text: 'Descripción',
      formatter: (cell, row) => showDescription(row),
    }, {
      dataField: 'initial_price',
      text: 'Precio Inicial',
      sort: true,
      formatter: (cell, row) => `$${cell}`,
    }, {
      dataField: 'start_date',
      text: 'Fecha Inicio',
      sort: true,
      formatter: (cell, row) => dateToString(new Date(cell)),
    }, {
      dataField: '_id',
      text: 'Acciones',
      formatter: (cell, row) => renderActions(row),
    }
  ];

  return (
    <Layout
      title="SUBASTAS"
      description=""
    >
        <div className="col-md-11 pb-2 m-auto">
          {/* <button
            onClick={() => props.history.push('/create/auction', { from: props.location })}
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Crear Subasta
          </button> */}
          <div className="d-flex row flex-wrap mb-3">
            { 
              auctions
              .filter(auction => new Date(auction.end_date) >= new Date())
              .sort((a, b) => { return new Date(a.start_date) - new Date(b.start_date)})
              .map(auction => <Auction key={auction._id} auction={auction}/>)
            }
          </div>
          <label htmlFor="file" className="mb-0">Cargar subastas:</label>
          <div className="input-group mb-2 flex-column w-25 p-0">
            <div className="mt-1 p-0" style={{ width: 230 }}>
              <input type="file" id="file" ref={fileRef} style={{ width: 210, cursor: 'pointer' }} onChange={uploadFile} />
            </div>
          </div>
          <BootstrapTable 
            bootstrap4
            classes="table-responsive-sm table-sm table-hover bg-white"
            headerWrapperClasses="thead-dark"
            keyField="_id"
            defaultSorted={[{ dataField: "start_date", order: 'desc' }]}
            data={ auctions } 
            columns={ columns }
          />
        </div>

    </Layout>
  );
}

export default Auctions;