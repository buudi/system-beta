const { v4: uuidv4 } = require('uuid');
const db = require('../index');

(async function(){
    try{
        await db.query('insert into rent_payments ' +
            '(payment_id, tenant_id, month_year, amount_paid, amount_due, notes)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            uuidv4(),
            'ad5608ee-841d-4c20-9e9a-da2ed56b8279',
            '2_2023',
            1200,
            200,
            'باقي عليه 200 درهم فقط'
        ]);
        await db.query('insert into rent_payments ' +
            '(payment_id, tenant_id, month_year, amount_paid, amount_due, notes)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            uuidv4(),
            'ad5608ee-841d-4c20-9e9a-da2ed56b8279',
            '3_2023',
            1600,
            0,
            'تم استلام كامل المبلغ واستلام المتبقى عليه من الشهر السابق'
        ]);
        await db.query('insert into rent_payments ' +
            '(payment_id, tenant_id, month_year, amount_paid, amount_due, notes)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            uuidv4(),
            'bf689d8c-7b9a-4531-b639-95dce90d4a7f',
            '3_2023',
            2000,
            0,
            'تم استلام كامل المبلغ '
        ]);
        await db.query('insert into rent_payments ' +
            '(payment_id, tenant_id, month_year, amount_paid, amount_due, notes)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            uuidv4(),
            'fcfe2040-1619-4da4-8b91-958b28014da4',
            '2_2023',
            1100,
            0,
            'تم استلام كامل المبلغ '
        ]);
        await db.query('insert into rent_payments ' +
            '(payment_id, tenant_id, month_year, amount_paid, amount_due, notes)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            uuidv4(),
            'fcfe2040-1619-4da4-8b91-958b28014da4',
            '3_2023',
            1000,
            0,
            'باقي عليه 100 درهم فقط '
        ]);
        await db.query('insert into rent_payments ' +
            '(payment_id, tenant_id, month_year, amount_paid, amount_due, notes)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            uuidv4(),
            'e2f068f7-c490-4e66-9984-ebf51254630a',
            '3_2023',
            1200,
            0,
            'تم استلام كامل المبلغ'
        ]);
        console.log('success');
    } catch(err){
        console.log(err);
    }
})();