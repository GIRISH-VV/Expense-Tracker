import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:5000/api";

function authConfig(token){
    return{
        headers:{
            Authorization: `Bearer ${token}`,

        }
    }
}

export async function registerUser({name, email, password}){
    const response = await axios.post(
        `${API_BASE_URL}/auth/register`,{
            name,
            email,
            password,
        }
    );
    return response.data;
}

export async function loginUser({email, password}){
    const response = await axios.post(
        `${API_BASE_URL}/auth/login`,{
            email,
            password,
        }
    );
    return response.data;
}

export async function storeExpense(expenseData, token){
    const response = await axios.post(
        `${API_BASE_URL}/expense/add`,
        expenseData,
        authConfig(token)
    );
    return response.data.data._id;
}

export async function fetchExpense(token, days = 7){
    const response = await axios.get(
        `${API_BASE_URL}/expense?days=${days}`,
        authConfig(token)
    );
    return response.data.data.map((item) => ({
        id: item._id,
        amount: item.amount,
        data: new Date(item.data),
        description: item.description,
    }));
}

export async function fetchMonthlyExpenses(token, month, year){
    const response = await axios.get(
        `${API_BASE_URL}/expense/get?month=${month}&year=${year}`,
        authConfig(token)
    );
    return response.data.data.map((item) => ({
        id: item._id,
        amount: item.amount,
        date: new Date(item.data),
        description: item.description,
    }));
}

export function updateExpense(id, expenseData, token){
    return axios.put(
        `${API_BASE_URL}/expense/update/${id}`,
        expenseData,
        authConfig(token)
    );
}

export function deleteExpense(id, token){
    return axios.delete(
        `${API_BASE_URL}/expense/delete/${id}`,
        authConfig(token)
    );
}