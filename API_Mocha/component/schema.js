const categorySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    image: { type: "string" },
  },
  required: ["name", "image"],
};
const productSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    price: { type: "number" },
    description: { type: "string" },
    images: {
      type: "array",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "string",
      },
    },
    category: categorySchema,
  },

  required: ["id", "title", "price", "description", "images", "category"],
};
const userSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    email: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
    role: { type: "string" },
    avatar: { type: "string" },
  },
  required: ["id", "email", "password", "name", "role", "avatar"],
};
const authSchema = {
  type: "object",
  properties: {
    access_token: { type: "string" },
    refresh_token: { type: "string" },
  },
  required: ["access_token", "refresh_token"],
};

module.exports = { productSchema, categorySchema, userSchema, authSchema };
