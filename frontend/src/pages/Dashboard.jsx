import { FaShieldAlt } from "react-icons/fa";
import { useWeb3 } from "../Web3Context";

function Dashboard() {

    const {
        account,
        amount,
        setAmount,
        stakeAmount,
        rewardAmount,
        stakeLoading,
        withdrawLoading,
        claimLoading,
        history,
        handleStake,
        handleWithdraw,
        handleClaim
    } = useWeb3();

    return (
        <>
            {/* TOP CARDS */}
            <section className="topCards">

                <div className="card">
                    <h3>Total Staked</h3>
                    <h1>{stakeAmount} ETH</h1>
                    <p>Secure Smart Contract</p>
                </div>

                <div className="card">
                    <h3>Rewards Earned</h3>
                    <h1>{rewardAmount} ETH</h1>
                    <p>Fixed APY Rewards</p>
                </div>

                <div className="card">
                    <h3>Annual APY</h3>
                    <h1>12%</h1>
                    <p>Fixed Rewards</p>
                </div>

            </section>

            {/* MAIN SECTION */}
            <section className="mainSection">

                <div className="leftPanel">

                    <h1>Staking Dashboard</h1>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <div className="quickButtons">
                        <button onClick={() => setAmount("0.01")}>0.01 ETH</button>
                        <button onClick={() => setAmount("0.1")}>0.1 ETH</button>
                        <button onClick={() => setAmount("0.5")}>0.5 ETH</button>
                        <button onClick={() => setAmount("1")}>1 ETH</button>
                    </div>

                    <div className="buttonGroup">
                        <button
                            className="stakeButton"
                            onClick={handleStake}
                            disabled={stakeLoading}
                        >
                            {stakeLoading ? "Processing..." : "Stake"}
                        </button>

                        <button
                            className="withdrawButton"
                            onClick={handleWithdraw}
                            disabled={withdrawLoading}
                        >
                            {withdrawLoading ? "Processing..." : "Withdraw"}
                        </button>
                    </div>

                    <button
                        className="claimButton"
                        onClick={handleClaim}
                        disabled={claimLoading}
                    >
                        {claimLoading ? "Processing..." : "Claim Reward"}
                    </button>

                    <div className="secureBox">
                        <FaShieldAlt className="shield" />
                        <div>
                            <h2>Secure Staking</h2>
                            <p>
                                Your funds are secured by smart contracts and blockchain technology.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="rightPanel">

                    <div className="walletCard">
                        <h2>Wallet Overview</h2>
                        <p>Connected Address</p>
                        <div className="walletAddress">
                            {account ? account : "Not Connected"}
                        </div>
                        <h3 className="network">Hardhat Localhost</h3>
                    </div>

                    <div className="stakeCard">
                        <h2>Your Stakes</h2>
                        <p>Staked ETH : {stakeAmount} ETH</p>
                        <p>Estimated Reward : {rewardAmount} ETH</p>
                    </div>

                    <div className="historySection">
                        <h2>Transaction History</h2>
                        {
                            history.length === 0
                                ? <p className="emptyHistory">No Stake History</p>
                                : history.map((item, index) => (
                                    <div className="historyCardItem" key={index}>
                                        {item}
                                    </div>
                                ))
                        }
                    </div>

                </div>

            </section>
        </>
    );
}

export default Dashboard;