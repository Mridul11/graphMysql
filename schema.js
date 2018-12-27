import graphql from 'graphql';
import Db from './db';
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } from "graphql";


//create graph object for Person

const Person = new GraphQLObjectType({
    name : 'Person',
    description: 'This is representation of a person!!!',
    fields: () => {
        return {
            id : {
                type : GraphQLInt,
                resolve(person) {
                    return person.id ;
                }
            },
            firstName : {
                type: GraphQLString,
                resolve(person){
                    return person.firstName
                }
            },
            lastName : {
                type: GraphQLString,
                resolve(person){
                    return person.lastName
                }
            },
            email : {
                type: GraphQLString,
                resolve(person){
                    return person.email
                }
            },
            posts :{
                type : new GraphQLList(Post),
                resolve(person){
                    return person.getPosts()
                }
            }
        }
    }
});


// create graph object for POST

const Post = new GraphQLObjectType({
    name : 'Post',
    description: 'This is representation of posts.',
    fields : () => {
        return {
            id : {
                type : GraphQLInt,
                resolve(post) {
                    return post.id ;
                }
            },
            title:{
                type: GraphQLString,
                resolve(post){
                    return post.title
                }
            },
            content:{
                type: GraphQLString,
                resolve(post){
                    return post.content
                }
            },
            person:{
                type: Person,
                resolve(post){
                    return post.getPerson()
                }
            }
        }
    }
});

// 

const Query = new GraphQLObjectType({
    name : 'Query',
    description: 'This is root query',
    fields: () => {
        return {
            people : {
                type : new GraphQLList(Person),
                args:{
                    id: { type: GraphQLInt },
                    email: { type: GraphQLString }
                },
                resolve(root, args){
                    return Db.models.person.findAll({ where: args });
                }
            },

            posts : {
                type : new GraphQLList(Post),
                resolve(root, args) {
                    return Db.models.post.findAll({ where : args }) ;
                }
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    description : 'function that are alternate to create/delete',
    fields(){
        return{
            addPerson:{
                type: Person,
                args :{
                    firstName:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email:{
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve( _, args ){
                    return Db.models.person.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email : args.email.toLowerCase()
                    })
                }
            }
        }
    }

})


const Schema = new GraphQLSchema({
    query : Query,
    mutation : Mutation
});

export default Schema ; 




