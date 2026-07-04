import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS =
    "0xCd279499974Ac556a7DA538e5F1f1B501E46c14c";

const SCAI_CHAIN_ID = 34n;

const ABI = [
    "function stake() payable",
    "function withdraw(uint256 amount)",
    "function claimReward()",
    "function getStake(address user) view returns(uint256)",
    "function getReward(address user) view returns(uint256)",
    "event Staked(address indexed user, uint256 amount, uint256 newTotal)",
    "event Withdrawn(address indexed user, uint256 amount, uint256 newTotal)",
    "event RewardClaimed(address indexed user, uint256 amount)"
];

const Web3Context = createContext(null);

export function useWeb3() {
    return useContext(Web3Context);
}

async function assertSCAI() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    if (network.chainId !== SCAI_CHAIN_ID) {
        alert(
            "Wrong Network!\n\n" +
            "This app runs on SCAI Mainnet only.\n\n" +
            "Please switch MetaMask to 'SCAI Mainnet' and try again.\n" +
            "Chain ID: 34 | RPC: https://mainnet-rpc.scai.network"
        );
        return false;
    }
    return true;
}

export function Web3Provider({ children }) {

    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("0.01");
    const [stakeAmount, setStakeAmount] = useState("0");
    const [rewardAmount, setRewardAmount] = useState("0");

    const [stakeLoading, setStakeLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [claimLoading, setClaimLoading] = useState(false);

    const [history, setHistory] = useState([]);

    const getContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    };

    // Fetch past events from blockchain
    const fetchEvents = async (userAddress) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

            const stakedFilter = contract.filters.Staked(userAddress);
            const withdrawnFilter = contract.filters.Withdrawn(userAddress);
            const claimedFilter = contract.filters.RewardClaimed(userAddress);

            const [stakedEvents, withdrawnEvents, claimedEvents] = await Promise.all([
                contract.queryFilter(stakedFilter),
                contract.queryFilter(withdrawnFilter),
                contract.queryFilter(claimedFilter)
            ]);

            const allEvents = [
                ...stakedEvents.map(e => ({
                    type: "Staked",
                    label: `Staked ${ethers.formatEther(e.args.amount)} SCAI`,
                    block: e.blockNumber
                })),
                ...withdrawnEvents.map(e => ({
                    type: "Withdrawn",
                    label: `Withdraw ${ethers.formatEther(e.args.amount)} SCAI`,
                    block: e.blockNumber
                })),
                ...claimedEvents.map(e => ({
                    type: "Claimed",
                    label: `Reward Claimed ${ethers.formatEther(e.args.amount)} SCAI`,
                    block: e.blockNumber
                }))
            ];

            // Sort by block number (latest first)
            allEvents.sort((a, b) => b.block - a.block);

            setHistory(allEvents.map(e => e.label));

        } catch (err) {
            console.log("Event fetch error:", err);
        }
    };

    // CONNECT WALLET
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask not found. Please install MetaMask.");
                return;
            }

            const ok = await assertSCAI();
            if (!ok) return;

            await window.ethereum.request({ method: "eth_requestAccounts" });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();

            const stakingContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

            setAccount(walletAddress);

            const stake = await stakingContract.getStake(walletAddress);
            const reward = await stakingContract.getReward(walletAddress);

            setStakeAmount(parseFloat(ethers.formatEther(stake)).toFixed(4));
            setRewardAmount(parseFloat(ethers.formatEther(reward)).toFixed(4));

            // Fetch blockchain events
            await fetchEvents(walletAddress);

            alert("Wallet Connected");

        } catch (err) {
            console.log(err);
            alert("Wallet Connection Failed");
        }
    };

    // STAKE
    const handleStake = async () => {
        try {
            if (!window.ethereum) {
                alert("Install MetaMask");
                return;
            }
            if (!account) {
                alert("Connect Wallet First");
                return;
            }

            const ok = await assertSCAI();
            if (!ok) return;

            setStakeLoading(true);

            const stakingContract = await getContract();

            const tx = await stakingContract.stake({
                value: ethers.parseEther(amount)
            });

            await tx.wait();

            const updatedStake = await stakingContract.getStake(account);
            const updatedReward = await stakingContract.getReward(account);

            setStakeAmount(parseFloat(ethers.formatEther(updatedStake)).toFixed(4));
            setRewardAmount(parseFloat(ethers.formatEther(updatedReward)).toFixed(4));

            // Refresh events from blockchain
            await fetchEvents(account);

            alert("Stake Successful");

        } catch (err) {
            console.log(err);
            alert(err.reason || err.message || "Stake Failed");
        } finally {
            setStakeLoading(false);
        }
    };

    // WITHDRAW
    const handleWithdraw = async () => {
        try {
            if (!account) {
                alert("Connect Wallet First");
                return;
            }

            const ok = await assertSCAI();
            if (!ok) return;

            setWithdrawLoading(true);

            const stakingContract = await getContract();

            const tx = await stakingContract.withdraw(ethers.parseEther(amount));

            await tx.wait();

            const updatedStake = await stakingContract.getStake(account);
            const updatedReward = await stakingContract.getReward(account);

            setStakeAmount(parseFloat(ethers.formatEther(updatedStake)).toFixed(4));
            setRewardAmount(parseFloat(ethers.formatEther(updatedReward)).toFixed(4));

            // Refresh events from blockchain
            await fetchEvents(account);

            alert("Withdraw Successful");

        } catch (err) {
            console.log(err);
            alert(err.reason || err.message || "Withdraw Failed");
        } finally {
            setWithdrawLoading(false);
        }
    };

    // CLAIM REWARD
    const handleClaim = async () => {
        try {
            if (!account) {
                alert("Connect Wallet First");
                return;
            }

            const ok = await assertSCAI();
            if (!ok) return;

            setClaimLoading(true);

            const stakingContract = await getContract();

            const tx = await stakingContract.claimReward();

            await tx.wait();

            const updatedReward = await stakingContract.getReward(account);

            setRewardAmount(parseFloat(ethers.formatEther(updatedReward)).toFixed(4));

            // Refresh events from blockchain
            await fetchEvents(account);

            alert("Reward Claimed");

        } catch (err) {
            console.log(err);
            alert(err.reason || err.message || "Claim Failed");
        } finally {
            setClaimLoading(false);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
        }
    }, []);

    const value = {
        account,
        amount,
        setAmount,
        stakeAmount,
        rewardAmount,
        stakeLoading,
        withdrawLoading,
        claimLoading,
        history,
        connectWallet,
        handleStake,
        handleWithdraw,
        handleClaim
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
}