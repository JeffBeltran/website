import groq from "groq";

import { imageGroq } from "./image";

export const allPostsGroq = groq`*[_type == "post"]{
    ...,
    pageMeta{
        ...,
        image{
            ${imageGroq}
        }
    },
    content[]{
        ...,
        _type == 'image' => { 
            ${imageGroq}
        },
    }
} 
`;
export const postGroq = groq`*[
    _type == "post"  && 
    pageMeta.slug.current == $slug 
][0]{
    ...,
    pageMeta{
        ...,
        image{
            ${imageGroq}
        }
    },
    content[]{
        ...,
        _type == 'image' => { 
            ${imageGroq}
        },
        _type == 'block' => {
            ...,
            markDefs[]{
                ...,
                _type == 'post' => {
                    "slug": '/posts/' + @.post->pageMeta.slug.current,
                    "title": @.post->pageMeta.title
                }
            }
        }
    }
} 
`;
export const postByIdGroq = groq`*[
    _type == "post"  && 
    _id == $id
][0]{
    ...,
    pageMeta{
        ...,
        image{
            ${imageGroq}
        }
    },
    content[]{
        ...,
        _type == 'image' => { 
            ${imageGroq}
        }
    }
} 
`;
