import withSession from '../../../lib/middleware/session';
import { ApiHandler } from '../../../lib/types/handler';

const checklogin: ApiHandler<{}, {}> = async (req, res) =>{
    try{
        await req.session.destroy();
        res.writeHead(200, {Location: '/'})
    } catch(e: any){
        res.status(500).send(e.message);
    }finally{
        res.end();
    }
}

export default withSession(checklogin)