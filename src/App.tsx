import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import "./styles/_colors.css";
import "./App.css";

import { WagmiConfig } from "wagmi";
import Layout from "@/components/common/Layout";
import { Chain, holesky } from "viem/chains";

import ETHLogo from "@/assets/tokens/ether.svg";
import { parseGwei } from "viem";

const berachainBartioTestnet: Chain = {
  network: "berachain-bartio",
  id: 80084,
  name: "Berachain Bartio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA",
  },
  rpcUrls: {
    public: { http: ["https://bartio.rpc.berachain.com"] },
    default: { http: ["https://bartio.rpc.berachain.com"] },
  },
  blockExplorers: {
    default: {
      name: "Berachain",
      url: "https://bartio.beratrail.io/",
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x2f5e86C01B1Ab053747fbdb55FfECa65B07D0E53",
      blockCreated: 258000,
    },
  },
  fees: {
    defaultPriorityFee: parseGwei("50"),
  },
};

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const chains = [holesky, berachainBartioTestnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "Algebra Integral",
    description: "DEX Engine",
    url: "https://integral.algebra.finance",
    icons: [""],
  },
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  chainImages: {
    17000: ETHLogo,
  },
  defaultChain: holesky,
  themeVariables: {
    "--w3m-accent": "#2797ff",
  },
});

function App({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>{children}</Layout>
    </WagmiConfig>
  );
}

export default App;
