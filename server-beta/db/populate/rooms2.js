const db = require('../index');

(async function(){
    try{
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[2, 'B1','استوديو', 2, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[2, 'B2','عادي', 1, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[2, 'B3','عادي',2, true]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity, vacant)' +
            'values($1, $2, $3, $4, $5)',[2, 'B4','ماستر', 2, true]);
    } catch(err) {
        console.log(err);
    }
})();