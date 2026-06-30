import { FaWallet, FaCoins, FaGift, FaInfoCircle } from "react-icons/fa";
import { useWeb3 } from "../Web3Context";
import EthIllustration from "../EthIllustration";

function MyStakes() {

    const { account, stakeAmount, rewardAmount } = useWeb3();

    const stakeNum = parseFloat(stakeAmount) || 0;
    const rewardNum = parseFloat(rewardAmount) || 0;
    const projectedYearly = (stakeNum * 0.12).toFixed(4);

    return (
        <section className="mainSection" style={{ flexDirection: "column" }}>
            <div className="leftPanel" style={{ width: "100%" }}>

                {/* HERO */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "32px",
                    flexWrap: "wrap"
                }}>
                    <div style={{ flex: "1 1 320px" }}>
                        <h1>My Stakes</h1>
                        <p style={{ marginTop: "10px", color: "#9ca3af", fontSize: "16px", lineHeight: "1.6" }}>
                            A complete overview of your wallet, current stake, and the
                            rewards you've earned so far on EtherAuthority.
                        </p>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                        <EthIllustration size={150} />
                    </div>
                </div>

                {/* CARDS */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                    marginTop: "32px"
                }}>

                    <div className="stakeCard">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <FaWallet color="#a855f7" />
                            <h2 style={{ margin: 0, fontSize: "16px" }}>Connected Wallet</h2>
                        </div>
                        <p style={{ wordBreak: "break-all", fontSize: "14px", color: "#d1d5db" }}>
                            {account ? account : "Not Connected"}
                        </p>
                    </div>

                    <div className="stakeCard">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <FaCoins color="#a855f7" />
                            <h2 style={{ margin: 0, fontSize: "16px" }}>Current Stake</h2>
                        </div>
                        <p style={{ fontSize: "26px", fontWeight: "700" }}>
                            {stakeAmount} <span style={{ fontSize: "16px", color: "#9ca3af" }}>ETH</span>
                        </p>
                    </div>

                    <div className="stakeCard">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <FaGift color="#22c55e" />
                            <h2 style={{ margin: 0, fontSize: "16px" }}>Pending Reward</h2>
                        </div>
                        <p style={{ fontSize: "26px", fontWeight: "700", color: "#22c55e" }}>
                            {rewardAmount} <span style={{ fontSize: "16px", color: "#9ca3af" }}>ETH</span>
                        </p>
                    </div>

                </div>

                {/* PROJECTED EARNINGS */}
                <div style={{
                    marginTop: "28px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "24px"
                }}>
                    <h2 style={{ fontSize: "18px", margin: "0 0 16px 0" }}>Earnings Projection</h2>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#9ca3af", marginBottom: "8px" }}>
                        <span>Annual Yield (12% APY)</span>
                        <span style={{ color: "#fff", fontWeight: "600" }}>{projectedYearly} ETH / year</span>
                    </div>

                    <div style={{
                        width: "100%", height: "8px", borderRadius: "4px",
                        background: "rgba(255,255,255,0.08)", overflow: "hidden"
                    }}>
                        <div style={{
                            width: "12%", height: "100%",
                            background: "linear-gradient(90deg, #a855f7, #7c3aed)"
                        }} />
                    </div>

                    <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "12px" }}>
                        Based on your current staked balance of {stakeAmount} ETH at a
                        fixed 12% annual percentage yield, compounding continuously
                        on-chain.
                    </p>
                </div>

                {/* INFO NOTE */}
                <div style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "16px 20px",
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#d1d5db"
                }}>
                    <FaInfoCircle color="#a855f7" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span>
                        Rewards accrue automatically while your ETH remains staked.
                        Visit the Dashboard to stake more, withdraw, or claim your
                        rewards at any time.
                    </span>
                </div>

            </div>
        </section>
    );
}

export default MyStakes;