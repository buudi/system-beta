const db = require('../index');

(async function(){
    try{
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[1, 'A1','عادي', 2, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[1, 'A2','عادي', 1, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[1, 'A3','ماستر',3, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[1, 'A4','ماستر', 1, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[1, 'A5','عادي', 2, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[1, 'A6','ماستر', 1, true]);
    } catch(err) {
        console.log(err);
    }
})();