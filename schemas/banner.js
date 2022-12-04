export default {
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "buttonText",
      title: "ButtonText",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug (Product Referring)",
      type: "slug",
    },
    {
      name: "largeText1",
      title: "LargeText1",
      type: "string",
    },
    {
      name: "largeText2",
      title: "LargeText2",
      type: "string",
    },
  ],
};
