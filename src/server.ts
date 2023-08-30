import { serverHttp } from "./http";
import "./websocket";


serverHttp.listen(8080, () => console.log("Servidor rodando."))