const express = require("express");

const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const apiRoutes=require("./routes/index");

const {User,Role}=require("./models/index");

const setupAndStartServer = async () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api",apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`);

        const u1=await User.findByPk(4);
        const r1=await Role.findByPk(1);
        // u1.addRole(r1);
        const r2=await Role.findByPk(2);
        // u1.addRole(r2);

        const response=await r1.getUsers();
        console.log(response);

    });
}

setupAndStartServer();