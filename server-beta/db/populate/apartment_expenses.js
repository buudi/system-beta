const db = require('../index');

(async function(){
    try{
        await db.query('insert into apartment_expenses ' +
            '(apt_id, month_year, amount_paid, notes)' +
            'values($1, $2, $3, $4)',[
            1,
            '02_2023',
            220,
            'صيانة المطبخ'
        ]);
        await db.query('insert into apartment_expenses ' +
            '(apt_id, month_year, amount_paid, notes)' +
            'values($1, $2, $3, $4)',[
            1,
            '03_2023',
            350,
            'تلفزيون جديد'
        ]);
        await db.query('insert into apartment_expenses ' +
            '(apt_id, month_year, amount_paid, notes)' +
            'values($1, $2, $3, $4)',[
            2,
            '02_2023',
            400,
            'ثلاجة جديدة'
        ]);
        await db.query('insert into apartment_expenses ' +
            '(apt_id, month_year, amount_paid, notes)' +
            'values($1, $2, $3, $4)',[
            2,
            '03_2023',
            110,
            'خزانة جديدة'
        ]);
        console.log('success');
    } catch(err) {
        console.log(err);
    }
})();