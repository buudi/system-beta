const db = require('../index');

(async function(){
    try{
        const {rows} = await db.query(
            'insert into main_apartments (building_name, apt_number, total_rooms)\n' +
            'values ($1, $2, $3)',['الاتحاد', '602', 4]
        );
        // console.log(JSON.stringify(rows[0]));
    } catch(err) {
        console.log(err);
    }
})();