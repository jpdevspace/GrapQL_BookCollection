/*
    Schema file has 3 purposes:
        - Define types
        - Define relationships betweens types
        - Define root queries
*/
const graphql = require('graphql');
const Book = require('../models/books');
const Author = require('../models/author');

const { 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type:  GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type:  GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books.filter(book => book.authorId === parent.id)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get the data from the db / other source
                //return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } }, 
            resolve(parent, args) {
                // code to get the data from the db / other source
                //return authors.find(author => author.id === args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});