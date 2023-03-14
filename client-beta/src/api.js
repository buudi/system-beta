
const API_BASE_URL = "http://localhost:3000/general";

export const fetchAllData = async () => {
    const [apartmentsResponse, roomsResponse, tenantsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/apartments`).then(res => res.json()),
        fetch(`${API_BASE_URL}/rooms`).then(res => res.json()),
        fetch(`${API_BASE_URL}/tenants`).then(res => res.json()),
    ]);

    return { apartmentsResponse, roomsResponse, tenantsResponse };
};
