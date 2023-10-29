import groq from "groq";

export const imageGroq = groq`
    ...,
    asset->{
        _id,
        title,
        altText,
        description,
        metadata{
            lqip,
            dimensions
        }
    },
`;
