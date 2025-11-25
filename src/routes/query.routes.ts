import { Router} from 'express';
import { QueryController } from '../controllers/query.controller';

const router: Router = Router();

router.post('/', QueryController.submitQuery.bind(QueryController));
router.get('/', QueryController.getAllQueries.bind(QueryController));
router.patch('/:id', QueryController.updateQuery.bind(QueryController));
// Delete a single query by id
router.delete('/:id', QueryController.deleteQuery.bind(QueryController));
export default router;