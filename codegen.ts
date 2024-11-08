import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "https://api.goldsky.com/api/public/project_cm0keevd9v59l01w4fokhdcg9/subgraphs/hpot/1.0.0/gn",
    "https://api.studio.thegraph.com/query/50593/goerli-blocks/version/latest",
    "https://api.goldsky.com/api/public/project_cm0keevd9v59l01w4fokhdcg9/subgraphs/hpot-farming/1.0.0/gn",
  ],
  documents: "src/graphql/queries/!(*.d).{ts,tsx}",
  generates: {
    "src/graphql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withResultType: true,
      },
    },
  },
};

export default config;
