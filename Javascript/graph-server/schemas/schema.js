 
const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLList,
        GraphQLString, GraphQLID, GraphQLInt,
        GraphQLSchema } = graphql;
const [books, authors] = require("../data");
console.log("authors:", authors) ;
console.log("books:", books) ;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    //author: { type:AuthorType}
    author: {
        type: AuthorType,
        resolve(parent, args){
            console.log(parent);
            return _.find(authors, { id: parent.authorId });
        }
      }
  }),
});


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: { 
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books,{authorId:parent.id})
            }
      }
  })
});


const RootQuery = new GraphQLObjectType({
name: "RootQueryType",
fields:  {
  book: {
    type: BookType,
    args: { id: { type: GraphQLString } },
    resolve(parent, args) {
      // code to get data from db / other source
      return _.find(books, { id: args.id });
    }
  },   // book ends.

  author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
          return _.find(authors, { id: args.id });
      }
  } ,    // author ends.,
  authors:{ type: AuthorType,
    resolve(parent, args){
        return _.find(authors, { id: args.id });
    }
}
  
}

});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

