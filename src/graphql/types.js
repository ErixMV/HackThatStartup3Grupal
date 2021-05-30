const typeDefs = `
    type Query {
        users: [User],
        repositories: [Repository]
    }

    type Mutation {
        addUser(input: UserInput): Boolean
    }

    type User {
        username: String!
        password: String!
        email: String!
        repos: Int
    }

    type Repository {
        name: String
        url: String
        description: String
        stack: [String]
    }

    input UserInput {
        name: String!
    }
`;

export default typeDefs;