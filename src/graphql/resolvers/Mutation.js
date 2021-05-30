import User  from '../../api/user/model';

const Mutation = {
    addUser: (_, newUser) => {
        // const newUser = new User(newUser);
        console.log(newUser);

        // return newUser;
        return true;
    }
}

export default Mutation