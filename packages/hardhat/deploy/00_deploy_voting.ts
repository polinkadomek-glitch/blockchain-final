import { deployScript, artifacts } from "../rocketh/deploy.js";

/**
 * Deploys the "Voting" contract using the deployer account.
 *
 * @param env Rocketh environment object.
 */
export default deployScript(
  async env => {
    const { deployer } = env.namedAccounts;

    const voting = await env.deploy("Voting", {
      account: deployer,
      artifact: artifacts.Voting,
      // Voting has no constructor arguments
      args: [],
    });

    // Read back from the deployed contract
    const owner = await env.read(voting, { functionName: "owner" });
    console.log("👋 Voting deployed. Owner:", owner);
  },
  {
    // e.g. yarn deploy --tags Voting
    tags: ["Voting"],
  },
);
