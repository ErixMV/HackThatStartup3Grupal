import User from '../../api/user/model';
import Repository from '../../api/repository/model';

const Query = {
    users: () => User.find({}),
    repositories: () => Repository.find({})
}

export default Query;