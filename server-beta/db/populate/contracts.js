const db = require('../index');
const {v4:uuidv4} = require('uuid');

(async function (){
    try{
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values($1, $2, $3, $4, $5, $6)',[uuidv4(),
            '57192aa3-2ef4-4d11-b7ad-74e9d3873502', // this is not a good practice, because if i try to populate the tenant table again, the ID's will be changed
            '12-03-2023',
            '12-04-2023',
            1600,
            false
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values($1, $2, $3, $4, $5, $6)',[uuidv4(),
            '57192aa3-2ef4-4d11-b7ad-74e9d3873502',
            '12-04-2023',
            '12-05-2023',
            1600,
            true
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values($1, $2, $3, $4, $5, $6)',[uuidv4(),
            'cc50a995-4df7-42dc-9a88-8802091260ac',
            '15-04-2023',
            '15-05-2023',
            1800,
            true
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values($1, $2, $3, $4, $5, $6)',[uuidv4(),
            '07b6c091-6eb7-4757-ba71-f3b0f0e980c0',
            '11-03-2023',
            '11-04-2023',
            1500,
            false
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values($1, $2, $3, $4, $5, $6)',[uuidv4(),
            '07b6c091-6eb7-4757-ba71-f3b0f0e980c0',
            '11-04-2023',
            '11-05-2023',
            1500,
            true
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values($1, $2, $3, $4, $5, $6)',[uuidv4(),
            '4e333fd2-dd1d-4cf2-b74e-44e56aa4d54c',
            '12-04-2023',
            '12-05-2023',
            2100,
            true
        ]);
    } catch (err) {
        console.log(err);
    }
})();