import Endpoint from "../../modules/Endpoint";
import Response from "../../modules/Response";

export default new Endpoint({
    path: '/',
    callback: async(req, res, next) => {
        res.status(Response.status.OK).send(Response.success({
            message: 'reached gateway'
        }));
    }
})