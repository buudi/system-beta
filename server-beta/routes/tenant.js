const Router = require('express-promise-router');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = new Router();


module.exports = router

router.get('/', (req, res) => {
    res.json({
        msg: "Bruh this is the newTenant",
        uuid: uuidv4(),
    })
})

router.post('/remove', async (req, res) => {
    try {
        const { tenantId, roomId } = req.body;
        const response = await db.query('delete from contracts where tenant_id = $1 and active = true',[tenantId]);

        // If you use a SQL DELETE command on a value that wasn't found,
        //  it will not remove any record from the table. The command will
        //  execute successfully, but it will not return any error message.
        //  Therefore, you should check the affected rows count after
        //  executing a DELETE command to ensure that the operation succeeded.
        try {
            const response = await db.query('delete from rent_payments where tenant_id = $1',[tenantId]);
        } catch (err) {
            console.log("Error in deleting from rent_payments");
            console.log(response);
        }
        await db.query('delete from tenants where tenant_id = $1', [tenantId]);
        await  db.query('update rooms set vacant = $1 where room_id=$2',[true, roomId]);
        res.json({
            msg: "success",
            tenantId: tenantId,
            roomId: roomId,
            res: response
        });
    } catch (err) {
        console.log("ERROR in '/tenant/delete'");
        res.json({
            err: err.toString(),
            error: "couldn't connect!",
        })
    }
});

// completed task: selected room_number: must be checked with capacity from the DB,
//  if the number of occupied rooms match the capacity then vacant column should be set to FALSE.
//  completed on 9/4/2023 by Abdullah Yaser

// Steps:
// 1. get the capacity (done)
// 2. occupied: count the number of tenants in that room using the arr.length (done)
// 3. verify that occupied is less than capacity, else abort and produce an error (done)
// 4. add new tenant info to DB (done)
// 5. increment occupied by 1, verify again, if occupied == capacity, set vacant column to false (done)

router.post('/addTenant', async(req, res) => {
    try {
        const roomNumber = req.body.roomNumber;
        const aptId = req.body.aptId;
        const roomsData = await db.query('select capacity, room_id from rooms where room_number = $1', [roomNumber]);
        const capacity = roomsData.rows[0].capacity;
        const roomId = roomsData.rows[0].room_id;
        const tenantsData = await db.query('select * from tenants where room_id = $1', [roomId]);

        let occupied = tenantsData.rows.length;
        if(occupied === capacity){
            console.log("ABORT, CAPACITY  FULL !!");
            return;
        }

        const newTenantId = uuidv4();
        await db.query('insert into tenants (tenant_id, room_id, apt_id, name, emirates_id, phone_number, date_settle_in) ' +
            'values ($1, $2, $3, $4, $5, $6, $7)',[
            newTenantId,
            roomId,
            aptId,
            req.body.tenantName,
            req.body.tenantEID,
            req.body.tenantNumber,
            req.body.settleIn,
        ]);

        const newContractId = uuidv4();
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            newContractId,
            newTenantId,
            req.body.settleIn,
            req.body.contractEnd,
            req.body.rent,
            true
        ]);
        occupied++;
        if(occupied == capacity){
            await db.query('update rooms set vacant = $1 where room_id = $2', [false, roomId]);
        }

        const newTenantData = await db.query('select * from tenants where tenant_id = $1', [newTenantId]);
        const newContractData = await  db.query('select * from contracts where tenant_id = $1',[newTenantId]);
        res.json({msg:"success"});
    } catch (err) {
        console.log("ERROR in tenant/addTenant: ", err);
    }
})