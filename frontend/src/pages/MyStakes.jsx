import { useWeb3 } from "../Web3Context";

function MyStakes() {

    const { account, stakeAmount, rewardAmount } = useWeb3();

    return (
        <section className="mainSection">
            <div className="leftPanel" style={{ width: "100%" }}>
                <h1>My Stakes</h1>

                <div className="stakeCard">
                    <h2>Wallet</h2>
                    <p>{account ? account : "Not Connected"}</p>
                </div>

                <div className="stakeCard">
                    <h2>Current Stake</h2>
                    <p>{stakeAmount} ETH</p>
                </div>

                <div className="stakeCard">
                    <h2>Pending Reward</h2>
                    <p>{rewardAmount} ETH</p>
                </div>
            </div>
        </section>
    );
}

export default MyStakes;