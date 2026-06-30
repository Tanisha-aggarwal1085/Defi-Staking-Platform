import { FaArrowUp, FaArrowDown, FaGift, FaInbox } from "react-icons/fa";
import { useWeb3 } from "../Web3Context";
import EthIllustration from "../EthIllustration";

function getTxMeta(item) {
    if (item.toLowerCase().includes("staked")) {
        return { icon: <FaArrowDown />, color: "#a855f7", bg: "rgba(168,85,247,0.12)", label: "Stake" };
    }
    if (item.toLowerCase().includes("withdraw")) {
        return { icon: <FaArrowUp />, color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Withdraw" };
    }
    return { icon: <FaGift />, color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Reward Claim" };
}

function Transactions() {

    const { history } = useWeb3();

    const stakeCount = history.filter(h => h.toLowerCase().includes("staked")).length;
    const withdrawCount = history.filter(h => h.toLowerCase().includes("withdraw")).length;
    const claimCount = history.filter(h => h.toLowerCase().includes("claim")).length;

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
                        <h1>Transaction History</h1>
                        <p style={{ marginTop: "10px", color: "#9ca3af", fontSize: "16px", lineHeight: "1.6" }}>
                            A complete, transparent record of every staking action
                            performed from your connected wallet, most recent first.
                        </p>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                        <EthIllustration size={150} />
                    </div>
                </div>

                {/* SUMMARY STATS */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "16px",
                    marginTop: "32px"
                }}>
                    {[
                        ["Total Transactions", history.length, "#fff"],
                        ["Stakes", stakeCount, "#c4b5fd"],
                        ["Withdrawals", withdrawCount, "#fca5a5"],
                        ["Rewards Claimed", claimCount, "#86efac"],
                    ].map(([label, value, color]) => (
                        <div key={label} style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "12px",
                            padding: "18px"
                        }}>
                            <div style={{ fontSize: "24px", fontWeight: "800", color }}>{value}</div>
                            <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>{label}</div>
                        </div>
                    ))}
                </div>

                {/* HISTORY LIST */}
                <h2 style={{ marginTop: "40px", fontSize: "20px" }}>Activity Log</h2>

                <div className="historySection" style={{ padding: 0, marginTop: "16px" }}>
                    {
                        history.length === 0
                            ? (
                                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                                    <FaInbox size={40} color="#4b5563" />
                                    <p className="emptyHistory" style={{ fontSize: "16px", marginTop: "16px" }}>
                                        No transactions yet
                                    </p>
                                    <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>
                                        Your stake, withdraw, and reward activity will appear here
                                        once you make your first transaction.
                                    </p>
                                </div>
                            )
                            : history.map((item, index) => {
                                const meta = getTxMeta(item);
                                return (
                                    <div
                                        className="historyCardItem"
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            padding: "16px 20px"
                                        }}
                                    >
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            background: meta.bg,
                                            color: meta.color,
                                            fontSize: "16px",
                                            flexShrink: 0
                                        }}>
                                            {meta.icon}
                                        </div>

                                        <div style={{ flexGrow: 1 }}>
                                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                                {meta.label}
                                            </div>
                                            <div style={{ color: "#9ca3af", fontSize: "13px", marginTop: "2px" }}>
                                                {item}
                                            </div>
                                        </div>

                                        <span style={{
                                            background: "rgba(34,197,94,0.12)",
                                            color: "#22c55e",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            padding: "4px 12px",
                                            borderRadius: "12px"
                                        }}>
                                            Confirmed
                                        </span>
                                    </div>
                                );
                            })
                    }
                </div>

            </div>
        </section>
    );
}

export default Transactions;