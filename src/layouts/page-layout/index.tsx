import React, { useContext, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';

// Components
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import CustomAudioPlayer from '../../components/audio-player/player';

// Providers
import { AudioPlayerContext } from '../../provider/audio-player/index';

// Misc
import { RinkeByChainID } from '../../constants';

const PageLayout = ({ children }: any) => {
    const [readyToCheck, setReadyToCheck] = useState(false);
    const { provider, error } = useWeb3();
    const { switchNetwork } = useSwitchNetwork();

    const { isVisible = true } = useContext<any>(AudioPlayerContext);

    useEffect(() => {
        setTimeout(() => setReadyToCheck(true), 2000);
    }, []);

    const handleInstallMetamask = () => {
        window.open('https://metamask.io/download/', '_blank');
    };

    const handleNetworkSwitch = () => {
        //switchNetwork(RinkeByChainID);
    };

    const renderWarning = () => {
        if (!readyToCheck) return;

        // readyToCheck is being used to wait for metamask provider to load.
        // window.ethereum is a check to determine if
        if (window && !(window as any).ethereum) {
            return (
                <Modal
                    title="Warning!"
                    description={
                        <div className="flex flex-col gap-8">
                            <p className="text-gray-700">Please make sure you have Metamask installed.</p>
                            <Button variant="primary" className="self-end" onClick={handleInstallMetamask}>
                                Install metamask
                            </Button>
                        </div>
                    }
                />
            );
        }

        if (error?.name === 'UnsupportedChainIdError') {
            return (
                <Modal
                    title="Warning!"
                    description={
                        <div className="flex flex-col gap-8">
                            <p className="text-gray-700">Please make sure you are on RinkeBy Network.</p>
                            <Button variant="primary" className="self-end" onClick={handleNetworkSwitch}>
                                Switch to RinkeBy
                            </Button>
                        </div>
                    }
                />
            );
        }

        return null;
    };

    return (
        <div className={`w-full ${isVisible && 'mb-32'}`}>
           
            {children}

            <Transition
                show={isVisible}
                enter="transition-opacity duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <CustomAudioPlayer />
            </Transition>

            {(provider === undefined || error !== undefined) && renderWarning()}
        </div>
    );
};

export default PageLayout;