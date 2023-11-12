import groq from "groq";

export const imageGroq = groq`
    ...,
    asset->{
        ...,
        title,
        altText,
        description,
        metadata{
            ...,
            lqip,
            dimensions
        }
    },
`;
