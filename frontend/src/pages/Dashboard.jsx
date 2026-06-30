import { FaShieldAlt } from "react-icons/fa";
import { useWeb3 } from "../Web3Context";
import EthIllustration from "../EthIllustration";

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
            {/* HERO BANNER */}
            <section style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "32px",
                flexWrap: "wrap",
                padding: "32px 0 8px 0"
            }}>
                <div style={{ flex: "1 1 320px" }}>
                    <span style={{
                        display: "inline-block",
                        background: "rgba(124,58,237,0.15)",
                        color: "#c4b5fd",
                        fontSize: "13px",
                        fontWeight: "600",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        marginBottom: "14px"
                    }}>
                        Live on Sepolia Testnet
                    </span>
                    <h1 style={{ fontSize: "32px", margin: 0 }}>
                        Stake ETH. Earn Rewards. Stay in Control.
                    </h1>
                    <p style={{ marginTop: "12px", color: "#9ca3af", fontSize: "15px", lineHeight: "1.6", maxWidth: "480px" }}>
                        Deposit ETH into a transparent, on-chain contract and earn a
                        fixed 12% APY — with no lock-up period and full control over
                        your funds at every step.
                    </p>
                </div>
                <div style={{ flexShrink: 0 }}>
                    <EthIllustration size={140} />
                </div>
            </section>

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

                {/* LEFT PANEL */}
                <div className="leftPanel">

                    <h1>Staking Dashboard</h1>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    {/* QUICK BUTTONS */}
                    <div className="quickButtons">
                        <button onClick={() => setAmount("0.01")}>0.01 ETH</button>
                        <button onClick={() => setAmount("0.1")}>0.1 ETH</button>
                        <button onClick={() => setAmount("0.5")}>0.5 ETH</button>
                        <button onClick={() => setAmount("1")}>1 ETH</button>
                    </div>

                    {/* ACTION BUTTONS */}
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

                    {/* CLAIM BUTTON */}
                    <button
                        className="claimButton"
                        onClick={handleClaim}
                        disabled={claimLoading}
                    >
                        {claimLoading ? "Processing..." : "Claim Reward"}
                    </button>

                    {/* SECURE BOX */}
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

                {/* RIGHT PANEL */}
                <div className="rightPanel">

                    {/* WALLET CARD */}
                    <div className="walletCard">
                        <h2>Wallet Overview</h2>
                        <p>Connected Address</p>
                        <div className="walletAddress">
                            {account ? account : "Not Connected"}
                        </div>
                        <h3 className="network">Sepolia Testnet</h3>
                    </div>

                    {/* STAKE CARD */}
                    <div className="stakeCard">
                        <h2>Your Stakes</h2>
                        <p>Staked ETH : {stakeAmount} ETH</p>
                        <p>Estimated Reward : {rewardAmount} ETH</p>
                    </div>

                    {/* HISTORY */}
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