import {
    FaShieldAlt, FaBolt, FaLock, FaChartLine,
    FaUserShield, FaCode
} from "react-icons/fa";
import EthIllustration from "../EthIllustration";

const features = [
    { icon: <FaBolt />, title: "Instant Staking", desc: "Stake any amount of ETH in a single transaction and start earning immediately." },
    { icon: <FaShieldAlt />, title: "Reentrancy Safe", desc: "Withdrawals follow the checks-effects-interactions pattern to prevent common attack vectors." },
    { icon: <FaChartLine />, title: "Fixed 12% APY", desc: "Predictable, transparent rewards calculated on-chain based on stake duration." },
    { icon: <FaLock />, title: "Self-Custodied", desc: "Your funds always remain under your control and can be withdrawn at any time." },
    { icon: <FaUserShield />, title: "Wallet-Native", desc: "No sign-ups or passwords — your MetaMask wallet is your identity on the platform." },
    { icon: <FaCode />, title: "Open Logic", desc: "Every function is verifiable on-chain, from staking to reward calculation." },
];

const faqs = [
    { q: "How is the 12% APY calculated?", a: "Rewards accrue continuously based on your staked amount, the fixed 12% annual rate, and the exact time elapsed since your last stake, withdraw, or claim." },
    { q: "Can I withdraw before a lock period ends?", a: "Yes. EtherAuthority has no lock-up period — you can withdraw any portion of your stake at any time." },
    { q: "Is my staked ETH ever at risk?", a: "Your stake is tracked individually and the contract enforces strict balance checks before every withdrawal or reward payout." },
];

function About() {

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
                        <span style={{
                            display: "inline-block",
                            background: "rgba(124,58,237,0.15)",
                            color: "#c4b5fd",
                            fontSize: "13px",
                            fontWeight: "600",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            marginBottom: "16px"
                        }}>
                            Blockchain Internship Project
                        </span>

                        <h1 style={{ fontSize: "38px", lineHeight: "1.2" }}>
                            About EtherAuthority
                        </h1>

                        <p style={{ marginTop: "18px", lineHeight: "1.7", fontSize: "16px", color: "#d1d5db" }}>
                            EtherAuthority is a decentralized staking platform that gives
                            users a simple, secure, and transparent way to put their ETH
                            to work. From the moment ETH is staked, it begins earning a
                            fixed 12% annual percentage yield, with funds remaining fully
                            under the user's control at every step.
                        </p>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                        <EthIllustration size={200} />
                    </div>
                </div>

                {/* STATS STRIP */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "16px",
                    marginTop: "40px",
                    padding: "24px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px"
                }}>
                    {[
                        ["12%", "Fixed APY"],
                        ["0", "Lock-up Period"],
                        ["100%", "Self-Custodied"],
                        ["24/7", "On-chain Access"],
                    ].map(([stat, label]) => (
                        <div key={label} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "26px", fontWeight: "800", color: "#fff" }}>{stat}</div>
                            <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>{label}</div>
                        </div>
                    ))}
                </div>

                {/* FEATURES GRID */}
                <h2 style={{ marginTop: "48px", fontSize: "24px" }}>Why EtherAuthority</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginTop: "20px"
                }}>
                    {features.map((f) => (
                        <div key={f.title} style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "12px",
                            padding: "20px"
                        }}>
                            <div style={{
                                width: "40px", height: "40px", borderRadius: "10px",
                                background: "rgba(124,58,237,0.18)", color: "#c4b5fd",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "16px", marginBottom: "14px"
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>{f.title}</h3>
                            <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.6", margin: 0 }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* HOW IT WORKS */}
                <h2 style={{ marginTop: "48px", fontSize: "24px" }}>How It Works</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginTop: "20px"
                }}>
                    {[
                        ["1", "Connect Wallet", "Link your MetaMask wallet to the platform securely."],
                        ["2", "Stake ETH", "Deposit any amount of ETH into the staking contract."],
                        ["3", "Earn Rewards", "Watch your rewards accrue automatically at 12% APY."],
                        ["4", "Withdraw Anytime", "Withdraw your stake and claim rewards whenever you like."],
                    ].map(([num, title, desc]) => (
                        <div key={num}>
                            <div style={{
                                width: "32px", height: "32px", borderRadius: "50%",
                                background: "#7c3aed", color: "white", fontWeight: "700",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: "12px", fontSize: "14px"
                            }}>
                                {num}
                            </div>
                            <h3 style={{ fontSize: "16px", margin: "0 0 6px 0" }}>{title}</h3>
                            <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0, lineHeight: "1.6" }}>{desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <h2 style={{ marginTop: "48px", fontSize: "24px" }}>Frequently Asked Questions</h2>
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {faqs.map((item) => (
                        <div key={item.q} style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "10px",
                            padding: "18px 20px"
                        }}>
                            <h3 style={{ fontSize: "15px", margin: "0 0 8px 0" }}>{item.q}</h3>
                            <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0, lineHeight: "1.6" }}>{item.a}</p>
                        </div>
                    ))}
                </div>

                {/* TECH STACK */}
                <h2 style={{ marginTop: "48px", fontSize: "24px" }}>Built With</h2>
                <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                    {["Solidity", "Hardhat", "React", "ethers.js", "MetaMask"].map((tech) => (
                        <span key={tech} style={{
                            background: "rgba(124,58,237,0.15)",
                            color: "#c4b5fd",
                            padding: "6px 16px",
                            borderRadius: "20px",
                            fontSize: "14px",
                            fontWeight: "600",
                            border: "1px solid rgba(124,58,237,0.4)"
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>

                <p style={{ marginTop: "40px", fontSize: "13px", color: "#6b7280" }}>
                    EtherAuthority — Blockchain Internship Project. This platform runs
                    on a local development network for demonstration and educational
                    purposes.
                </p>

            </div>
        </section>
    );
}

export default About;