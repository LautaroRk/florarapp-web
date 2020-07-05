import { API } from "../config";

export const getUsers = async (userId, token) => {
  try {
    const response = await fetch(`${API}/users/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();

  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (userId, token, id) => {
  try {
    const response = await fetch(`${API}/user/data/${userId}?id=${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();

  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userId, token, id) => {
  try {
    const response = await fetch(`${API}/user/${userId}?id=${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();

  } catch (error) {
    console.error(error);
  }
};

export const getAuctions = async (filter = {}) => {
  try {
    // @TODO: handle filter 
    const response = await fetch(`${API}/auctions`, {
      method: 'GET',
    });
    return response.json();

  } catch (error) {
    console.error(error);
  }
};

export const createAuction = async (userId, token, auction) => {
  // MODELO
  // const {
  //   auction_id,
  //   order_id,
  //   initial_stock,
  //   image_url = '',
  //   article_id,
  //   article = '',
  //   description = '',
  //   category_id = '',
  //   color_id = '',
  //   color = '',
  //   variety_id = '',
  //   variety = '',
  //   quality_id = '',
  //   quality = '',
  //   stem_length_id = '',
  //   stem_length = '',
  //   stems = '',
  //   source_id = '',
  //   source = '',
  //   initial_price,
  //   provider_id = '',
  //   provider = '',
  //   opening_id = '',
  //   opening = '',
  //   observations = '',
  //   min_price,
  //   min_quantity = '',
  //   start_date,
  //   duration = '',
  //   discount_freq = '',
  //   discount_rate = '',
  //   fixed = false,
  // } = auction;

  try {
    const response = await fetch(`${API}/auction/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(auction),
    });
    return response.json();

  } catch (error) {
    console.error(error)
  }

}