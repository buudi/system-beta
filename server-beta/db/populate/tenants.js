const { v4: uuidv4 } = require('uuid');
const db = require('../index');

(async function(){
    try{
        await db.query('insert into tenants ' +
            '(tenant_id, room_id, apt_id, name, emirates_id, phone_number, email, assigned_monthly_rent)\n' +
            'values  ($1, $2, $3, $4, $5, $6, $7, $8)',[
            uuidv4(),
            1,
            1,
            'احمد فارس',
            '784-1990-1234567',
            501234567,
            'ahmedfaris@gmail.com',
            1200
        ]);
        await db.query('insert into tenants ' +
            '(tenant_id, room_id, apt_id, name, emirates_id, phone_number, email, assigned_monthly_rent)\n' +
            'values  ($1, $2, $3, $4, $5, $6, $7, $8)',[
            uuidv4(),
            2,
            1,
            'عبدالقادر احمد',
            '784-1995-1234567',
            501234567,
            'kaderAhmed@gmail.com',
            1100
        ]);
        await db.query('insert into tenants ' +
            '(tenant_id, room_id, apt_id, name, emirates_id, phone_number, email, assigned_monthly_rent)\n' +
            'values  ($1, $2, $3, $4, $5, $6, $7, $8)',[
            uuidv4(),
            6,
            2,
            'عبدالكريم عبدالله',
            '784-1992-1234567',
            501234567,
            'kareemAbdullah@gmail.com',
            1400
        ]);
        await db.query('insert into tenants ' +
            '(tenant_id, room_id, apt_id, name, emirates_id, phone_number, email, assigned_monthly_rent)\n' +
            'values  ($1, $2, $3, $4, $5, $6, $7, $8)',[
            uuidv4(),
            5,
            2,
            'احمد كريم',
            '784-1991-1234567',
            501234567,
            'ahmedKarim@gmail.com',
            2000
        ]);
        console.log('Success');
    } catch(err){
        console.log(err);
    }
})();