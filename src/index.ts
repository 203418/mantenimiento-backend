import Server from "./bootstrap/server";
import 'dotenv/config';

(() => {
    const serve = new Server();
    try {
        serve.initialize();
    }catch(error){
        console.log(error);
        process.exit(1);
    }
})();