import { defineQuery } from "next-sanity";

export const startupQuery =
  defineQuery(`*[_type == "startup" && defined(slug.current)]|order(_createdAt desc){
  _id,
  _createdAt,
  title,
  slug,
  author->{
    name,
    image
  },
  views,
  description,
  category,
  image,
}`);
export const START_UP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id==$id][0]{ 
   _id,
  _createdAt,
  title,
  
  slug,
  author->,
  views,
  description,
  category,
  image,
  pitch,
}`);
export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id==$id][0]{ 
  views,
  _id
}`);
export const AUTHOR_BY_GOOGLE_ID_QUERY =
  defineQuery(`*[_type == "author" && googleId==$googleId][0]{ 
  _id,
  googleId,
  name,
  image,
  email,
  bio,
}`);
