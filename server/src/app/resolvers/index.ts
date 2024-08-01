// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers: any[] = [
    {
    Query: {
      // eslint-disable-next-line
      hello: (_: any, { name }: { name: string }) => `Hello ${name}!`,
    },
  }
];

export default resolvers;
