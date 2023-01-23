import axios, { AxiosError } from 'axios';
import JSONbig from 'json-bigint';

const BASE_URL = 'http://127.0.0.1:8000/api';

type User = {
    id: string;
    username: string;
    email: string | null;
    max_calories: number | null;
};

type Food = {
    id: string;
    name: string;
    date: string;
    category: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    user: string;
    calorie: number;
};

export async function get_users({ token }: { token: string }) {
  try {
      const response = await axios.get(`${BASE_URL}/users/`, {
          transformResponse: [data => data],
          headers: {
              Authorization: `Token ${token}`,
          },
      });
      response.data = JSONbig.parse(response.data);
      response.data.results.forEach((user: User) => {
          user.id = user.id.toString();
      });
      return response.data;
  } catch (error: any) {
      throw error.response.data
  }
}

export async function get_token({ username, password }: { username: string, password: string }) {
  try {
      const response = await axios.post(`${BASE_URL}/api-token-auth/`, {
          username,
          password
      }, {
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.user_id = response.data.user_id.toString()
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function get_user({ token, id }: { token: string, id: string }) {
  try {
      const response = await axios.get(`${BASE_URL}/users/${id}/`, {
          headers: {
              Authorization: `Token ${token}`,
          },
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.id = response.data.id.toString()
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function get_foods({ token }: { token: string }) {
  try {
      const response = await axios.get(`${BASE_URL}/foods/`, {
          headers: {
              Authorization: `Token ${token}`,
          },
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.results.forEach((food: Food) => {
          food.id = food.id.toString()
          food.user = food.user.toString()
      })
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function get_today_foods({ token }: { token: string }) {
  try {
      const response = await axios.get(`${BASE_URL}/foods/today/`, {
          headers: {
              Authorization: `Token ${token}`,
          },
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.forEach((food: Food) => {
          food.id = food.id.toString()
          food.user = food.user.toString()
      })
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function create_user({ username, password, email }: { username: string, password: string, email: string }) {
  try {
      const response = await axios.post(`${BASE_URL}/users/`, {
          username,
          password,
          email
      }, {
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.id = response.data.id.toString()
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function update_user({ token, id, username, password, email, max_calories }: { token: string, id: string, username: string, password: string, email: string, max_calories: number }) {
  try {
      const response = await axios.patch(`${BASE_URL}/users/${id}/`, {
          username,
          password,
          email,
          max_calories
      }, {
          headers: {
              Authorization: `Token ${token}`,
          },
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.id = response.data.id.toString()
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function create_food({ token, name, date, category }: { token: string, name: string, date: string, category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' }) {
  try {
      const response = await axios.post(`${BASE_URL}/foods/`, {
          name,
          date,
          category
      }, {
          headers: {
              Authorization: `Token ${token}`,
          },
          transformResponse: [data => data]
      })
      response.data = JSONbig.parse(response.data)
      response.data.id = response.data.id.toString()
      response.data.user = response.data.user.toString()
      return response.data
  } catch (error: any) {
      throw (error.response.data)
  }
}

export async function delete_food({ token, id }: { token: string, id: string }) {
  try {
      const response = await axios.delete(`${BASE_URL}/foods/${id}/`, {
          headers: {
              Authorization: `Token ${token}`,
          }
      });
      return response.data;
  } catch (error: any) {
      throw (error.response.data)
  }
}