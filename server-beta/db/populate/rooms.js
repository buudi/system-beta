const db = require('../index');

(async function(){
    try{
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[1, 'A1','عادي', 2]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[1, 'A2','عادي', 1]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[1, 'A3','ماستر',3]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[1, 'A4','ماستر', 1]);
    } catch(err) {
        console.log(err);
    }
})();