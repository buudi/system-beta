const db = require('../index');
const {v4:uuidv4} = require('uuid');

(async function (){
    try{
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent)' +
            'values($1, $2, $3, $4, $5)',[uuidv4(),
            'fcfe2040-1619-4da4-8b91-958b28014da4',
            '2023-02-15',
            '2023-03-15',
            1600
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent)' +
            'values($1, $2, $3, $4, $5)',[uuidv4(),
            'fcfe2040-1619-4da4-8b91-958b28014da4',
            '2023-03-15',
            '2023-04-15',
            1600
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent)' +
            'values($1, $2, $3, $4, $5)',[uuidv4(),
            'ad5608ee-841d-4c20-9e9a-da2ed56b8279',
            '2023-02-01',
            '2023-03-01',
            1800
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent)' +
            'values($1, $2, $3, $4, $5)',[uuidv4(),
            'ad5608ee-841d-4c20-9e9a-da2ed56b8279',
            '2023-03-01',
            '2023-04-01',
            1800
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent)' +
            'values($1, $2, $3, $4, $5)',[uuidv4(),
            'bf689d8c-7b9a-4531-b639-95dce90d4a7f',
            '2023-03-04',
            '2023-04-04',
            1500
        ]);
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent)' +
            'values($1, $2, $3, $4, $5)',[uuidv4(),
            'e2f068f7-c490-4e66-9984-ebf51254630a',
            '2023-03-01',
            '2023-04-01',
            2100
        ]);
    } catch (err) {
        console.log(err);
    }
})();