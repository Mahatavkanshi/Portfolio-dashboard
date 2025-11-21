import { Router} from 'express';
import { QueryController } from '../controllers/query.controller';
const router: Router = Router();

router.post('/', QueryController.submitQuery.bind(QueryController));
router.get('/', QueryController.getAllQueries.bind(QueryController));
export default router;