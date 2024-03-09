import CurrencyLogo from "@/components/common/CurrencyLogo";
import TokenSelectorModal from "@/components/modals/TokenSelectorModal";
import { Input } from "@/components/ui/input";
import { SwapFieldType } from "@/types/swap-field";
import { formatCurrency } from "@/utils/common/formatCurrency";
import { formatUSD } from "@/utils/common/formatUSD";
import { Currency, Percent } from "@cryptoalgebra/integral-sdk";
import { ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Address, useAccount, useBalance } from "wagmi";

interface TokenSwapCardProps {
    handleTokenSelection: (currency: Currency) => void;
    handleValueChange: (value: string) => void;
    handleMaxValue?: () => void;
    value: string;
    currency: Currency | null | undefined;
    otherCurrency: Currency | null | undefined;
    fiatValue: number | undefined;
    priceImpact: Percent | undefined;
    showMaxButton?: boolean;
    field: SwapFieldType;
}

const TokenCard = ({ handleTokenSelection, handleValueChange, handleMaxValue, value, currency, otherCurrency, fiatValue, showMaxButton }: TokenSwapCardProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const { address: account } = useAccount()

    const { data: balance, isLoading } = useBalance({
        address: account,
        token: currency?.isNative ? undefined : currency?.wrapped.address as Address,
        watch: true,
    });

    const balanceString = useMemo(() => {
        if (isLoading || !balance) return "Loading...";

        return formatCurrency.format(Number(balance.formatted))

    }, [balance, isLoading]);
    
    const handleInput = useCallback((value: string) => {
        if (value === ".") value = "0.";
        handleValueChange(value);
    }, []);


    const handleTokenSelect = (newCurrency: Currency) => {
        setIsOpen(false)
        handleTokenSelection(newCurrency)
    }


    return <div className="flex bg-card-dark px-4 py-6 rounded-2xl">
        <div className="flex flex-col gap-2 min-w-fit">
            <TokenSelectorModal onSelect={handleTokenSelect} isOpen={isOpen} setIsOpen={setIsOpen} otherCurrency={otherCurrency}>
                <button className="flex items-center gap-4 px-3 py-1 w-fit bg-card rounded-xl hover:bg-card-hover" onClick={() => setIsOpen(true)}>
                    <CurrencyLogo currency={currency} size={32} />
                     <span className="font-bold text-lg">{currency ? currency.symbol : "Select a token"}</span>
                     <ChevronRight size={16}/>
                </button>
            </TokenSelectorModal>
            {currency && account && (
                <div className={"flex text-sm whitespace-nowrap"}>
                    <div>
                        <span className="font-semibold">Balance: </span>
                        <span>{balanceString}</span>
                    </div>
                    {showMaxButton && (
                        <button className="ml-2 text-[#63b4ff]" onClick={handleMaxValue}>
                            Max
                        </button>
                    )}
                </div>
            )}
        </div>

        <div className="flex flex-col items-end w-full">
            <Input 
                type={'text'}
                value={value} 
                id={`amount-${currency?.symbol}`}
                onUserInput={v => handleInput(v)}
                className={`text-right border-none text-xl font-bold w-9/12 p-0`} 
                placeholder={'0.0'}
                maxDecimals={currency?.decimals}
                />
            <div className="text-sm">{fiatValue && formatUSD.format(fiatValue)}</div>
        </div>
    </div>

}

export default TokenCard;