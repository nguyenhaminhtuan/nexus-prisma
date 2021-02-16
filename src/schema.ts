import path from 'path';
import { makeSchema, connectionPlugin, declarativeWrappingPlugin } from 'nexus';
import * as types from './graphql';

const schema = makeSchema({
  types,
  nonNullDefaults: {
    input: true,
    output: false,
  },
  outputs: {
    schema: path.join(process.cwd(), './schema.graphql'),
    typegen: path.join(
      process.cwd(),
      './node_modules/@types/nexus-typegen/index.d.ts'
    ),
  },
  contextType: {
    module: path.join(__dirname, './context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
  },
  prettierConfig: path.join(process.cwd(), './.prettierrc.js'),
  plugins: [
    connectionPlugin({
      disableBackwardPagination: true,
      cursorFromNode: (node) => {
        return node.id;
      },
      extendConnection: {
        totalCount: { type: 'Int' },
      },
      // pageInfoFromNodes: (nodes, args, ctx) => {
      //   return {
      //     hasNextPage: true,
      //     hasPreviousPage: true,
      //   };
      // },
    }),
    declarativeWrappingPlugin(),
  ],
});

export default schema;
