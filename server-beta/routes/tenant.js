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

        // todo: instead of getting roomId from req.body,
        //  make a query that finds the roomId from the tenants table.
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
            res.json({
                type: "error",
                code: "400-catch",
                msg: "Error when deleting from rent_payments",
                err: err.toString()
            })
        }
        await db.query('delete from tenants where tenant_id = $1', [tenantId]);
        await  db.query('update rooms set vacant = $1 where room_id=$2',[true, roomId]);
        res.json({
            type: "success",
            msg: "successfully added to database",
            tenantId: tenantId,
            roomId: roomId,
            res: response
        });
    } catch (err) {
        console.log("ERROR in '/tenant/delete'");
        res.json({
            type: "error",
            code: "400-catch",
            msg: "ERROR in '/tenant/delete'",
            err: err.toString()
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
    // okay buddy lets go through this
    try {

        // here we are getting the roomNumber and aptId from the body of the post request,
        //  we need to first check the capacity of the room in that specific apartment, what
        //  we are checking exactly? we need to compare the number of tenants actually in that room with the
        //  capacity, this is a verification segment where we are checking if there is actual space in the room before we
        //  we add the new tenant, even though there is already a column vacant in the rooms table, which if true means that
        //  there is space, we still can't be 100% sure that there is really space as sometimes errors can occur, and vacant
        //  might be set to true even though the capacity is full, hence why we need to do the below capacity verification.
        const roomNumber = req.body.roomNumber;
        const aptId = req.body.aptId;

        const roomsData = await db.query('select capacity, room_id from rooms where room_number = $1', [roomNumber]);

        const capacity = roomsData.rows[0].capacity;
        const roomId = roomsData.rows[0].room_id;

        // we will get all tenants who are in the specified room given in roomId
        const tenantsData = await db.query('select * from tenants where room_id = $1', [roomId]);

        // basically a variable to hold the number of tenants occupying the room.
        let occupied = tenantsData.rows.length;

        // here is the juicy part, we compare assigned capacity with the actual number of tenants who are
        //  currently and actively occupying the room.

        // todo: might need to query "vacant" from rooms table as well and set the condition below to:
        //  if (vacant && occupied === capacity ){...}, this is to make the condition harder, meaning the below code
        //  will only run if this rare condition is true, and if its true it will report an automated bug, because this
        //  condition can never be true unless there is an abnormal behaviour which is caused by a bug somewhere.
        if(occupied === capacity){
            console.log("ABORT, CAPACITY  FULL !!");

            // we need to set vacant to false, since now we know for sure that vacant is false
            // todo: how about we make an automated bug reporting mechanism, for if the query below is executed
            //  it will make a report for an error, since the point of this verification to run when an abnormal behavior
            //  is detected
            await db.query('update rooms set vacant = $1 where room_id= $2',[false, roomId]);

            // (done): test the below response
            // the verification will return an error in the response body.
            res.json({
                type: "error",
                code: "405-capacity",
                msg: "Query Not Allowed: room capacity is full"
            })
            return;
        }

        // okay we are done with the capacity verification, or test whatever you wish to call it,
        // now we have to query the new tenant data into the Database!

        // tenantIDs are automatically generated as per the UUID algorithm, (actually it might be an overkill to use such
        // an algorithm for this basic requirement, todo: reconsider the use of UUID format for IDs.
        const newTenantId = uuidv4();

        // basic insert query into tenants
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

        // you already know what is this
        const newContractId = uuidv4();

        // we need to generate a record for the new contract, hence the insert query into contracts table
        await db.query('insert into contracts (contract_id, tenant_id, contract_start, contract_end, rent, active)' +
            'values ($1, $2, $3, $4, $5, $6)',[
            newContractId,
            newTenantId,
            req.body.settleIn,
            req.body.contractEnd,
            req.body.rent,
            true
        ]);

        // here we do something perhaps a little weird but !!EXTREMELY IMPORTANT!!, we do the capacity verification again, this time
        //  we check that after adding the new tenant (hence why we used occupied++ below) vacancy is still available,
        //  otherwise we set the vacant column to false hence the query inside the condition below.
        //  the below segment is the only place in this whole API that verifies for capacity after a new record for tenant gets created.
        occupied++;
        if(occupied == capacity){
            await db.query('update rooms set vacant = $1 where room_id = $2', [false, roomId]);
        }

        // now we send the newly created record to the response body, however the tenant data is not from the post request body,
        //  but the actual created (and populated) record in the database, this enhances verifiability.
        const newTenantData = await db.query('select * from tenants where tenant_id = $1', [newTenantId]);
        const newContractData = await  db.query('select * from contracts where tenant_id = $1',[newTenantId]);
        res.json({
            type: "success",
            msg: "Successfully added the records to the database!",
            // todo: need to test if the response produces the logical outcome
            newTenantData: newTenantData.rows[0],
            newContractData: newContractData.rows[0]
        });
    } catch (err) {
        // (done): test the catch below
        res.json({
            type: "error",
            code:"400-catch",
            msg: "catched an error in 'tenant/addTenant', look at error details",
            err: err.toString()
        });
        console.log("ERROR in tenant/addTenant: ", err);
    }
})