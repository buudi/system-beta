const db = require('../index');

(async function(){
    try{
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type)' +
            'values($1, $2, $3)',[2, 'B1','استوديو']);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[2, 'B2','عادي', 1]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[2, 'B3','عادي',2]);
        await db.query('insert into rooms(' +
            'apt_id, room_number, room_type, capacity)' +
            'values($1, $2, $3, $4)',[2, 'B4','ماستر', 2]);
    } catch(err) {
        console.log(err);
    }
})();