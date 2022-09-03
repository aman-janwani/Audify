import Image from 'next/image';
import React, { FC, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';

export interface AudioCardProps {
    id: string;
    name: string;
    writtenBy: string;
    currencyUnit: string;
    price: string;
    isShowPriceEnable?: boolean;
    balance: number;
    nameHandle: (data: any) => void;
    desc?: string;
    image: string;
    buttonName: string;
    buttonHandle: (name: string, tokenId: string) => void;
    className: string;
}

export const AudioCard: FC<AudioCardProps> = ({
    id,
    name,
    writtenBy,
    nameHandle,
    desc,
    image,
    buttonName,
    buttonHandle,
    balance,
    price,
    isShowPriceEnable = true,
    currencyUnit,
    className,
}) => {
    const renderBalance = () => {
        return `You own ${balance}`;
    };

    const [cardBgColor, setCardBgColor] = useState();

    return (
        <div className={`block bg-white rounded-lg shadow-md hover:shadow-xl ${className}`}>
            <div className="cursor-pointer aspect-square" onClick={() => nameHandle(id)}>
                <Image
                    src={image}
                    alt="audio card picture"
                    width={'100%'}
                    height={'100%'}
                    layout="responsive"
                    className="rounded-t-lg"
                />
            </div>
            <div className="flex flex-row items-center justify-between px-4 pt-4 ">
                <span className="px-2 py-1 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase bg-gray-200 rounded-full ">
                    #{id}
                </span>

                {balance > 0 && (
                    <span className="flex items-center h-4 gap-[6px] py-1 text-xs font-semibold leading-none tracking-wide text-gray-600">
                        <SiApplemusic className="text-base text-gray-400" />
                        You own {balance}
                    </span>
                )}
            </div>
            <div className="flex flex-col px-4 pt-3 mb-2">
                <h1
                    className="mb-2 font-bold text-gray-600 hover:cursor-pointer line-clamp-1"
                    onClick={() => nameHandle(id)}
                >
                    {name}
                </h1>
                <p className="mb-2 text-sm text-gray-600 line-clamp-1">{desc}</p>
                <p className="self-end text-sm italic text-gray-600">{`- ${writtenBy}`}</p>
            </div>
            <div className="h-10 border-t hover:border-transparent">
                <div
                    className="grid w-full h-full mr-2 text-sm rounded-bl-lg rounded-br-lg hover:font-bold place-content-center group hover:cursor-pointer hover:text-white hover:bg-indigo-500"
                    onClick={() => buttonHandle(name, id)}
                >
                    {isShowPriceEnable ? (
                        <>
                            <span className="flex flex-row items-center gap-2 font-semibold group-hover:hidden">
                                <FaEthereum className=" fill-gray-500" />
                                {`${price} `}
                            </span>
                            <span className="hidden group-hover:block">{buttonName}</span>
                        </>
                    ) : (
                        <span>{buttonName}</span>
                    )}
                </div>
            </div>
        </div>
    );
};