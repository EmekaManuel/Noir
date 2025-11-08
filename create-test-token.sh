#!/bin/bash

echo "🎨 Creating Token-2022 test tokens on Devnet..."
echo ""

# Set to devnet
solana config set --url devnet

# Check balance
BALANCE=$(solana balance | cut -d' ' -f1)
echo "💰 Your balance: $BALANCE SOL"
echo ""

if (( $(echo "$BALANCE < 0.5" | bc -l) )); then
    echo "⚠️  Low balance! Getting more SOL..."
    solana airdrop 2
    echo ""
fi

# Create Token A
echo "🪙 Creating Token A (TTA)..."
TOKEN_A=$(spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --decimals 9 2>&1 | grep "Creating token" | awk '{print $3}')
echo "   Token A Mint: $TOKEN_A"

# Create Token B  
echo "🪙 Creating Token B (TTB)..."
TOKEN_B=$(spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --decimals 9 2>&1 | grep "Creating token" | awk '{print $3}')
echo "   Token B Mint: $TOKEN_B"

echo ""
echo "📦 Creating token accounts..."

# Create accounts
spl-token create-account $TOKEN_A --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
spl-token create-account $TOKEN_B --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

echo ""
echo "💵 Minting tokens to your wallet..."

# Mint tokens
spl-token mint $TOKEN_A 1000000 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
spl-token mint $TOKEN_B 1000000 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

echo ""
echo "============================================================"
echo "🎉 SUCCESS! Copy these addresses for your offers:"
echo "============================================================"
echo "Token A (TTA): $TOKEN_A"
echo "Token B (TTB): $TOKEN_B"
echo "============================================================"
echo ""
echo "💡 You now have 1,000,000 of each token!"
echo "   Use these addresses in your Noir frontend"
echo ""
