// this file contains suggestions to refactor the code from chat gpt

// Here are some ways you could improve/refactor this function:
//     Use Array.find() instead of a for loop to find the matching apartment.
//     Use Array.filter() instead of a for loop to filter the rooms by apartment ID.
//     Use Array.filter() instead of a for loop to filter the tenants by room ID.
//     Use Array.map() instead of a for loop to transform the filtered tenants array into an array of objects.
//     Extract the data mapping logic to separate functions to improve readability and make the code easier to maintain.
//     Consider using object destructuring in function arguments instead of accessing properties from the props object.
//     Consider breaking down the function into smaller functions for better maintainability and testability.
//     Here's an example of how you could refactor the code:



const findApartmentById = (apartments, id) => {
    return apartments.find(apartment => apartment.apt_id === parseInt(id));
};

const filterRoomsByApartmentId = (rooms, id) => {
    return rooms.filter(room => room.apt_id === parseInt(id));
};

const filterTenantsByRoomId = (tenants, roomId) => {
    return tenants.filter(tenant => tenant.room_id === roomId);
};

const mapTenantToPreviewData = (roomNumber, tenant) => {
    return {
        key: tenant.room_id,
        roomNumber: roomNumber,
        tenantName: tenant.name,
        tenantNumber: tenant.phone_number,
        tenantEID: tenant.emirates_id,
        rent: tenant.assigned_monthly_rent,
        contractStart: tenant.date_settle_in,

        // TODO: figure out the contractEnd
        contractEnd: "04_2023",
    };
};

const handleClick = () => {
    const { rooms, tenants, apartments } = props.data;

    const apartment = findApartmentById(apartments, id);

    if (!apartment) {
        console.log("apartment not found!!");
        return;
    }

    const selectedRooms = filterRoomsByApartmentId(rooms, id);

    const selectedTenants = selectedRooms.reduce((result, room) => {
        const tenantsInRoom = filterTenantsByRoomId(tenants, room.room_id);
        return [...result, ...tenantsInRoom];
    }, []);

    const dataToPreview = selectedTenants.map(tenant => {
        const room = selectedRooms.find(room => room.room_id === tenant.room_id);
        return mapTenantToPreviewData(room.room_number, tenant);
    });

    setRoomsData(dataToPreview);
    setAptTitle(`شقة ${apartment.building_name} ${apartment.apt_number}`);
};




// TODO: refactor the handleClick
// const handleClick = () => {
//     const {rooms, tenants, apartments} = props.data;
//     let apt = {};
//     for (let i = 0; i < apartments.length; i++){
//         if (apartments[i].apt_id === parseInt(id)){
//             apt = {
//                 id: id,
//                 building_name : apartments[i].building_name,
//                 apt_number:  apartments[i].apt_number
//             }
//         }
//     }
//
//     if (Object.keys(apt).length === 0) {
//         console.log("apartment not found!!")
//     }
//
//     let selectedRooms = [];
//
//     for (let i = 0; i < rooms.length; i++){
//         if(rooms[i].apt_id === parseInt(id)){
//             let room = rooms[i];
//             selectedRooms.push({
//                 room_id: room.room_id,
//                 room_number: room.room_number
//             })
//         }
//     }
//
//     let selectedTenants = [];
//     let dataToPreview = [];
//
//     for (let i = 0; i < tenants.length; i++){
//         for (let j = 0; j < selectedRooms.length; j++ ){
//             if (tenants[i].room_id === selectedRooms[j].room_id && !selectedTenants.includes(tenants[i].name)){
//                 let tenant = tenants[i];
//                 selectedTenants.push({
//                     tenant_id: tenant.tenant_id,
//                     room_id: tenant.room_id,
//                     room_number: selectedRooms[j].room_number,
//                     name: tenant.name,
//                     phone_number: tenant.phone_number,
//                     emirates_id: tenant.emirates_id,
//                     date_settle_in: tenant.date_settle_in,
//                     assigned_monthly_rent : tenant.assigned_monthly_rent
//                 });
//                 dataToPreview.push({
//                     key: selectedRooms[j].room_id,
//                     roomNumber: selectedRooms[j].room_number,
//                     tenantName: tenant.name,
//                     tenantNumber: tenant.phone_number,
//                     tenantEID: tenant.emirates_id,
//                     rent: tenant.assigned_monthly_rent,
//                     contractStart: tenant.date_settle_in,
//
//                     // TODO: figure out the contractEnd
//                     contractEnd: "04_2023",
//                 })
//             }
//         }
//     }
//
//     setRoomsData(dataToPreview);
//     setAptTitle('شقة ' + apt.building_name + ' ' + apt.apt_number)
// }